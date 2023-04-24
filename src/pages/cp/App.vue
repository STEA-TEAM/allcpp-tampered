<template>
  <q-layout class="full-height bg-white shadow-1" container view="hHh LpR lFr">
    <q-header class="bg-primary text-white" bordered>
      <q-toolbar>
        <q-btn flat round dense icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> ALLCPP Evolved</q-toolbar-title>
        <q-btn flat round dense icon="more_vert" />
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      behavior="desktop"
      bordered
      overlay
      side="left"
      :width="300"
    >
      <!-- drawer content -->
    </q-drawer>
    <q-page-container>
      <q-page class="flex column q-gutter-y-md q-pa-md">
        <div class="text-h5 text-black">选择票种</div>
        <TicketList
          :need-validate="validatePurchaser"
          v-model="selectedTicketId"
          @update:need-validate="validatePurchaser = $event"
        />
        <q-input
          label="购票数量"
          outlined
          mask="###"
          min="1"
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
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

import TicketList from './components/TicketList.vue';

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const selectedTicketId = ref(-1);
const validatePurchaser = ref(false);
const ticketCount = ref('1');

const updateTicketCount = (value) => {
  if (value === '') {
    ticketCount.value = '1';
  } else if (value > 0 && value < 1000) {
    ticketCount.value = value;
  }
};
</script>

<style scoped></style>
