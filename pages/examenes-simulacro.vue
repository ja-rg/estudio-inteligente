<script setup>
const { getSession } = useAuth()
const { user } = await getSession()
const { data: curso, error: curso_error } = await useFetch('/api/curso', { pick: ['examenes'] })
const { data: progreso, error: progreso_error } = await useFetch('/api/progreso', { pick: ['examenesRealizados', 'examenes'] })
definePageMeta({
    middleware: 'subscribed'
})

const comenzar = ref(false)

function comenzarExamen() {
    setPageLayout('focus')
    comenzar.value = true
}

function terminarExamen() {
    setPageLayout('default')
    comenzar.value = false
}

</script>

<template>
    <div class="container mt-5">
        <h2>
            <BootstrapIconBook class="me-2" />Mis Exámenes
        </h2>

        <p class="lead">
            Descripción: Cuentas con 4 exámenes simulacro, solo tienes un intento por examen, al terminar tu
            examen podrás consultar tus resultados.</p>
        <div v-if="comenzar">
            <h1>Examen Simulacro activo</h1>

            <p class="Alerta-texto text-danger">
                Recuerda registrar el mismo correo de tu cuenta Studially en el examen.
                <span class="text-primary cursor-pointer ms-2 text-underline user-select-all">{{ user.email }}</span>
            </p>
        </div>
        <div class="mb-5 d-flex justify-content-center align-items-center">
            <div v-if="comenzar" class="col-12">
                <iframe class="exam-container shadow-lg col-12"
                    :src="`https://docs.google.com/forms/d/e/${curso.examenes[progreso.examenesRealizados]['examen']}/viewform`"
                    width="100%" height="700px" frame-ancestors="https://docs.google.com">
                    Cargando...
                </iframe>
                <div class="d-grid gap-2">
                    <button class="btn btn-success" type="button" @click="terminarExamen" data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        data-bs-title="Recuerda enviar el formulario para que se guarden correctamente tus resultados.">
                        <BootstrapIconCheckCircle class="me-2" />
                        Terminar intento
                    </button>
                </div>
            </div>
            <BCard v-else>
                <template #header>
                    <!--                     Examenes: {{ curso.examenes }}
                    Progreso: {{ progreso }} -->
                    <h4>Lista de Exámenes Simulacro</h4>
                </template>
                <template #body>
                    <div class="row mt-5">
                        <div v-for="(examen, index) in curso.examenes" class="col-lg-3 col-md-6 mb-4">
                            <BCard v-if="examen">
                                <template #header>
                                    <div :class="index > progreso.examenesRealizados ? 'image-overlay disabled-image' : ''">
                                        <NuxtImg :src="`https://drive.google.com/uc?export=view&id=${examen['caratula']}`"
                                            alt="Examen Simulacro Image" class="card-img-top" />
                                    </div>
                                </template>

                                <template #body>
                                    <h5 class="card-title">Examen Simulacro {{ index + 1 }}</h5>
                                    <p class="card-text">{{ examen['descripcion'] }}</p>
                                </template>
                                <template #footer>
                                    <div class="d-grid gap-2">
                                        <button v-if="index >= progreso.examenesRealizados" class="btn" type="button"
                                            @click="comenzarExamen()" :disabled="index > progreso.examenesRealizados"
                                            :class="index > progreso.examenesRealizados ? 'btn-dark disabled' : 'btn-secondary'"
                                            :data-bs-target="index > progreso.examenesRealizados ? 'tooltip' : ''"
                                            data-bs-placement="top"
                                            data-bs-title="Una vez que comiences el examen, no podrás volver a intentarlo.">
                                            <BootstrapIconPlayCircle class="me-2"
                                                v-if="index > progreso.examenesRealizados" />
                                            <BootstrapIconXCircle class="me-2" v-else />
                                            Comenzar examen
                                        </button>

                                        <div v-else class="d-flex flex-column text-center text-white p-3">
                                            <div v-if="progreso.examenes && progreso.examenes[index] && progreso.examenes[index][0]"
                                                class="bg-success p-3 rounded d-flex align-items-center">
                                                <BootstrapIconCheckCircleFill class="me-2" />
                                                {{ progreso.examenes[index][1] }}
                                            </div>

                                            <div v-else class="bg-danger p-3 rounded d-flex align-items-center">
                                                <BootstrapIconXCircleFill class="me-2" />
                                                Examen no completado
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </BCard>
                        </div>
                    </div>
                </template>
            </BCard>
        </div>
    </div>
</template>