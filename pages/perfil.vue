<script setup lang="ts">
const { getSession } = useAuth()
const { user } = await getSession()
const { data } = useFetch('/api/usuario');

</script>
<template>
    <section class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
            <BCard>
                <template #header>
                    <h3 class="text-primary text-center d-flex align-items-center display-6 justify-content-center">
                        <BootstrapIconPersonCircle class="me-2" width="25" height="25" />
                        Perfil
                    </h3>
                </template>
                <template #body>
                    <form>
                        <div class="mb-3">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="nombre-completo" placeholder="Tu nombre"
                                    readonly :value="user?.name">
                                <label for="nombre-completo">
                                    <BootstrapIconPerson /> Nombre
                                    completo
                                </label>
                            </div>
                            <div id="notaNombre" class="form-text">
                                Este nombre será visible para otros usuarios
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="form-floating mb-3">
                                <input type="email" class="form-control" id="correo-electrónico"
                                    placeholder="name@example.com" readonly :value="user?.email">
                                <label for="correo-electrónico">
                                    <BootstrapIconEnvelope />
                                    Correo electrónico
                                </label>
                            </div>
                        </div>
                        <div class="mb-3">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="plan" readonly
                                    value="Plan de Estudio Inteligente">
                                <label for="plan">
                                    <BootstrapIconCreditCard /> Tu plan actual
                                </label>
                            </div>
                        </div>

                        <!-- Fecha de suscripción -->
                        <div class="mb-3">
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control" id="fecha-suscripción" readonly
                                    :value="(new Date(data?.vigenciaSuscripcion)).toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })">
                                <label for="fecha-suscripción">
                                    <BootstrapIconCalendar /> Tu suscripción es válida hasta
                                </label>
                            </div>
                        </div>
                        <div class="d-grid gap-2 d-md-flex justify-content-center">
                            <NuxtLink class="btn btn-dark" to="https://wa.me/message/3TJFVQ35CHB4A1" target="_blank">
                                <BootstrapIconPersonCircle /> Soporte técnico
                            </NuxtLink>
                            <!-- Trigger Modal Button -->
                            <button type="button" class="btn btn-secondary" data-bs-toggle="modal"
                                data-bs-target="#faqsModal">
                                <BootstrapIconQuestionCircle /> Preguntas Frecuentes
                            </button>
                        </div>
                    </form>
                </template>
                <template #footer>
                    <div class="d-grid gap-4 col-6 mx-auto">
                        <NuxtLink to="https://www.studially.com/privacidad" target="_blank"
                            class="btn btn-outline-dark border-1 rounded-pill">
                            <BootstrapIconShieldLock /> Privacidad
                        </NuxtLink>
                        <NuxtLink to="https://www.studially.com/tyc" target="_blank"
                            class="btn btn-outline-dark border-1 rounded-pill">
                            <BootstrapIconFileEarmarkText /> Términos y condiciones
                        </NuxtLink>
                        <NuxtLink to="https://www.studially.com/propiedad-intelectual" target="_blank"
                            class="btn btn-outline-dark border-1 rounded-pill">
                            <BootstrapIconLightbulb /> Propiedad intelectual
                        </NuxtLink>
                        <div class="col-12">
                            <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas"
                                data-bs-target="#offcanvas" aria-controls="offcanvasExample">
                                <BootstrapIconInfoCircle />
                                Ver <strong>AVISO DE RESPONSABILIDAD LIMITADA</strong>
                            </button>
                        </div>
                    </div>
                </template>
            </BCard>
        </div>
    </section>
    <ClientOnly>
        <BModal colour="primary" id="faqsModal" title="Preguntas Frecuentes">
            <template #body>
                <InfoFaq />
            </template>
            <template #footer>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </template>
        </BModal>
    </ClientOnly>
    <div class="offcanvas offcanvas-right" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title display-6" id="offcanvasLabel">AVISO DE RESPONSABILIDAD LIMITADA:</h5>
            <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body lead">
            UNAM, CENEVAL, UAM, IPN, COMIPEMS, EXHCOBA, COLLEGEBOARD, etc, son empresas y/o
            marcas registradas, NO vinculadas a DEVRI DESARROLLO VANGUARDISTA, RADICAL E
            INNOVADOR S.A.P.I. DE C.V. ni a "Studially". Este sitio web no está aprobado ni
            vinculado a ninguna de estas instituciones o procesos de admisión. Ninguna de
            nuestras herramientas garantiza el ingreso ni el aprovechamiento de estudio. El
            Usuario deberá leer detenidamente las siguientes las condiciones de uso antes de
            utilizar o registrarse al sitio web <a href="https://www.studially.com" target="_blank">www.studially.com</a> o
            <a href="https://www.estudiointeligente.mx" target="_blank">www.estudiointeligente.mx</a> y a
            nuestra app “Studially”. DEVRI DESARROLLO VANGUARDISTA, RADICAL E INNOVADOR
            S.A.P.I. DE C.V. y "Studially" no garantizan de ninguna manera el ingreso a
            ninguna institución de educación y se reservan el derecho de cambiar el
            material, herramientas o contenido de acuerdo a los distintos requerimientos de
            la empresa. Al ingresar, todos los usuarios están aceptando el aviso de
            privacidad, y los términos y condiciones del sitio.
        </div>
    </div>
</template>