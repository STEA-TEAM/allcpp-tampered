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
    <TicketBuyer
      :errors="errors"
      :ticket="selectedTicket?.id ?? 0"
      :count="ticketCount"
      :purchasers="selectedPurchasers.map((p) => p.id)"
      :validate="selectedTicket?.validate ?? false"
      @update:errors="errors.set($event[0], $event[1])"
      v-model="dynamicBuyDelay"
    />
    <q-separator />
    <div class="row items-center">
      <div class="column q-gutter-y-sm">
        <div class="text-h6 text-black">动态延迟配置</div>
        <div class="row q-gutter-x-md">
          <q-btn color="primary" label="默认配置" @click="preset('default')" />
          <q-btn color="primary" label="低负载" @click="preset('light')" />
          <q-btn color="primary" label="高负载" @click="preset('heavy')" />
        </div>
      </div>
      <q-space />
      <div class="text-body1">动态延迟：</div>
      <DelayIndicator v-model="dynamicBuyDelay" />
    </div>
    <div class="column items-center q-my-sm" style="min-height: 300px">
      <DelayChart />
    </div>
    <q-separator />
    <div class="text-h6 text-black">请求错误列表</div>
    <ErrorList :model-value="errors" />
  </q-page>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { reactive, Ref, ref } from 'vue';

import DelayChart from '@/components/DelayChart.vue';
import DelayIndicator from '@/components/DelayIndicator.vue';
import ErrorList from '@/components/ErrorList.vue';
import TicketBuyer from '@/components/TicketBuyer.vue';
import TicketCount from '@/components/TicketCount.vue';
import TicketList from '@/components/TicketList.vue';
import TicketPurchaser from '@/components/TicketPurchaser.vue';
import type { Purchaser, Ticket } from '@/components/models';
import { useTicketStore } from '@/stores/ticket';
import { getPurchaserList, getTicketList } from '@/utils/network';

const { notify } = useQuasar();
const { preset } = useTicketStore();

const tickets = reactive(new Array<Ticket>());
const selectedTicket: Ref<Ticket | undefined> = ref(undefined);
const ticketCount = ref(1);
const purchasers: Purchaser[] = reactive([]);
const selectedPurchasers: Ref<Purchaser[]> = ref([]);
const errors = reactive(new Map<string, number>());
const dynamicBuyDelay = ref(125);

getPurchaserList()
  .then((purchaserList) => purchasers.push(...purchaserList))
  .catch((error) =>
    notify({
      type: 'negative',
      message: error.message,
    })
  );

getTicketList(
  Object.fromEntries(
    location.hash
      .split('?')[1]
      .split('&')
      .map((pair) => pair.split('='))
  ).event
)
  .then((ticketList: Ticket[]) => tickets.push(...ticketList))
  .catch((error) =>
    notify({
      type: 'negative',
      message: error.message,
    })
  );
</script>

<style scoped></style>
