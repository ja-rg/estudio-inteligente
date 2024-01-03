<template>
  <div class="certificate">
    <NuxtImg src="/img/LogoHeader.png" class="logo" alt="Studially" width="250" />
    <h1 class="title">CONSTANCIA DE FINALIZACIÓN</h1>
    <p class="program">Programa de Estrategias de Estudio Efectivo y Técnicas de Gestión del Tiempo</p>
    <br>
    <p class="nombre">
      {{ user?.name }}
    </p>
    <br>
    <p class="description">Por haber completado con éxito los 10 módulos del programa en línea en su parte teórica y
      práctica, cumpliendo con las horas de formación dentro de la Plataforma de Estudio Inteligente "Studially".
    </p>
    <p class="consent">DEVRI DESARROLLO VANGUARDISTA, RADICAL E INNOVADOR S.A.P.I. DE C.V.</p>
  </div>
</template>

<script lang="ts" setup>
const { getSession } = useAuth()
const { user } = await getSession()
</script>

<style scoped>
body {
  font-family: 'Montserrat';
  background-color: #f0f0f0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.certificate {
  position: relative;
  background: linear-gradient(to bottom left, #E9F5FF 50%, #D4E3F1 50%);
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 40px;
  text-align: center;
}

img {
  margin-top: 40px;
}


.title {
  font-size: 35px;
  font-weight: bold;
  margin: 20px 0;
  color: #0C57BE;
}

.program {
  font-size: 30px;
  font-weight: bold;
  margin: 20px 0;
  font-style: italic;
}

.nombre {
  font-size: 30px;
  font-weight: bold;
  margin: 10px 0;
  color: #ffb800;
  text-decoration: underline;
}

.description {
  font-size: 22px;
  margin: 20px 0;
}

.consent {
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  color: #0C57BE;
}

/* add dark transparent background to the image */
.certificate img {
  background: #0c56be3f;
  border-radius: 20px;
  padding: 5px;
}
</style>