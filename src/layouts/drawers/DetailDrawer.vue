<template>
  <q-drawer
    class="column scrollbar-container"
    behavior="desktop"
    bordered
    overlay
    side="left"
    :width="500"
  >
    <div class="col-4 column items-center q-my-sm">
      <DelayChart />
    </div>
    <DelayConfigurator />
    <q-space />
    <q-list bordered separator>
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

import DelayChart from '@/components/DelayChart.vue';
import { gm_storage } from '@/utils/storage';
import DelayConfigurator from '@/components/DelayConfigurator.vue';

const { dialog, notify } = useQuasar();

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

<style scoped lang="scss"></style>
