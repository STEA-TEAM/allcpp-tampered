import { reactive } from 'vue';
import { defineStore } from 'pinia';
import { gm_storage } from '@/utils/storage';

interface DelayFunctions {
  default: {
    slope: number;
    intercept: number;
  };
  systemBusy: {
    slope: number;
    intercept: number;
  };
  stressedOut: {
    slope: number;
    intercept: number;
  };
  tooFrequent: {
    slope: number;
    intercept: number;
  };
  requestFailed: {
    slope: number;
    intercept: number;
  };
}

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const delayFunctions = reactive<DelayFunctions>({
      default: {
        slope: 1 / 25,
        intercept: 10,
      },
      systemBusy: {
        slope: 1 / 20,
        intercept: 30,
      },
      stressedOut: {
        slope: 1 / 15,
        intercept: 25,
      },
      tooFrequent: {
        slope: 1 / 10,
        intercept: 30,
      },
      requestFailed: {
        slope: 1 / 15,
        intercept: 45,
      },
    });

    function getDelay(name: keyof DelayFunctions, value: number): number {
      const { slope, intercept } = delayFunctions[name];
      return slope * (value - intercept);
    }

    return { delayFunctions, getDelay };
  },
  {
    persist: {
      storage: gm_storage,
    },
  }
);
