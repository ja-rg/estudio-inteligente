<template>
  Test
  <pre>
    {{data}}
  </pre>
</template>

<script lang="ts" setup>
const {data} = useFetch('/api/progreso/examen-terminar')

</script>

<style>

</style>