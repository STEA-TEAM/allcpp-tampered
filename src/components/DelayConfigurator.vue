<template>
  <div class="column q-gutter-y-sm q-px-sm">
    <q-card
      v-for="(delayFunction, index) in delayFunctions"
      :key="index"
      class="column"
      bordered
      flat
    >
      <div class="q-pt-sm q-px-md">
        <div>错误类型：{{ delayFunction.name }}</div>
        <q-slider
          :color="delayFunction.borderColor"
          label
          markers
          :max="0.15"
          :min="-0.15"
          :model-value="delayFunction.slope"
          :step="0.005"
          @change="
            (val) => {
              delayFunction.slope = val;
            }
          "
        />
        <q-slider
          :color="delayFunction.borderColor"
          label
          markers
          :max="50"
          :min="-50"
          :model-value="delayFunction.offset"
          :step="5"
          @change="
            (val) => {
              delayFunction.offset = val;
            }
          "
        />
      </div>
    </q-card>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { useSettingsStore } from '@/stores/ticket';

const { delayFunctions } = storeToRefs(useSettingsStore());
</script>

<style scoped></style>
