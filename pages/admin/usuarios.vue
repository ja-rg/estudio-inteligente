<script lang="ts" setup>
import { computed, ref } from 'vue';


const { data: usuarios } = await useFetch('/api/admin/usuarios')

const usuario = ref({
  correo: '',
  nombres: '',
  apellidos: '',
  informacion: ''
})

const searchTerm = ref('')
const page = ref(1)
const perPage = ref(10)
const sortColumn = ref('')
const sortDirection = ref(1)

const sortTable = (column: string) => {
  if (sortColumn.value === column) {
    sortDirection.value = sortDirection.value * -1
  } else {
    sortColumn.value = column
    sortDirection.value = 1
  }
}

const filteredUsers = computed(() => {
  return usuarios.value.filter((usuario: any) => {
    return (
      usuario.correo.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      `${usuario.nombres} ${usuario.apellidos}`.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      usuario.informacion.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  })
})

const sortedUsers = computed(() => {
  if (sortColumn.value) {
    return filteredUsers.value.slice().sort((a: any, b: any) => {
      const modifier = sortDirection.value === 1 ? 1 : -1
      if (a[sortColumn.value] < b[sortColumn.value]) return -1 * modifier
      if (a[sortColumn.value] > b[sortColumn.value]) return 1 * modifier
      return 0
    })
  }
  return filteredUsers.value
})

const paginatedUsers = computed(() => {
  const start = (page.value - 1) * perPage.value
  const end = start + perPage.value
  return sortedUsers.value.slice(start, end)
})


const pageCount = computed(() => {
  return Math.ceil(sortedUsers.value.length / perPage.value)
})



</script>

<template>
  <h1>Panel de Administrador</h1>
  <form class="form-floating mb-4 position-relative">
    <input type="text" class="form-control pr-10" id="floatingSearch" placeholder="Buscar usuario..."
      v-model="searchTerm">
    <label for="floatingSearch">Buscar usuario</label>
    <button v-if="searchTerm" @click.prevent="searchTerm = ''"
      class="btn btn-link position-absolute top-50 end-0 translate-middle-y" style="right: 1rem;">
      <BootstrapIconXCircleFill class="text-secondary" />
    </button>
  </form>

  <div class="card">
    <div class="card-header bg-dark text-white">
      Lista de Usuarios Registrados con <strong>{{ usuario.informacion }}</strong>
      <br>
      <small> Total de usuarios registrados:
        <span class="badge bg-secondary rounded-pill">{{ usuarios.length }}</span>
      </small>
    </div>
    <div class="card-body" v-if="paginatedUsers.length > 0">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col" class="text-center bg-dark text-white text-uppercase">#
              </th>
              <th @click="sortTable('correo')" style="cursor: pointer;" scope="col">Correo
                <i class="bi"
                  :class="sortColumn === 'correo' ? sortDirection === 1 ? 'bi-sort-down' : 'bi-sort-up' : 'bi-filter'"></i>
              </th>
              <th @click="sortTable('nombre')" style="cursor: pointer;" scope="col">Nombre
                <i class="bi"
                  :class="sortColumn === 'nombre' ? sortDirection === 1 ? 'bi-sort-down' : 'bi-sort-up' : 'bi-filter'"></i>
              </th>
              <th scope="col">Información </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(usuario, index) in paginatedUsers" :key="usuario._id">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ usuario.correo }}</td>
              <td>{{ `${usuario.nombres} ${usuario.apellidos}` }}</td>
              <td>{{ usuario.informacion }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav aria-label="Page navigation">
        <ul class="pagination justify-content-center">
          <li class="page-item" :class="{ 'disabled': page === 1 }">
            <a class="page-link" href="#" @click.prevent="page--">Anterior</a>
          </li>
          <li class="page-item bg-dark text-white" v-for="n in pageCount" :key="n" :class="{ 'active': n === page }">
            <a class="page-link" href="#" @click.prevent="page = n">{{ n }}</a>
          </li>
          <li class="page-item" :class="{ 'disabled': page === pageCount }">
            <a class="page-link" href="#" @click.prevent="page++">Siguiente</a>
          </li>
        </ul>
      </nav>
    </div>

    <div class="card-body" v-else>
      <p class="text-center lead">
        No hay usuarios registrados con esa descripción
      </p>
    </div>

  </div>
</template>


<style scoped>
/* Custom Fully Dark Pagination Styles */
.pagination {
  margin: 20px 2rem;
  display: flex;
  gap: 1rem;
}

.pagination .page-item .page-link {
  border: none;
  color: #FFFFFF;
  /* White Text */
  background-color: #343a40;
  /* Bootstrap's Dark Grey */
  padding: 5px 12px;
  border-radius: 4px;
}

.pagination .page-item.active .page-link {
  background-color: #212529;
  /* A Darker Grey for Active Page */
}

.pagination .page-item:not(.active) .page-link:hover {
  background-color: #212529;
  /* A Darker Grey for Hover State */
  color: #FFFFFF;
}

.pagination .page-item.disabled .page-link {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>