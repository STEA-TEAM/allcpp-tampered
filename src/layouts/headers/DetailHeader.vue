<template>
  <q-header bordered class="bg-primary text-white">
    <q-toolbar>
      <q-btn dense flat icon="menu" round @click="openDrawer" />
      <q-toolbar-title> ALLCPP Tampered</q-toolbar-title>
      <q-btn dense flat icon="more_vert" round />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
const emit = defineEmits(['toggle:drawer']);
const openDrawer = () => {
  emit('toggle:drawer', true);
};
</script>

<style scoped></style>
