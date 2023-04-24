<template>
  <q-page class="flex column q-gutter-y-md q-pa-md">
    <div class="text-h5 text-black">选择票种</div>
    <TicketList
      :need-validate="validatePurchaser"
      v-model="selectedTicketId"
      @update:need-validate="validatePurchaser = $event"
    />
    <q-input
      v-if="!validatePurchaser"
      :disable="selectedTicketId < 0"
      label="购票数量"
      outlined
      mask="###"
      :model-value="ticketCount"
      @update:modelValue="updateTicketCount"
    >
      <template v-slot:prepend>
        <q-btn
          icon="remove"
          flat
          round
          @click="updateTicketCount(ticketCount - 1)"
        />
      </template>
      <template v-slot:append>
        <q-btn
          icon="add"
          flat
          round
          @click="updateTicketCount(ticketCount + 1)"
        />
      </template>
    </q-input>
    <q-select
      v-if="validatePurchaser"
      :disable="selectedTicketId < 0"
      label="选择购票人"
      multiple
      :options="options"
      outlined
      stack-label
      use-chips
      v-model="purchasers"
    />
  </q-page>
</template>

<script setup>
import { ref } from 'vue';

import TicketList from '../components/TicketList.vue';

const selectedTicketId = ref(-1);
const validatePurchaser = ref(false);

const options = ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'];

const ticketCount = ref('1');
const purchasers = ref([]);

const updateTicketCount = (value) => {
  if (value === '') {
    ticketCount.value = '1';
  } else if (value > 0 && value < 1000) {
    ticketCount.value = value;
  }
};
</script>

<style scoped></style>
