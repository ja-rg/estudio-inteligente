<script setup lang="ts">
defineProps(['name'])
const { signOut } = useAuth()
</script>

<template>
    <button type="button" class="btn btn-primary" @click="navigateTo('/perfil')"
        :class="{ 'active': $route.path === '/perfil' }">
        <BootstrapIconGearFill class="me-2" width="20" height="20" />
        Mi perfil
    </button>
    <button type="button" class="btn btn-primary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
        aria-expanded="false">
        <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
        <li>
            <a class="dropdown-item disabled" href="#">
                <BootstrapIconPerson />
                {{ name }}
            </a>
        </li>

        <li>
            <hr class="dropdown-divider">
        </li>
        <li><a class="dropdown-item" href="#" @click="signOut()">
                <BootstrapIconBoxArrowRight />
                Cerrar sesión
            </a>
        </li>
    </ul>
</template>