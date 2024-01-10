<template>
  <InfoConstancia />
</template>

<script lang="ts" setup>
const { data: curso, error: curso_error } = await useFetch('/api/curso');
const { data: progreso, error: progreso_error, refresh } = await useFetch('/api/progreso');

definePageMeta({
  middleware: 'subscribed',
  layout: '',
})

if (progreso?.value.estrategiasVistas < curso.value.estrategias.length) {
  navigateTo('/programas-aprovechamiento')
}
</script>