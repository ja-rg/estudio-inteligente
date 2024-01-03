<script setup lang="ts">
import {
    signInWithEmailAndPassword, getAuth, signOut,
    sendPasswordResetEmail,
} from 'firebase/auth'

const loading = ref(false)
const login = reactive({
    username: '',
    password: '',
})

const resetPassword = reactive({
    email: '',
    sent: false,
    error: false,
})

definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    }
})
const { signIn } = useAuth()

const { query: { error } } = useRoute()
const loginError = computed(() => error && error !== 'undefined')

const auth = getAuth()
async function submit() {
    try {
        const { user } = await signInWithEmailAndPassword(auth, login.username, login.password)
    } catch (error) {

        alert(error.message)
        return;
    }

    loading.value = true
    const response = await signIn('credentials', login)
    loading.value = false
}
</script>

<template>
    <div class="card text-center col-12 col-md-8 mx-auto">
        <div class="card-header">
            <h3 class="card-title">
                <BootstrapIconBoxArrowInRight />
                Inicio de sesión
            </h3>
        </div>
        <div class="card-body">
            <form class="px-5 text-start" @submit.prevent="submit">
                <div class="mb-3">
                    <div class="form-floating mb-3">
                        <input type="email" class="form-control" id="email" v-model="login.username"
                            aria-describedby="emailHelp">
                        <label for="email" class="form-label">
                            <BootstrapIconEnvelope /> Correo
                            electrónico
                        </label>
                        <div class="valid-feedback">
                            <BootstrapIconCheck-circle /> Usuario recordado
                        </div>
                        <div id="emailHelp" class="form-text">
                            <BootstrapIconShieldLock /> Nunca compartiremos tu correo con nadie más.
                        </div>
                    </div>
                </div>
                <div class="mb-3">
                    <div class="form-floating mb-3">
                        <input type="password" class="form-control" id="contraseña" v-model="login.password">
                        <label for="contraseña" class="form-label">
                            <BootstrapIconLock />
                            Contraseña
                        </label>
                        <div class="invalid-feedback">
                            <BootstrapIconX-circle /> Contraseña incorrecta
                        </div>
                        <div id="passwordHelp" class="form-text">
                            <a href="#" class="text-decoration-none" data-bs-toggle="modal"
                                data-bs-target="#recuperar-contraseña">
                                <BootstrapIconQuestionCircle />
                                Olvidé la contraseña
                            </a>
                        </div>
                        <p class="text-center">
                            ¿No tienes una cuenta? <a href="https://www.studially.com/estudiointeligente" target="_blank"
                                class="text-decoration-none">
                                Obtener una</a>
                        </p>
                        <p class="text-center">
                            <a href="https://wa.me/message/3TJFVQ35CHB4A1" target="_blank"
                                class="text-decoration-none btn btn-outline-primary">
                                <BootstrapIconWhatsapp />
                                Solicitar ayuda
                            </a>
                        </p>
                    </div>
                </div>
                <div class="d-grid">
                    <button class="btn btn-primary btn-lg" id="iniciar-sesion" :disabled="loading">
                        <span class="spinner-border spinner-border-sm" role="status" v-if="loading" aria-hidden="true">
                        </span>
                        <span v-else>
                            <BootstrapIconBoxArrowInRight />
                            Iniciar sesión
                        </span>
                    </button>
                </div>
            </form>
        </div>
    </div>
    <ClientOnly>
        <BModal id="recuperar-contraseña" title="Recuperar contraseña" colour="primary">
            <template #body>
                <p class="text-center">
                    Ingresa tu correo electrónico y te enviaremos un enlace para restablecer tu contraseña.
                </p>
                <form class="px-5 text-start">
                    <div class="mb-3">
                        <div class="form-floating mb-3">
                            <input type="email" class="form-control" id="correo-electrónico" placeholder="tu@correo.com"
                                v-model="resetPassword.email">
                            <label for="correo-electrónico">
                                <BootstrapIconEnvelope /> Correo
                                electrónico
                            </label>
                        </div>
                    </div>
                    <div class="d-grid">

                        <button class="btn btn-outline-primary btn-lg" id="recuperar-contraseña" v-if="resetPassword.error"
                            @click.prevent="resetPassword.error = false; resetPassword.sent = false; resetPassword.email = ''"
                            :disabled="loading">
                            <BootstrapIconArrowCounterclockwise />
                            Volver a intentar
                        </button>

                        <button class="btn btn-outline-primary btn-lg" id="recuperar-contraseña"
                            v-else-if="!resetPassword.sent" @click.prevent="
                                loading = true;
                            sendPasswordResetEmail(auth, resetPassword.email).then(() => {
                                resetPassword.sent = true;
                                loading = false;
                            }).catch(error => { resetPassword.error = true; console.log(error) })" :disabled="loading">
                            <span v-if="loading" class="spinner-border spinner-border-sm" role="status"> </span>
                            <span v-else>
                                <BootstrapIconKeyFill />
                                Recuperar contraseña
                            </span>
                        </button>


                        <button class="btn btn-success btn-lg disabled" id="recuperar-contraseña" v-else disabled>
                            <BootstrapIconCheckCircle />
                            Enlace enviado

                        </button>

                    </div>
                </form>
            </template>
        </BModal>

        <BToast title="Error" message="Usuario o contraseña incorrectos" :success="false" colour="danger"
            v-if="loginError" />
    </ClientOnly>
</template>