<template>
  <q-btn
    :color="buyInterval ? 'negative' : 'primary'"
    :disable="!ticket"
    :label="buyInterval ? '停止抢票' : '开始抢票'"
    size="lg"
    @click="toggleBuyState"
  />
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';

import { useSettingsStore } from '@/stores/ticket';
import { buyTicketAlipay } from '@/utils/network';
import { getErrorMessage } from '@/utils/message';

export interface Props {
  modelValue: number;
  errors: Map<string, number>;
  ticket: number;
  count?: number;
  purchasers?: number[];
  validate: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits(['update:errors', 'update:modelValue']);

const dynamicBuyDelay = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value);
  },
});

const { getDelay } = useSettingsStore();

const buyInterval = ref(0);
let lastBuyTime = 0;

const updateErrors = (key, value) => {
  emit('update:errors', [key, value]);
};
const resetInterval = () => {
  clearInterval(buyInterval.value);
  buyInterval.value = 0;
  dynamicBuyDelay.value = 125;
  lastBuyTime = 0;
};

const buyTicket = async () => {
  if (dynamicBuyDelay.value > 250) {
    dynamicBuyDelay.value = 250;
  }
  const currentTime = new Date().getTime();
  if (currentTime - lastBuyTime < dynamicBuyDelay.value) {
    return;
  } else {
    lastBuyTime = currentTime;
  }

  buyTicketAlipay(
    props.ticket,
    props.validate ? undefined : props.count,
    props.validate ? props.purchasers : undefined
  )
    .then(resetInterval)
    .catch((err) => {
      const errorMessage = getErrorMessage(err);
      const delay = getDelay(errorMessage, dynamicBuyDelay.value);
      switch (errorMessage) {
        case '系统繁忙，请稍后再试':
        case '服务器压力过大，请您稍后再试。':
        case '请求过于频繁！':
        case '请求失败':
          dynamicBuyDelay.value += delay > 0 ? delay : 0;
          break;
        default:
          dynamicBuyDelay.value -= delay > 0.1 ? delay : 0.1;
          break;
      }
      if (props.errors.has(errorMessage)) {
        updateErrors(errorMessage, props.errors.get(errorMessage) + 1);
      } else {
        updateErrors(errorMessage, 1);
      }
    });
};

const toggleBuyState = () => {
  if (buyInterval.value) {
    resetInterval();
  } else {
    buyInterval.value = setInterval(buyTicket, 1);
  }
};
</script>

<style scoped></style>
