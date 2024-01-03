<script setup>
import {
    createUserWithEmailAndPassword,
    getAuth,
} from 'firebase/auth'
import {
    collection,
    doc,
    getFirestore,
    setDoc,
} from 'firebase/firestore'

const { data: información } = await useFetch('/api/informacion', { transform: data => data.map(({ informacion }) => informacion) })
const { data: cursos } = await useFetch('/api/cursos')

const loading = ref(false)

const registro = ref({
    nombres: '',
    apellidos: '',
    fechaNacimiento: '',
    curso: '',
    informacion: '',
    correo: '',
    plan: '',
    terminos: false,
    uuid: '',

    get mayorDeEdad() {
        const fechaNacimiento = new Date(this.fechaNacimiento);
        const fechaActual = new Date();
        const edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
        const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();
        if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
            return edad - 1 >= 18;
        }
        return edad >= 18;
    }

})

const registroErrorPath = ref([])
definePageMeta({
    auth: {
        unauthenticatedOnly: true,
        navigateAuthenticatedTo: '/',
    }
})

const registroUsuario = async () => {
    const auth = getAuth()
    // Studially1-INICIAL NOMBRE
    const password = `Studially1-${registro.value.nombres[0]?.toUpperCase()}${registro.value.apellidos[0]?.toUpperCase()}`
    let existeFirestore = false
    await createUserWithEmailAndPassword(auth, registro.value.correo, password)
        .then((userCredential) => {
            // Signed in 
            const user = userCredential.user;
            console.log(user)

            alert(`Usuario registrado correctamente (Auth ${user.uid})`, 'success')
            registro.value.uuid = user.uid
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            switch (errorCode) {
                case 'auth/email-already-in-use':
                    alert(`El correo ${registro.value.correo} ya está en uso.`, 'error')
                    console.log(`Email address ${registro.value.correo} already in use.`);
                    existeFirestore = true
                    break;
                case 'auth/invalid-email':
                    alert(`El correo ${registro.value.correo} es inválido.`, 'error')
                    registroErrorPath.value.push('correo')
                    console.log(`Email address ${registro.value.correo} is invalid.`);
                    break;
                case 'auth/operation-not-allowed':
                    alert(`Error durante el registro.`, 'error')
                    console.log(`Error during sign up.`);
                    break;
                case 'auth/weak-password':
                    alert(`La contraseña es muy débil.`, 'error')
                    console.log('Password is not strong enough. Add additional characters including special characters and numbers.');
                    break;
                default:
                    alert(errorMessage, 'error')
                    console.log(error.message);
                    break;
            }
        });

    // Create in Firebase Firestore
    if (!existeFirestore) {
        const db = getFirestore()
        const usuarios = collection(db, 'usuarios')
        try {
            await setDoc(doc(usuarios, registro.value.uuid), {
                email: registro.value.correo,
                nombres: registro.value.nombres,
                apellidos: registro.value.apellidos,
                fechaNacimiento: registro.value.fechaNacimiento,
                institucion: "Otra",
                aprendizajeCategoriaFiltro: [
                    'Ciencia y Tecnología',
                    'Salud y Bienestar',
                    'Arte y Cultura',
                    'Negocios y Economía',
                    'Tendencia y Recomendaciones',
                ],
                comunidadCategoriaFiltro: [
                    'Salud y Bienestar',
                    'Alimenticio',
                    'Educación y Pedagogía',
                    'Diseño y Construcción',
                    'Digital y Tecnológico',
                    'Consultoría',
                    'Belleza y Moda',
                    'Sustentabilidad',
                    'Desarrollo e Investigación',
                    'Accesorios',
                    'Electrónicos',
                    'Entretenimiento',
                    'Otros',
                ],
                comunidadUniversidadFiltro: [
                    'Anahuac',
                    'EBC',
                    'Ibero',
                    'IPN',
                    'ITAM',
                    'ITESM',
                    'Justo Sierra',
                    'Panamericana',
                    'Tec Milenio',
                    'ULA',
                    'UNAM',
                    'ULSA',
                    'UVM',
                    'Tepeyac',
                ],
                habitos: [],
                fuegos: 0,
                listaAmigos: [],
                finanzas: [],
                metasCumplidas: 0,
                estrellas: 0,
                minutosTotales: 0,
                minutos: [
                    {
                        categoria: 'Académico',
                        minutos: 0,
                        minutosSemana: 0,
                    },
                    {
                        categoria: 'Proyectos',
                        minutos: 0,
                        minutosSemana: 0,
                    },
                    {
                        categoria: 'Personal',
                        minutos: 0,
                        minutosSemana: 0,
                    },
                    {
                        categoria: 'Trabajo',
                        minutos: 0,
                        minutosSemana: 0,
                    },
                    {
                        categoria: 'Aprendizaje',
                        minutos: 0,
                        minutosSemana: 0,
                    },
                ],
                minutosHoy: 0,
                minutosHoyDia: '',
                minutosMes: 0,
                minutosSemana: 0,
                since: new Date(),
                semanaHabitos: 0,
                estadisticasMesHabitos: 0,
                profilePic: '',
            })
            console.log('Usuario registrado correctamente en Firestore')
            alert('Usuario registrado correctamente (Firestore)', 'success')
        } catch (error) {
            alert('Error al registrar usuario (Firestore)', 'error')
            console.log(error)
        }
    }

    // Create in MongoDB
    const { data: { message } } = await useFetch('/api/registro', {
        method: 'POST',
        body: registro.value
    }).then(_ => alert('Usuario registrado correctamente (MongoDB)', 'success'))
        .catch(error => {
            alert('Error al registrar usuario (MongoDB)', 'error')
            console.log(error)
        })
}
</script>
<template>
    <div class="card text-center">
        <div class="card-header">
            <h5 class="card-title">

                <BootstrapIconPersonPlusFill class="me-2" width="25" height="25" />
                Registro
            </h5>
        </div>
        <div class="card-body">
            <form class="px-5 text-start">
                <div class="row">
                    <!-- Nombres -->
                    <div class="col-md-6">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="nombres" name="nombres" v-model="registro.nombres"
                                required :class="{ 'is-invalid': registroErrorPath.includes('nombres') }"
                                @input="$event.target.classList.remove('is-invalid')">
                            <label for="nombres">
                                <BootstrapIconPersonFill class="me-2" width="20" height="20" />
                                Nombres
                            </label>
                        </div>
                    </div>
                    <!-- Apellidos -->
                    <div class="col-md-6">
                        <div class="form-floating mb-3">
                            <input type="text" class="form-control" id="apellidos" name="apellidos"
                                v-model="registro.apellidos" required
                                :class="{ 'is-invalid': registroErrorPath.includes('apellidos') }"
                                @input="$event.target.classList.remove('is-invalid')">
                            <label for="apellidos">
                                <BootstrapIconPersonFill class="me-2" width="20" height="20" />
                                Apellidos
                            </label>
                        </div>
                    </div>
                </div>
                <!-- Fecha de nacimiento -->
                <div class="form-floating mb-3" data-bs-theme="light">
                    <input class="form-control" id="fechaNacimiento" name="fechaNacimiento" type="date"
                        v-model="registro.fechaNacimiento" required placeholder="Fecha de nacimiento"
                        :max="new Date(new Date().setFullYear(new Date().getFullYear() - 12)).toISOString().slice(0, 10)"
                        :min="new Date(new Date().setFullYear(new Date().getFullYear() - 100)).toISOString().slice(0, 10)"
                        :class="{ 'is-valid': registro.fechaNacimiento !== '' && registro.mayorDeEdad, 'is-invalid': registroErrorPath.includes('fechaNacimiento') }"
                        @input="$event.target.classList.remove('is-invalid')">
                    <label for="fechaNacimiento">
                        <BootstrapIconCalendarFill class="me-2" width="20" height="20" />
                        Fecha de nacimiento
                    </label>
                    <div class="valid-feedback">
                        <BootstrapIconCheckCircleFill class="text-success" />
                        Mayor de edad
                    </div>
                </div>
                <!-- Curso -->
                <div class="form-floating mb-3">
                    <select class="form-select" id="curso" name="curso" v-model="registro.curso" required
                        :class="{ 'is-invalid': registroErrorPath.includes('curso') }"
                        @input="$event.target.classList.remove('is-invalid')" aria-label="Floating label select example">
                        <option value="" disabled selected>Selecciona un curso</option>
                        <option v-for="curso in cursos" :value="curso.curso">
                            {{ curso.curso.toUpperCase() }}
                        </option>
                    </select>
                    <label for="curso" class="form-label">
                        <BootstrapIconBookHalf class="me-2" width="20" height="20" />
                        Elección de curso
                    </label>
                </div>
                <!-- Información -->
                <div class="form-floating mb-3">
                    <select class="form-control" id="informacion" name="informacion" v-model="registro.informacion" required
                        :class="{ 'is-invalid': registroErrorPath.includes('informacion') }"
                        @input="$event.target.classList.remove('is-invalid')">
                        <option value="" disabled selected>Selecciona una opción</option>
                        <option v-for="info in información" :value="info">
                            {{ info }}
                        </option>
                    </select>
                    <label for="informacion" class="form-label">
                        <BootstrapIconInfoCircleFill class="me-2" width="20" height="20" />
                        Dónde te enteraste de nosotros
                    </label>
                </div>
                <!-- Correo -->
                <div class="form-floating mb-3">
                    <input type="email" class="form-control" id="correo" name="correo" v-model="registro.correo" required
                        :class="{ 'is-invalid': registroErrorPath.includes('correo') }"
                        @input="$event.target.classList.remove('is-invalid')">
                    <label for="correo" class="form-label">
                        <BootstrapIconEnvelopeFill class="me-2" width="20" height="20" />
                        Correo
                    </label>
                </div>
                <!-- Términos y condiciones -->
                <div class="mb-3 form-check">
                    <input type="checkbox" class="form-check-input text-success" id="terminos" required
                        v-model="registro.terminos" :class="{ 'is-invalid': registroErrorPath.includes('terminos') }"
                        @input="$event.target.classList.remove('is-invalid')">
                    <label class="form-check-label" for="terminos"> Acepto las <a href="#" data-bs-toggle="modal"
                            data-bs-target="#terminos-y-condiciones">
                            Condiciones de uso</a>, <a href="https://www.studially.com/privacidad">
                            Aviso de
                            Privacidad
                        </a>, y <a href="https://www.studially.com/privacidad">Términos y
                            Condiciones</a>.</label>
                    <div class="invalid-feedback">
                        <BootstrapIconXCircleFill class="text-danger" />
                        Debes aceptar los términos y condiciones
                    </div>
                </div>
                <p class="text-center">
                    ¿Ya tienes una cuenta? <a href="login">Inicia sesión</a>
                </p>
                <p class="text-center">
                    <a href="https://wa.me/message/3TJFVQ35CHB4A1" target="_blank"
                        class="text-decoration-none btn btn-outline-primary">
                        <BootstrapIconWhatsapp class="me-2" width="20" height="20" />
                        Solicitar ayuda
                    </a>
                </p>
            </form>
        </div>
        <div class="card-footer px-5" v-if="registro.nombres !== '' &&
            registro.apellidos !== '' &&
            registro.fechaNacimiento !== '' &&
            registro.curso !== '' &&
            registro.informacion !== '' &&
            registro.correo !== '' &&
            registro.terminos
            ">
            <div class="d-grid">
                <button class="btn btn-primary btn-lg" type="button" @click="registroUsuario" :disabled="loading">
                    <span>
                        <span v-if="loading" class="spinner-border spinner-border-sm" role="status"
                            aria-hidden="true"></span>
                        <BootstrapIconPersonPlusFill class="me-2" width="20" height="20" />
                        Registrarse
                    </span>
                </button>
            </div>
        </div>
    </div>
    <ClientOnly>
        <BModal id="terminos-y-condiciones" title="Condiciones de uso" colour="dark">
            <template #body>
                CONDICIONES DE USO: UNAM, CENEVAL, UAM, IPN, COMIPEMS, EXHCOBA, COLLEGEBOARD, etc, son empresas y/o
                marcas registradas, NO vinculadas a DEVRI DESARROLLO VANGUARDISTA, RADICAL E INNOVADOR S.A.P.I. DE
                C.V. ni a "Studially". Este sitio web no está aprobado ni vinculado a ninguna de estas instituciones
                o procesos de admisión. Ninguna de nuestras herramientas garantiza el ingreso ni el aprovechamiento
                de estudio. El Usuario deberá leer detenidamente las siguientes las condiciones de uso antes de
                utilizar o registrarse al sitio web www.studially.com o www.studially.online y a nuestra app
                “Studially”. DEVRI DESARROLLO VANGUARDISTA, RADICAL E INNOVADOR S.A.P.I. DE C.V. y "Studially" no
                garantizan de ninguna manera el ingreso a ninguna institución de educación y se reservan el derecho
                de cambiar el material, herramientas o contenido de acuerdo a los distintos requerimientos de la
                empresa. Al ingresar, todos los usuarios están aceptando el aviso de privacidad, y los términos y
                condiciones del sitio. Nos reservamos el uso de los datos personales proporcionados por el usuario
                para los fines que competan a la empresa.
            </template>
            <template #footer>
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                    <BootstrapIconX-circle class="me-2" width="20" height="20" />
                    Cerrar
                </button>
            </template>
        </BModal>
    </ClientOnly>
</template>
<style scoped>
input {
    color-scheme: light;
}
</style>