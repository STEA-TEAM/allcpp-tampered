<template>
  <Line
    :data="chartData"
    :options="chartOptions"
    style="position: relative"
  />
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { colors } from 'quasar';
import { Line } from 'vue-chartjs';

import { DelayFunction, useSettingsStore } from '@/stores/ticket';
import { computed } from 'vue';

const { getPaletteColor } = colors;
const { delayFunctions } = storeToRefs(useSettingsStore());

const chartData = computed(() => {
  const datasets = [];
  for (const delayFunction: DelayFunction of delayFunctions.value) {
    const { name, borderColor, slope, offset } = delayFunction;
    datasets.push({
      label: name,
      borderColor: getPaletteColor(borderColor),
      data: Array(5)
        .fill(1)
        .map((element, index) => slope * ((element + index) * 10 + offset) * 5),
    });
  }
  return {
    labels: Array(5)
      .fill(1)
      .map((element, index) => (element + index) * 50),
    datasets,
  };
});
console.log(chartData);

const chartOptions = {
  fill: false,
  interaction: {
    intersect: false,
  },
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
    },
    title: {
      display: true,
      text: '不同错误的动态延迟函数',
    },
    tooltip: {
      enabled: true,
    },
  },
  radius: 0,
  responsive: true,
  scales: {
    y: {
      grid: {
        color: ({ tick }) => {
          return tick.label === '0' ? '#1d1d1d' : '#e5e5e5';
        },
      },
      min: -2,
    },
  },
};
</script>

<style scoped></style>
