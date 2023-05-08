import { defineStore } from 'pinia';
import { AddressbarColor, colors, Dark } from 'quasar';

import { gm_storage } from '@/utils/storage';

const { getPaletteColor } = colors;
const darkModes = [false, 'auto', true] as const;
export const useSettingsStore = defineStore('settings', {
  state: () => ({
    darkMode: Dark.mode as 'auto' | boolean,
  }),

  getters: {
    darkModeColor() {
      switch (this.darkMode) {
        case false:
          return ['white', 'red'];
        case 'auto':
          return ['accent', 'white'];
        default:
          return ['black', 'yellow'];
      }
    },
  },

  actions: {
    applyDarkMode() {
      Dark.set(this.darkMode);
      AddressbarColor.set(
        Dark.isActive ? getPaletteColor('grey-10') : getPaletteColor('grey-2')
      );
    },
    toggleDarkMode() {
      const index = darkModes.indexOf(this.darkMode);
      this.darkMode = darkModes[(index + 1) % darkModes.length];
      this.applyDarkMode();
    },
  },
  persist: {
    storage: gm_storage,
  },
});
