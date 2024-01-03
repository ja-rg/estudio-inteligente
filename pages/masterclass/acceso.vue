<script setup>

const { getSession } = useAuth()
const { user } = await getSession()
const { data, error } = await useFetch('/api/curso', { pick: ['videos-extra'] })


const { data: resultados } = await useFetch('/api/progreso', {
    transform: data => data.resultados,
    pick: ['resultados']
})
const firebase = reactive({
    minutosTotales: 0
})

import {
    getAuth, signInWithEmailAndPassword
} from "firebase/auth";
import {
    getFirestore, query, where, collection,
    getDocs
} from "firebase/firestore";


const auth = getAuth();
await signInWithEmailAndPassword(auth, "ricardogomez@lasallistas.org.mx", "317899Ricardo@!!!...")
const db = getFirestore();
const usuarioRef = collection(db, "usuarios");

// query where email == email
const queryEmail = query(usuarioRef, where("email", "==", user.email));
const querySnapshot = await getDocs(queryEmail);
querySnapshot.forEach((doc) => {
    firebase.minutosTotales = doc.data().minutosTotales
});

if (resultados.value || (firebase.minutosTotales / 60 / resultados.value?.totalHoras * 100) >= 80) { // 80% de las horas totales
    navigateTo('/masterclass/')
}


definePageMeta({
    middleware: 'subscribed'
})
</script>
<template>
    <BCard>
        <template #header>
            <h5 class="modal-title">Acceso Restringido</h5>
        </template>
        <template #body>
            <p class="lead">
                Tu plan no cuenta con acceso a esta sección de la plataforma. Solo esta disponible para usuarios
                con el "Plan de Estudio Inteligente Studially con Simuladores", si crees que es un error,
                comunícate con nosotros en el botón de "Soporte Técnico" dentro de tu
                <NuxtLink to="/perfil">
                    <BootstrapIconPersonFill class="me-1" /> Perfil
                </NuxtLink>.
            </p>
        </template>
        <template #footer>
            <!-- regresar al inicio -->
            <div class="d-grid gap-2">

                <NuxtLink to="/" class="btn btn-primary btn-lg btn-block">
                    <BootstrapIconHouseFill class="me-1" />
                    Regresar al inicio
                </NuxtLink>
            </div>
        </template>
    </BCard>
</template>