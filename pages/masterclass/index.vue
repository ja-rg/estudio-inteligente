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

if (!resultados.value || (firebase.minutosTotales / 60 / resultados.value?.totalHoras * 100) < 80) { // 80% de las horas totales
    navigateTo('/masterclass/acceso')
}


definePageMeta({
    middleware: 'subscribed'
})

</script>
<template>
    <div class="container mt-5" v-if="true">
        <h2>
            <BootstrapIconBookmarkCheckFill class="text-primary" width="40" height="40" />Masterclass de Motivación,
            Reflexión y Relajación Previo al
            Examen.
        </h2>

        <p class="lead">
            Sabemos que previo a tu examen puedes sentir nervios, miedo, pena o temor. Mediante ésta masterclass
            podrás relajarte, reflexionar y motivarte para dar lo mejor de ti en tu examen.
        </p>

        <div class="card mb-3">
            <video class="card-img-top" controls controlsList="nodownload" poster="/img/CoverMaster.png">
                <source :src="`https://drive.google.com/uc?export=view&id=${data['videos-extra']?.masterclass}`"
                    type="video/mp4">
                Your browser does not support the video tag.
            </video>
            <div class="card-body">
                <h5 class="card-title">Masterclass</h5>
                <p class="card-text">Este reto solo es el inicio de un futuro próspero y un camino asombroso.
                    ¡Éxito Studialler, tú puedes!</p>
                <p class="card-text"><small class="text-body-secondary">
                        <a id="descargar-pdf" class="btn btn-primary"
                            :href="`https://drive.google.com/uc?export=view&id=${data['videos-extra']['masterclass-pdf']}`"
                            download target="_blank">
                            Descargar PDF
                            <BootstrapIconDownload />
                        </a>
                    </small></p>
            </div>
        </div>
    </div>
</template>