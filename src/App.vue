<template>
  <router-view />
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router';
import { useSettingsStore } from '@/stores/settings';

const { applyDarkMode } = useSettingsStore();
applyDarkMode();
</script>

<style lang="scss" scoped></style>
