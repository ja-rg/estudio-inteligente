<script setup>
const { getSession } = useAuth()
const { user } = await getSession()

const { data: curso, error } = await useFetch('/api/curso', { pick: ['estrategias'] })
const { data: progreso } = await useFetch('/api/progreso', { pick: ['estrategiasVistas'] })

definePageMeta({
    middleware: 'subscribed'
})

const watching = ref(null)


const handleListItemClick = (index) => {
    watching.value = index

    // Use requestAnimationFrame to wait for the next frame
    requestAnimationFrame(() => {
        const videoSection = document.getElementById('videoSection');
        if (videoSection) {
            videoSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

const handleBackButtonClick = () => {
    watching.value = null
}

async function completar() {
    const response = await $fetch('/api/progreso/incrementar-programa', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    progreso.value.estrategiasVistas++
}

function downloadCertificate() {
    navigateTo('/constancia', {
        replace: false
    })
}
</script>

<template>
    <div class="container mt-5">
        <h2>
            <BootstrapIconBookmarkCheckFill width="30" height="30" class="me-2" />Programa de Estrategias de Estudio
            Efectivo y Gestión del
            Tiempo
        </h2>

        <p class="lead">
            La forma en la que aproveches tu estudio puede llegar a ser más importante que el curso que tomas.
            Aquí encontrarás un programa con las mejores estrategias para tener un estudio efectivo y para
            organizar tu tiempo al estudiar para tu examen. Cuando completes un módulo se desbloqueará el
            siguiente, al final obtendrás una constancia.</p>

        <section v-if="watching === null && progreso?.estrategiasVistas == curso?.estrategias.length" class="my-3">
            <div ref="pdfSection" v-show="false">
                <InfoConstancia />
            </div>

            <div
                class="constancia-container card-style d-flex flex-column flex-md-row justify-content-center align-items-center border border-success border-2 rounded">
                <BootstrapIconAward class="align-icon mb-3 mb-md-0 me-md-3" width="50" height="50" />
                <div class="content-text text-center text-md-start mb-3 mb-md-0 me-md-3">
                    <h2>Mi Constancia</h2>
                    <p>Has completado todas las estrategias del curso. ¡Felicidades!</p>
                </div>
                <button class="btn btn-success btn-download" @click="downloadCertificate" :disabled="loading">
                    <!-- loading spinner -->
                    <div v-if="loading" class="spinner-border text-white" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                    <div v-else>
                        <BootstrapIconDownload /> Descargar
                    </div>
                </button>
            </div>
        </section>


        <div class="list-group">

            <div class="div" v-if="watching === null"
                :class="{ 'fade-out': watching !== null, 'fade-in': watching === null }">
                <a class="list-group-item list-group-item-action" style="cursor: pointer;"
                    v-for="(estrategia, index) in curso.estrategias"
                    :class="!(index > progreso.estrategiasVistas) ? 'bg-white' : 'text-muted bg-secondary disabled'"
                    :id="index" :key="index" @click="handleListItemClick(index)">
                    <div class="row gx-3 gy-2">
                        <!-- Video Column -->
                        <div class="col-12 col-md-4 d-flex justify-content-center align-items-center">
                            <div class="embed-responsive embed-responsive-16by9 rounded">
                                <NuxtImg :src="`/portadas/${index + 1}.png`" class="embed-responsive-item rounded img-fluid"
                                    :class="index > progreso.estrategiasVistas ? 'dimmed-thumbnail' : ''"
                                    alt="imagen de curso" />

                            </div>
                        </div>
                        <!-- List Item Column -->
                        <div class="col-12 col-md">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">{{ estrategia.tema }}</h5>
                                <small>
                                    <button type="button" class="btn btn-sm"
                                        :class="{ 'disabled btn-dark': index > progreso.estrategiasVistas, 'disabled btn-success': index < progreso.estrategiasVistas, 'btn-outline-success': index === progreso.estrategiasVistas }"
                                        @click.stop="completar" :disabled="index > progreso.estrategiasVistas">
                                        <BootstrapIconCheck2 v-if="index < progreso.estrategiasVistas" />
                                        <BootstrapIconX v-else-if="index > progreso.estrategiasVistas" />
                                        <BootstrapIconArrowRight v-else />
                                        {{ index > progreso.estrategiasVistas ? 'No disponible' :
                                            index < progreso.estrategiasVistas ? 'Completado' : 'Completar' }} </button>
                                </small>
                            </div>
                            <p class="mb-1 text-muted text-truncate">{{ estrategia.description }}</p>
                            <NuxtLink class="btn mt-2" id="descargar-pdf" :disabled="index > progreso.estrategiasVistas"
                                @click.stop
                                :class="index > progreso.estrategiasVistas ? 'disabled btn-dark' : 'btn-success'"
                                :to="`https://drive.google.com/uc?export=view&id=${estrategia['pdf-url']}`" target="_blank">
                                <BootstrapIconDownload /> Descargar PDF
                            </NuxtLink>
                        </div>
                    </div>
                </a>

            </div>
            <section v-else :class="{ 'fade-out': watching === null, 'fade-in': watching !== null }" id="videoSection">
                <div class="card mb-3">
                    <div class="card-header">
                        <button type="button" class="btn btn-sm btn-outline-secondary" @click="handleBackButtonClick">
                            <BootstrapIconArrowLeft /> Regresar
                        </button>
                    </div>
                    <video class="card-img-top" controls controlsList="nodownload"
                        :poster="`/portadas/${watching + 1}.png`">
                        <source
                            :src="`https://drive.google.com/uc?export=view&id=${curso.estrategias[watching]['video-url']}`">
                        Your browser does not support the video tag.
                    </video>
                    <div class="card-body" v-if="curso.estrategias[watching]">
                        <h5 class="card-title">{{ curso.estrategias[watching]?.tema }}</h5>

                        <p class="card-text">{{ curso.estrategias[watching]?.description }}</p>
                        <p class="card-text">
                            <small class="text-body-secondary">
                                <NuxtLink class="btn mt-2" id="descargar-pdf" :disabled="index > progreso.estrategiasVistas"
                                    @click.stop
                                    :class="index > progreso.estrategiasVistas ? 'disabled btn-dark' : 'btn-success'"
                                    :to="`https://drive.google.com/uc?export=view&id=${curso.estrategias[watching]['pdf-url']}`"
                                    target="_blank">
                                    <BootstrapIconDownload /> Descargar PDF
                                </NuxtLink>
                            </small>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    </div>
</template>