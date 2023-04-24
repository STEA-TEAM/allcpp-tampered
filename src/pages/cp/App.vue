<template>
  <q-card class="full-height full-width" bordered flat>
    <q-card-section>
      <TicketList/>
    </q-card-section>
  </q-card>
</template>

<script setup>
import { ref } from 'vue';

import TicketList from "./components/TicketList.vue";

const leftDrawerOpen = ref(false);
const rightDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

const toggleRightDrawer = () => {
  rightDrawerOpen.value = !rightDrawerOpen.value;
};
</script>

<style scoped></style>
