<script setup>
const { getSession } = useAuth()
const { user } = await getSession()
const { data: resultados } = await useFetch('/api/progreso', {
    transform: data => data.resultados,
    pick: ['resultados']
})
if (resultados.value) {
    navigateTo('/plan-personalizado')
}

const { data: materias } = await useFetch('/api/curso', {
    transform: data => data.temario.map(({ materia }) => materia),
    query: { email: user?.email }
});


const { default: parámetros } = await import('~/assets/params/preguntas.json')
const { default: opciones } = await import('~/assets/params/dominio-materias.json')
definePageMeta({
    middleware: [async function (to, from) {
        const { data: resultados } = await useFetch('/api/progreso')
        if (resultados.value) {
            return navigateTo('/plan-personalizado/calcular')
        }
    },
        'subscribed']
})

const calcularPlan = async () => {
    const { data: plan } = await useFetch('/api/resultados', {
        method: 'POST',
        body: {
            email: user?.email,
            parámetros: parámetros.map(({ categoria, valor }) => ({ categoria, valor })),
            materias: materias.map((materia, index) => ({ materia, valor: opciones[index] }))
        }
    })
    if (plan.value) {
        navigateTo('/plan-personalizado')
    }
}

</script>

<template>
    <h2 class="display-6 mb-4">
        <BootstrapIconCalculatorFill class="mx-2" width="40" height="40" />
        Plan de Horas de Estudio Personalizado
    </h2>
    <p class="lead">
        Responde las siguientes preguntas y puntos para obtener tu plan de horas de estudio autodidacta
        personalizado.
    </p>
    <div class="mt-5">
        <div class="row">
            <div class="col-md-6">
                <div class="mb-3" v-for="(param, index) in parámetros" :key="index">
                    <label :for="param.categoria" class="form-label">
                        <strong>{{ param.pregunta }}</strong>
                    </label>
                    <div class="input-group">
                        <select :id="param.categoria" class="form-select"
                            @change="addCategoria('planificador', param.categoria, $event.target.value)"
                            v-model="param.valor">
                            <option :value="undefined" selected disabled>Selecciona una opción</option>
                            <option :value="index" v-for="(opcion, index) in param.opciones">{{ opcion }}</option>
                        </select>
                        <span class="input-group-text">
                            <BootstrapIconQuestionCircleFill v-if="!(param.valor >= 0)" />
                            <BootstrapIconCheckCircleFill class="text-success" v-else />
                        </span>
                    </div>
                </div>
            </div>
            <div class="col-md-6">
                <div class="overflow-auto" style="max-height: 30rem;">
                    <h2 class="display-6">
                        <BootstrapIconBookmarkFill class="mx-2" />
                        Dominio de materias
                    </h2>
                    <div class="mb-3" v-for="(materia, index) in materias" :key="index">
                        <label :for="materia" class="form-label">
                            <strong>{{ materia }}</strong>
                        </label>
                        <div class="input-group">
                            <select :id="materia" class="form-select"
                                @change="addCategoria('dominio-materias', materia.materia, $event.target.value)"
                                v-model="materia.valor">
                                <option :value="undefined" selected disabled>Selecciona tu dominio</option>
                                <option :value="index + 1" v-for="(opcion, index) in opciones">{{ opcion }}
                                </option>
                            </select>
                            <span class="input-group-text">
                                <BootstrapIconBookmarkFill v-if="!(materia.valor >= 0)" />
                                <BootstrapIconCheckCircleFill class="text-success" v-else />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <button @click="calcularPlan" class="btn btn-primary btn-lg mb-5"
        :disabled="!(parámetros.every((p) => p.valor >= 0) && materias.datos.every((m) => m.valor >= 0))" id="calcularPlan"
        data-bs-toggle="tooltip" data-bs-placement="right" data-bs-custom-class="custom-tooltip"
        data-bs-title="Esta es la única vez que puede hacerse este formulario y una vez respondido no podrán modificarse las respuestas.">
        Calcular Plan
        <BootstrapIconCalculator />
    </button>
</template>

