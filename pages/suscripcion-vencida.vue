<template>
  <div class="d-flex flex-column align-items-center justify-content-center" style="height: clamp(50vh, 100vh - 100px, 100vh)">
    <div class="alert alert-danger" role="alert">
      <h4 class="alert-heading">¡Suscripción vencida!</h4>
      <p>Tu suscripción ha vencido. Por favor, renueva tu suscripción para continuar disfrutando de nuestros servicios.</p>
      <hr>
      <p class="mb-0">Si tienes alguna pregunta, no dudes en <a href="">contactarnos</a>.</p>
    </div>
  </div>
</template>


<script setup lang="ts">
definePageMeta({
  middleware: ['subscribed']
})
</script>