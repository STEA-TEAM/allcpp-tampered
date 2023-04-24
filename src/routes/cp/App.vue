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

    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};

</script>

<style scoped></style>
