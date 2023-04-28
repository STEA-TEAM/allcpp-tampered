<template>
  <Line :data="chartData" :options="chartOptions" style="position: relative" />
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
  const inputs = Array(6).fill(0).map((_, index) => index * 50);
  const datasets = [];
  for (const delayFunction: DelayFunction of delayFunctions.value) {
    const { name, borderColor, slope, offset } = delayFunction;
    datasets.push({
      label: name,
      borderColor: getPaletteColor(borderColor),
      data: inputs.map((input) => slope * (input + offset)),
    });
  }
  return {
    labels: inputs,
    datasets,
  };
});

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
    tooltip: {
      enabled: true,
    },
  },
  radius: 0,
  responsive: true,
  scales: {
    x:{
      title: {
        display: true,
        text: '当前延迟(ms)'
      }
    },
    y: {
      grid: {
        color: ({ tick }) => {
          return tick.label === '0' ? '#1d1d1d' : '#e5e5e5';
        },
      },
      min: -2,
      title: {
        display: true,
        text: '生成延迟(ms)'
      }
    },
  },
};
</script>

<style scoped></style>
