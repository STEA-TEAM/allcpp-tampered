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
    <ticket-list :options="tickets" v-model="selectedTicket" />
    <ticket-count :selected="selectedTicket" v-model="ticketCount" />
    <ticket-purchaser
      :options="purchasers"
      :selected="selectedTicket"
      v-model="selectedPurchasers"
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
            ? 'blue'
            : 'green'
        "
        :max="250"
        :min="50"
        size="xl"
        show-value
        track-color="grey-4"
        :value="dynamicBuyInterval * 5"
      >
        <div class="column items-center">
          <div
            class="text-center"
            :class="
              dynamicBuyInterval >= 40
                ? 'text-red'
                : dynamicBuyInterval >= 30
                ? 'text-amber'
                : dynamicBuyInterval >= 20
                ? 'text-blue'
                : 'text-green'
            "
          >
            {{ (dynamicBuyInterval * 5).toFixed(1) }}
          </div>
          <div class="text-grey text-center">ms</div>
        </div>
      </q-circular-progress>
    </div>
    <error-list v-model="errors" />
  </q-page>
</template>

<script setup>
import { useQuasar } from 'quasar';
import { reactive, ref } from 'vue';

import TicketList from '../components/TicketList.vue';
import TicketCount from '../components/TicketCount.vue';
import TicketPurchaser from '../components/TicketPurchaser.vue';

import { getPurchaserList, getTicketList } from '../utils';
import { buyTicketAlipay } from '../utils/buy';
import ErrorList from '../components/ErrorList.vue';

const { notify } = useQuasar();

const tickets = reactive([]);
const selectedTicket = ref(null);

const ticketCount = ref('1');

const purchasers = reactive([]);
const selectedPurchasers = ref([]);

const buyInterval = ref(null);
const dynamicBuyInterval = ref(25);
const errors = reactive({});

let dynamicBuyCounter = 0;

const toggleBuyState = () => {
  if (buyInterval.value) {
    clearInterval(buyInterval.value);
    buyInterval.value = null;
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
        selectedTicket.value.id,
        purchasers.map((purchaser) => purchaser['id'])
      )
        .then(() => {
          clearInterval(buyInterval.value);
          buyInterval.value = null;
        })
        .catch((err) => {
          let errorMessage = 'Unknown Error';
          if (typeof err === 'object') {
            if (err.message !== undefined) {
              if (err.message === '请求过于频繁！') {
                dynamicBuyInterval.value += (50 - dynamicBuyInterval.value) / 15;
              } else {
                dynamicBuyInterval.value -= (dynamicBuyInterval.value) / 30;
              }
              errorMessage = err.message;
            } else if (err.statusText !== undefined) {
              dynamicBuyInterval.value += (50 - dynamicBuyInterval.value) / 10;
              errorMessage = err.statusText;
            }
          } else if (
            typeof err === 'string' &&
            err.includes('由于访问人数太多导致服务器压力过大，请您稍后再试。')
          ) {
            dynamicBuyInterval.value += (50 - dynamicBuyInterval.value) / 20;
            errorMessage = '访问人数太多服务器压力过大！';
          }
          if (errors.hasOwnProperty(errorMessage)) {
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
