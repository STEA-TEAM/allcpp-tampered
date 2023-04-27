<template>
  <q-drawer :width="300" behavior="desktop" bordered overlay side="left">
    <Line :data="chartData" :options="chartOptions" />
    <q-list>
      <q-item v-ripple clickable @click="clearSettings">
        <q-item-section>
          <q-item-label>重置配置数据</q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon name="open_in_new" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { Line } from 'vue-chartjs';

import { useSettingsStore } from '@/stores/ticket';
import { gm_storage } from '@/utils/storage';
import { computed } from 'vue';

const { dialog, notify } = useQuasar();
const { delayFunctions, getDelay } = useSettingsStore();

const chartData = computed(() => {
  const start = 0;
  const end = 50;
  const datasets = [];
  console.log(delayFunctions);
  for (const name in delayFunctions) {
    datasets.push({
      label: name,
      data: [getDelay(name, start), getDelay(name, end)],
    });
  }
  return {
    labels: [start, end * 5],
    datasets,
  };
});
const chartOptions = {
  responsive: true,
};

const clearSettings = () => {
  dialog({
    title: '重置配置数据',
    message: '确定要重置所有配置数据吗？重置后当前页面会刷新',
    cancel: true,
  }).onOk(() => {
    gm_storage.listItems().forEach((key) => {
      gm_storage.removeItem(key);
    });
    notify({
      type: 'positive',
      message: '重置成功',
    });
    setTimeout(() => {
      location.reload();
    }, 2000);
  });
};
</script>

<style scoped></style>
