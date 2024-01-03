<script setup>
const { getSession, data } = useAuth()
const { user } = await getSession()
const { data: curso, error } = await useFetch('/api/curso')

definePageMeta({
    middleware: ['subscribed'],
})
</script>
<template>
    <h2 class="border-bottom pb-3 mb-4 display-5">
        <BootstrapIconPersonCircle width="40" height="40" class="text-primary" /> Bienvenido <strong>{{ user?.name
        }}</strong>
    </h2>
    <BCard>
        <template #header>
            <h5 class="card-title d-flex align-items-center">
                <BootstrapIconCreditCard class="me-2" width="25" height="25" /> Tu plan actual es:
            </h5>
        </template>
        <template #body>
            <p class="card-text">
                <strong>Plan de Estudio Inteligente</strong>
                <br />
                <small class="text-muted">Este plan te permite acceder a todos los recursos de la plataforma.</small>
            </p>
        </template>


    </BCard>

    <BCard>
        <template #header>
            <h5 class="card-title d-flex align-items-center">
                Curso de <div class="badge bg-primary text-wrap mx-3" style="width: 6rem;">{{ curso?.curso }}</div>
            </h5>
        </template>
        <template #body>
            <video class="card-img-top" controls controlsList="nodownload" poster="/img/Cover.png">
                <source :src="`https://drive.google.com/uc?export=view&id=${curso['videos-extra'].tutorial}`"
                    type="video/mp4" v-if="!error">
                Your browser does not support the video tag.
            </video>
        </template>
        <template #footer>
            <h5 class="card-title d-flex align-items-center display-6">
                <BootstrapIconPlayCircleFill class="text-primary mx-2" width="25" height="25" /> Video tutorial
            </h5>
            <p class="card-text">
                Este video te dará un recorrido por la Plataforma de Estudio Inteligente Studially para
                que le saques el mayor provecho, facilitando la preparación para tu examen.
            </p>
            <button type="button" class="btn btn-primary btn-lg align-items-center text-center mx-auto d-flex"
                data-bs-toggle="modal" data-bs-target="#puntajesModal">
                <BootstrapIconBarChartLineFill class="mx-2" />
                <span>Puntajes</span>
            </button>
        </template>
    </BCard>
    <ClientOnly>
        <BModal colour="primary" title="Puntajes" id="puntajesModal">
            <template #body>
                <InfoPuntaje />
            </template>
            <template #footer>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </template>
        </BModal>
    </ClientOnly>
</template>