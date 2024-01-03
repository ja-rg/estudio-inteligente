<script setup>
definePageMeta({
    middleware: [async function (to, from) {
        const { data: resultados } = await useFetch('/api/progreso')

       
        if (!resultados.value) {
            return navigateTo('/plan-personalizado/calcular')
        }

    },

        'subscribed']
})

const { getSession } = useAuth()
const { user } = await getSession()
const { data: resultados, error } = await useFetch('/api/progreso', {
    // pick: ['resultados'],
    transform: data => data.resultados
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
</script>
<template>
    <div class="container my-5" v-if="resultados">
        <header class="py-4">
            <h1 class="text-center display-4">
                <i class="bi bi-book mx-2"></i> Mi Estudio
            </h1>
            <p class="lead">
                Para contabilizar tus horas de estudio debes acceder a la app móvil “Studially” con tu cuenta.
                En la sección de “Organización” podrás utilizar el temporizador de estudio en la categoría
                “Académico” para medir tus horas de estudio. A continuación te mostramos tu avance.
            </p>
        </header>

        <!-- Progress Bar -->
        <div class="container align-items-center justify-content-center w-100 text-center">
            <div class="row">
                <div class="col-12">
                    <div class="progress shadow my-2" role="progressbar" aria-valuemin="0" aria-valuemax="100"
                        :aria-valuenow="Math.round(firebase.minutosTotales / 60 / resultados?.totalHoras * 100)">
                        <div class="progress-bar"
                            :style="{ width: `${Math.round(firebase.minutosTotales / 60 / resultados?.totalHoras * 100)}%` }">
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="fw-bold col-12">
                    <span class="m-3 text-primary">Meta {{ resultados?.totalHoras }} horas</span>
                </div>
            </div>
            <div class="row">
                <div class="fw-bold mt-3 col-12">
                    <span>
                        Actualmente llevas {{ Math.round(firebase.minutosTotales / 60) }} horas de estudio
                    </span>
                </div>
            </div>
        </div>


        <h3 class="my-3">
            <BootstrapIconCalendar class="me-2" width=30 height=30 />Mi Plan de Estudio Personalizado
        </h3>
        <p class="lead">
            Según el formulario que respondiste ponemos a tu disposición el siguiente plan de estudio
            personalizado.
        </p>
        <div class="row">
            <div v-for="(imgSrc, index) in ['/plan/IMG1.png', '/plan/IMG2.png', '/plan/IMG3.png']"
                class="col-12 col-md-4 mb-4">
                <div class="card bg-light shadow-none">
                    <NuxtImg :src="imgSrc" class="card-img-top img-fluid" alt="..." />
                    <div class="card-body">
                        <p class="card-text lead" v-if="index === 0">En total deberás estudiar <strong
                                class="fw-bolder font-monospace">{{ resultados?.totalHoras }}
                                horas</strong>
                            de manera autodidacta.</p>
                        <p class="card-text lead" v-if="index === 1">Es decir, <strong class="fw-bolder font-monospace">{{
                            resultados?.totalHorasMes }}
                                horas</strong> al mes
                            durante <strong class="fw-bolder font-monospace">
                                {{
                                    Math.round(resultados?.totalHoras /
                                        resultados?.totalHorasMes)
                                }} meses</strong>.
                        </p>
                        <p class="card-text lead" v-if="index === 2">Cada semana te recomendamos cubrir
                            <strong class="fw-bolder font-monospace">{{ resultados?.totalHorasSemana }}
                                horas</strong>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recomendación de Estudio Semanal -->
        <section class="mt-5">
            <div class="card stylish-card">
                <h2 class="card-header text-center py-3">
                    <BootstrapIconPencil class="me-2" width=30 height=30 />
                    Recomendación de Estudio Semanal
                </h2>
                <div class="card-body chart-area">
                    <div class="row align-items-center">
                        <div class="col-12 col-md-5">
                            <div class="table-responsive">
                                <table class="table table-hover table-striped table-bordered">
                                    <thead class="thead-light">
                                        <tr>
                                            <th>Materia</th>
                                            <th>Minutos</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="materia in resultados?.materias">
                                            <td>{{ materia?.materia }}</td>
                                            <td>{{ materia?.horasSemana }} minutos</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="chart-container col-12 col-md-6">
                            <ChartBar :labels="resultados?.materias.map(materia => materia.materia)"
                                :data="resultados.materias.map(materia => materia.horasSemana)"
                                label="Recomendación de estudio semanal" />
                        </div>
                    </div>
                </div>
                <div class="card-footer text-muted text-center">
                    Tips: Pon el mouse sobre las secciones para ver el detalle de cada materia.
                </div>
            </div>
        </section>
    </div>
</template>