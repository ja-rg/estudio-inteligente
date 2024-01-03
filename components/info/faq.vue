<template>
    <div id="faqsContent">
        <div class="faq-container">
            <h1>Preguntas Frecuentes</h1>
            <div>Aquí podrás encontrar las respuestas a las principales dudas de nuestros usuarios
                respecto a la plataforma de estudio inteligente "Studially". Si no encuentras respuesta
                a tu pregunta, por favor contáctate con nosotros en el botón de "Soporte técnico"
                ubicado en tu perfil.<br></div>

            <div v-for="pregunta in preguntasFrecuentes">
                <h3>{{ pregunta.sección }}</h3>
                <div v-for="pregunta in pregunta.preguntas">
                    <div class="question" @click="pregunta.visible = !pregunta.visible">
                        {{ pregunta.pregunta }}
                    </div>
                    <div class="answer" :class="{ visible: pregunta.visible }">
                        {{ pregunta.respuesta }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const preguntasFrecuentes = [
    {
        sección: 'Login',
        preguntas: [
            { pregunta: '¿Qué puedo hacer si olvide mi contraseña?', respuesta: 'Al iniciar sesión da click en "Olvidé mi contraseña" y sigue el proceso descrito.' },
        ]
    },
    {
        sección: 'Plan de estudio personalizado',
        preguntas: [
            { pregunta: '¿Para qué sirve el cuestionario?', respuesta: 'El cuestionario es de gran importancia para poder generar tu plan de estudio personalizado. Posterior a realizarlo podrás consultar las horas que te recomendamos de estudio autónomo y de qué forma las puedes cumplir. Solo puedes realizar 1 vez este cuestionario.' },
            { pregunta: '¿Cómo puedo avanzar en mis horas de estudio?', respuesta: 'Debes descargar la app móvil "Studially" e iniciar sesión con los mismos datos que en la plataforma web. Posteriormente en el apartado de organización, podrás seleccionar la categoría "académico" y podrás poner en el temporizador el tiempo que vayas destinando a tu estudio.' },
            { pregunta: '¿Por qué debo estudiar X número de horas?', respuesta: 'Es nuestra recomendación de horas de estudio autónomo para acercarte a un mejor resultado en tu examen. Te indicamos la cantidad de horas totales, por mes y por semana.' },
            { pregunta: '¿A qué se refiere la recomendación de estudio semanal por materia?', respuesta: 'Para cubrir tus horas semanales te recomendamos distribuir tus minutos de esa forma, le damos más tiempo de estudio a las materias que indicaste que te costaban más trabajo, todo para que tengas un plan de estudio fácil de seguir.' },
        ]
    },
    {
        sección: 'Marcador de temas',
        preguntas: [
            {preguntas: '¿Qué significan la materias que aparecen?', respuesta: 'Son las materias que vendrán en tu examen, a grandes razgos es el temario que debes estudiar.'},
            {preguntas: '¿Por qué debo ponerle un color a cada tema?', respuesta: 'Para que puedas visualizar de mejor forma tu avance en cada tema de tu examen. Cada color significa un nivel de dominio, te sirve para saber qué temas te cuestan trabajo o no has estudiado, cuáles ya tienes avanzados y cuáles ya dominas.'},
        ],

        sección: 'Programa de aprovechamiento',
        preguntas: [
            {preguntas: '¿Para qué me sirve este programa?', respuesta: 'En este programa aprenderás las mejores técnicas de gestión del tiempo y las mejores estrategias de estudio que te serán de gran utilidad para aprovechar de mejor manera el curso de preparación en el cuál estes inscrito o en tu estudio autónomo.'},
            {preguntas: '¿Por qué los demás videos me aparecen bloqueados?', respuesta: 'Porque debes de darle click en el botón de "Marcar completado", de esta forma se te desbloquea el siguiente módulo.'},
            {preguntas: '¿Se me da una constancia?', respuesta: 'Si, una vez que todos los módulos han sido completados se te arroja una constancia de cumplimiento.'},
            {preguntas: '¿Para qué me sirven los PDF\'s disponibles?', respuesta: 'Te brindamos archivos PDF relacionados a cada módulo o clase del programa para que puedas consolidar y practicar los temas vistos en tu estudio.'},
        ],

        sección: 'Masterclass',
        preguntas: [
            {preguntas: '¿De qué se trata esta masterclass?', respuesta: 'Se trata de una sesión de reflexión y motivación previo a tu examen para que puedas sacar lo mejor de ti y estes listo para ser un aspirante seleccionado.'},
            {preguntas: '¿Por qué necesito tener el 80% de mi avance de horas para acceder a esta sección?', respuesta: 'Porque es una sesión que se debe tomar previo a tu examen, por lo que necesitas tener al menos el 80% de avance en tus horas de estudio para que se te considere como un candidato que esta pronto a presentar su examen de admisión.'},
            {preguntas: '¿Necesito algún material?', respuesta: 'De ser necesario algún material se te indicará al inicio de la sesión y podrás conseguirlo facilmente en tu casa.'},
        ],

        sección: 'Exámenes simulacro',
        preguntas: [
            {preguntas: '¿Por qué solo tengo un intento por examen?', respuesta: 'Para que tu examen sea lo más cercano a un examen real, lo ideal es que solo tengas un intento para responder el examen.'},
            {preguntas: '¿Por qué tengo un tiempo límite para responder mi examen?', respuesta: 'El examen real de admisión tiene un tiempo límite, mismo que utilizamos para que tengas una experiencia real dentro del simulador.'},
            {preguntas: '¿Cómo veo mis resultados?', respuesta: 'Al enviar y terminar el intento de tu examen se te arrojará el resultado del mismo para que puedas conocer tu nivel de preparación hasta el momento.'},
        ],

        sección: 'Perfil',
        preguntas: [
            {preguntas: '¿Qué pasa si mis datos no son correctos?', respuesta: 'Contáctate con nosotros en el botón "Soporte Técnico" ubicado en tu perfil.'},
            {preguntas: '¿Para qué me sirve conocer la información legal de la plataforma?', respuesta: 'Es información que ponemos a tu disposición, la misma que aceptaste al realizar tu registro.'},
            {preguntas: '¿Para que sirve el botón de "Soporte Técnico"?', respuesta: 'Para mandarnos por mensaje todas tus dudas o problemas, te atenderemos tan pronto sea posible.'},
        ],

        sección: 'Studially App Móvil',
        preguntas: [
            {preguntas: '¿Dónde puedo encontrar información y responder mis dudas respecto a la app móvil "Studially"?', respuesta: 'En la siguiente liga: <NuxtLink to="https://www.studially.com/ayuda" target="_blank">studially.com/ayuda</NuxtLink>'},
        ],
    }
]

</script>

<style scoped>
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    text-align: justify;
}

.faq-container>h1 {
    text-align: center;
    color: #1171C7;
}

.faq-container>h3 {
    text-align: left;
    color: #0B9700;
    /* Change heading color to teal */
}

.faq-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

.question {
    cursor: pointer;
    font-weight: bold;
    color: #fff;
    /* Change question text color to white */
    background-color: #1171C7;
    /* Add teal background color to questions */
    padding: 10px;
    margin-bottom: 5px;
    border-radius: 5px;
    /* Add rounded corners to question background */
}

.answer {
    display: none;
    color: #555;
    /* Change answer text color to gray */
    padding-left: 20px;
}

.answer.visible {
    display: block;
}
</style>