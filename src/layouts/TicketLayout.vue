<template>
  <q-layout class="full-height bg-white shadow-1" container view="hHh LpR lFr">
    <router-view name="header" @toggle:drawer="toggleLeftDrawer" />
    <router-view
      v-model="leftDrawerOpen"
      name="drawer"
      @toggle:drawer="toggleLeftDrawer"
    />
    <q-page-container>
      <router-view />
    </q-page-container>
    <router-view name="footer" @toggle:drawer="toggleLeftDrawer" />
  </q-layout>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RouterView } from 'vue-router';

const leftDrawerOpen = ref(false);

const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style scoped></style>