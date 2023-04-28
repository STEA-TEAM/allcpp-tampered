<template>
  <div class="column q-gutter-y-sm q-px-sm">
    <q-card
      v-for="(delayFunction, index) in delayFunctions"
      :key="index"
      class="column q-px-md q-py-sm"
      bordered
      flat
    >
      <div class="row justify-between items-center">
        <div>错误类型：{{ delayFunction.name }}</div>
        <q-toggle
          :disable="index === 0"
          label="启用"
          v-model="delayFunction.enable"
        />
      </div>
      <div class="row items-center q-gutter-x-md">
        <q-slider
          class="col-grow"
          :color="delayFunction.borderColor"
          label
          :max="0.15"
          :min="-0.15"
          :step="0.001"
          v-model.number="delayFunction.slope"
        />
        <q-input
          :color="delayFunction.borderColor"
          dense
          label="斜率"
          outlined
          v-model.number="delayFunction.slope"
          style="width: 100px"
          @keydown.down.prevent="delayFunction.slope -= 0.001"
          @keydown.up.prevent="delayFunction.slope += 0.001"
        />
      </div>
      <div class="row items-center q-gutter-x-md">
        <q-slider
          class="col-grow"
          :color="delayFunction.borderColor"
          label
          :max="100"
          :min="-300"
          :step="1"
          v-model.number="delayFunction.offset"
        />
        <q-input
          :color="delayFunction.borderColor"
          dense
          label="X轴偏移"
          outlined
          v-model.number="delayFunction.offset"
          style="width: 100px"
          @keydown.down.prevent="delayFunction.offset -= 1"
          @keydown.up.prevent="delayFunction.offset += 1"
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
