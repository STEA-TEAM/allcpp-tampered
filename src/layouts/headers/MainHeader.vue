<script setup lang="ts">
import { storeToRefs } from 'pinia';

import { useSettingsStore } from '@/stores/settings';

const { toggleDarkMode } = useSettingsStore();
const { darkMode, darkModeColor } = storeToRefs(useSettingsStore());
</script>

<template>
  <q-header bordered class="bg-primary text-white" height-hint="98">
    <q-toolbar>
      <q-btn dense flat icon="menu" round @click="$emit('click:leftMenu')" />
      <q-toolbar-title>
        <q-avatar>
          <img
            alt="quasar-logo"
            src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg"
          />
        </q-avatar>
        ALLCPP Tampered
      </q-toolbar-title>
      <q-btn
        :color="darkModeColor[0]"
        :icon="
          darkMode === 'auto'
            ? 'hdr_auto'
            : darkMode
            ? 'dark_mode'
            : 'light_mode'
        "
        :text-color="darkModeColor[1]"
        dense
        round
        unelevated
        @click="toggleDarkMode"
      />
    </q-toolbar>
    <q-tabs align="left">
      <q-route-tab label="主页" to="/home" />
      <q-route-tab label="活动" to="/event" />
      <q-route-tab label="发现" to="/discovery" />
    </q-tabs>
  </q-header>
</template>

<style scoped>

</style>