<script setup>
definePageMeta({
    middleware: 'subscribed'
})

const { data: temasEstudio, refresh } = await useFetch('/api/progreso', { transform: data => data['temas-estudio'] })
const { data: curso } = await useFetch('/api/curso', {
    pick: ['temario'],
    transform: data => ({
        temario: data.temario.map(materia => ({
            materia: materia.materia,
            submaterias: materia.submaterias.map(submateria => ({
                ...submateria,
                // temasEstudio Array<categoria: string (as materia), valor: { submateria: string, valor: string (as color)}>
                color: temasEstudio.value.find(tema => tema.categoria === materia.materia && tema.valor.submateria === submateria.subtema)?.valor.valor
            }))
        })
        )
    })
})

async function marcarTema(materia, subtema, color) {
    const response = await $fetch('/api/progreso/actualizar-tema', {
        method: 'PUT',
        body: { materia, subtema, color }
    })

    await refresh();
}
</script>
<template>
    <div class="container mt-5" v-if="curso.temario">
        <h2>
            <BootstrapIconBook class="me-2" width="15" height="15" /> Marcador de Temas de Estudio
        </h2>

        <p class="lead">
            Aquí podrás encontrar el temario correspondiente a tu examen, mediante un sistema de colores podrás
            marcar y observar gráficamente tu avance en cada uno de los temas que componen a cada materia.
            Cuando hayas mejorado en algún tema podrás cambiar el color sin problema.
        </p>
        <div class="accordion accordion-flush border border-2 border-primary" id="studyTopicsAccordion">
            <div class="accordion-item" v-for="(subject, index) in curso.temario">
                <h2 class="accordion-header d-flex justify-content-between align-items-center">
                    <button type="button" data-bs-toggle="collapse" :data-bs-target="'#collapseTopic-' + index"
                        :aria-controls="'collapseTopic-' + index" class="accordion-button collapsed">
                        <div class="d-flex align-items-center">
                            <BootstrapIconJournalText class="me-2" />
                            <span class="me-auto">{{ subject.materia }}</span>
                        </div>

                        <!-- badge count missing color selections -->
                        <span class="badge rounded-pill bg-warning text-dark ms-2"
                            v-if="subject.submaterias.some(sub => !sub.color || sub.color === '#f7f7f7')">
                            <BootstrapIconExclamationCircle class="me-1" />
                            {{ subject.submaterias.filter(sub => !sub.color || sub.color === '#f7f7f7').length }}
                        </span>
                        <span class="badge rounded-pill bg-success text-white ms-2" v-else>
                            <BootstrapIconCheckCircleFill class="me-1" />
                        </span>
                    </button>
                </h2>
                <div :id="'collapseTopic-' + index" class="accordion-collapse collapse"
                    data-bs-parent="#studyTopicsAccordion">
                    <div class="accordion-body">
                        <div v-for="sub in subject.submaterias"
                            :style="{ backgroundColor: sub.color ?? '#f7f7f7', transition: 'background-color 0.5s' }"
                            class="p-3 mb-3 rounded-3 shadow">
                            <h3>
                                <BootstrapIconJournalBookmark class="me-2" />
                                {{ sub.subtema }}
                            </h3>
                            <select class="form-select form-select-lg mb-3" v-model="sub.color"
                                @change="marcarTema(subject.materia, sub.subtema, sub.color)"
                                :style="{ boxShadow: sub.color ? `0 0 10px ${sub.color}` : '0 0 10px #f6f8fa' }">
                                <option :value="undefined" selected disabled>✏️ Elegir color</option>
                                <option value="#dcedc1">🟢 Temas que ya conoces o que estudiaste a la
                                    perfección. Estos temas requieren pocas horas de estudio o de repaso.
                                </option>
                                <option value="#a7c7e7">🔵 Temas que conoces parcialmente y te resultan
                                    fáciles. Requieren un número moderado de horas de estudio.</option>
                                <option value="#dbcdf0">🟣 Temas que conoces de forma parcial, pero te son
                                    difíciles. Requieren moderadas horas de estudio y se recomienda ayuda.
                                </option>
                                <option value="#faedcb">🟡 Temas que desconoces y te parecen fáciles.
                                    Requieren tiempo moderado.</option>
                                <option value="#f7d9c4">🟠 Temas que desconoces y te parecen difíciles.
                                    Dedícales el doble de tiempo. Si te es posible, pide ayuda.</option>
                            </select>
                            <div v-if="sub.descripción.length > 0">
                                <p>
                                    <BootstrapIconInfoCircleFill class="me-1" /><strong>Descripción:</strong>
                                </p>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item" v-for="desc in sub.descripción" :key="desc"
                                        :style="{ backgroundColor: `#${(parseInt((sub.color ?? '#f7f7f7').slice(1), 16) - 0x080808).toString(16)}` }">
                                        {{ desc }}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>