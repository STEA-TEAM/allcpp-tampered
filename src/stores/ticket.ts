import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { ref } from 'vue';

import { gm_storage } from '@/utils/storage';

export interface DelayFunction {
  name: string;
  borderColor: string;
  slope: number;
  offset: number;
}

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const delayFunctions: Ref<DelayFunction[]> = ref([
      {
        name: '默认',
        borderColor: 'green',
        slope: 0.04,
        offset: -10,
      },
      {
        name: '系统繁忙，请稍后再试',
        borderColor: 'blue',
        slope: -0.05,
        offset: -30,
      },
      {
        name: '服务器压力过大，请您稍后再试。',
        borderColor: 'purple',
        slope: -0.075,
        offset: -30,
      },
      {
        name: '请求过于频繁！',
        borderColor: 'amber',
        slope: -0.1,
        offset: -30,
      },
      {
        name: '请求失败',
        borderColor: 'red',
        slope: -0.075,
        offset: -40,
      },
    ]);

    function getDelay(name: string, input: number): number {
      const delayFunction = delayFunctions.value.find((df) => df.name === name);
      if (delayFunction) {
        return delayFunction.slope * (input + delayFunction.offset);
      } else {
        const newDelayFunction = {
          name,
          borderColor: 'grey',
          slope: 0,
          offset: 0,
        };
        delayFunctions.value.push(newDelayFunction);
        return newDelayFunction.slope * (input + newDelayFunction.offset);
      }
    }

    return { delayFunctions, getDelay };
  },
  {
    persist: {
      storage: gm_storage,
    },
  }
);
