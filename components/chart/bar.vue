<template>
  <Pie id="my-chart-id" :options="chartOptions" :data="chartData" />
</template>

<script lang="ts" setup>
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, DoughnutController } from 'chart.js'
import { ref } from 'vue'

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, DoughnutController)

const props = defineProps({
  labels: Array,
  data: Array,
  label: String,
  colors: Array
})

const chartData = ref({
  labels: props.labels || ['January', 'February', 'March'],
  datasets: [{
    data: props.data || [40, 20, 12], label: props.label || 'Recomendación de estudio', backgroundColor: props.colors ||
      ['#dcedc1', '#a7c7e7', '#dbcdf0', '#faedcb', '#f7d9c4',]
  }]
})

const chartOptions = ref({
  responsive: true,
  plugins: {
    legend: {
      display: false
    }
  }
})
</script>