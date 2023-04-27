<template>
  <q-page class="flex column q-gutter-y-md q-pa-md">
    <div class="text-h5 text-black">选择票种</div>
    <div v-if="tickets.length === 0" class="column q-gutter-y-md">
      <div class="text-center text-h5 text-grey">暂无票种数据</div>
      <div class="row justify-center">
        <div class="text-h6 text-grey">加载中……</div>
        <q-spinner color="grey" size="24px" />
      </div>
    </div>
    <TicketList v-model="selectedTicket" :options="tickets" />
    <TicketCount v-model="ticketCount" :selected="selectedTicket" />
    <TicketPurchaser
      v-model="selectedPurchasers"
      :options="purchasers"
      :selected="selectedTicket"
    />
    <q-btn
      :color="buyInterval ? 'negative' : 'primary'"
      :disable="
        !selectedTicket ||
        (selectedTicket.validate && selectedPurchasers.length === 0)
      "
      :label="buyInterval ? '停止抢票' : '开始抢票'"
      size="xl"
      @click="toggleBuyState"
    />
    <q-separator />
    <div class="row items-center">
      <div class="text-h6 text-black">请求错误列表</div>
      <q-space />
      <div>动态延迟：</div>
      <q-circular-progress
        :color="
          dynamicBuyInterval >= 40
            ? 'red'
            : dynamicBuyInterval >= 30
            ? 'amber'
            : dynamicBuyInterval >= 20
            ? 'light-green'
            : 'green'
        "
        :max="250"
        :min="50"
        :value="dynamicBuyInterval * 5"
        show-value
        size="xl"
        track-color="grey-4"
      >
        <div class="column items-center">
          <div
            :class="
              dynamicBuyInterval >= 40
                ? 'text-red'
                : dynamicBuyInterval >= 30
                ? 'text-amber'
                : dynamicBuyInterval >= 20
                ? 'text-light-green'
                : 'text-green'
            "
            class="text-center"
          >
            {{ (dynamicBuyInterval * 5).toFixed(1) }}
          </div>
          <div class="text-grey text-center">ms</div>
        </div>
      </q-circular-progress>
    </div>
    <ErrorList :model-value="errors" />
  </q-page>
</template>

<script lang="ts" setup>
import { reactive, Ref, ref } from 'vue';

import ErrorList from '@/components/ErrorList.vue';
import TicketList from '@/components/TicketList.vue';
import TicketCount from '@/components/TicketCount.vue';
import TicketPurchaser from '@/components/TicketPurchaser.vue';
import type { Purchaser, Ticket } from '@/components/models';

import { useSettingsStore } from '@/stores/ticket';
import {
  buyTicketAlipay,
  getPurchaserList,
  getTicketList,
} from '@/utils/network';
import { getErrorMessage } from '@/utils/message';

const { getDelay } = useSettingsStore();
console.log(getDelay('默认', 25));

const tickets = reactive([]);
const selectedTicket: Ref<Ticket | undefined> = ref(undefined);

const ticketCount = ref(1);

const purchasers: Purchaser[] = reactive([]);
const selectedPurchasers: Ref<Purchaser[]> = ref([]);

const buyInterval = ref(0);
const dynamicBuyInterval = ref(25);
const errors = reactive({});

let dynamicBuyCounter = 0;

const resetInterval = () => {
  clearInterval(buyInterval.value);
  buyInterval.value = 0;
  dynamicBuyCounter = 0;
  dynamicBuyInterval.value = 25;
};

const toggleBuyState = () => {
  if (buyInterval.value) {
    resetInterval();
  } else {
    buyInterval.value = setInterval(async () => {
      if (dynamicBuyInterval.value > 50) {
        dynamicBuyInterval.value = 50;
      }
      if (dynamicBuyCounter < dynamicBuyInterval.value) {
        dynamicBuyCounter++;
        return;
      } else {
        dynamicBuyCounter = 0;
      }
      buyTicketAlipay(
        <number>selectedTicket.value?.id,
        purchasers.map((purchaser) => purchaser.id)
      )
        .then(() => resetInterval())
        .catch((err) => {
          const errorMessage = getErrorMessage(err);
          let delay = (dynamicBuyInterval.value - 10) / 25;
          switch (errorMessage) {
            case '系统繁忙，请稍后再试':
              delay = (30 - dynamicBuyInterval.value) / 20;
              if (delay > 0) {
                dynamicBuyInterval.value += delay;
              }
              break;
            case '服务器压力过大，请您稍后再试。':
              delay = (25 - dynamicBuyInterval.value) / 15;
              if (delay > 0) {
                dynamicBuyInterval.value += delay;
              }
              break;
            case '请求过于频繁！':
              delay = (30 - dynamicBuyInterval.value) / 10;
              if (delay > 0) {
                dynamicBuyInterval.value += delay;
              }
              break;
            case '请求失败':
              delay = (40 - dynamicBuyInterval.value) / 15;
              if (delay > 0) {
                dynamicBuyInterval.value += delay;
              }
              break;
            default:
              dynamicBuyInterval.value -= delay > 0.1 ? delay : 0.1;
              break;
          }
          if (errors[errorMessage]) {
            errors[errorMessage] += 1;
          } else {
            errors[errorMessage] = 1;
          }
        });
    }, 5);
  }
};

getPurchaserList()
  .then((purchaserList) => purchasers.push(...purchaserList))
  .catch((error) => console.log(error));

getTicketList(
  Object.fromEntries(
    location.hash
      .split('?')[1]
      .split('&')
      .map((pair) => pair.split('='))
  ).event
)
  .then((ticketList) => tickets.push(...ticketList))
  .catch((error) => console.log(error));
</script>

<style scoped></style>
