<script lang="ts" setup>
import { ref } from 'vue';

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
<template>
  <q-layout view="hHh Lpr lFf">
    <router-view name="header" @click:leftMenu="toggleLeftDrawer" />
    <router-view
      name="drawer"
      v-model="leftDrawerOpen"
      @click:leftMenu="toggleLeftDrawer"
    />
    <q-page-container>
      <router-view @click:leftMenu="toggleLeftDrawer" />
    </q-page-container>
    <router-view name="footer" @click:leftMenu="toggleLeftDrawer" />
  </q-layout>
</template>
