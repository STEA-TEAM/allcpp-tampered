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

const defaultDelayFunctions: DelayFunction[] = [
  {
    name: '默认（减少延迟）',
    borderColor: 'green',
    slope: 0.04,
    offset: -50,
  },
  {
    name: '系统繁忙，请稍后再试',
    borderColor: 'blue',
    slope: -0.05,
    offset: -150,
  },
  {
    name: '服务器压力过大，请您稍后再试。',
    borderColor: 'purple',
    slope: -0.065,
    offset: -130,
  },
  {
    name: '请求过于频繁！',
    borderColor: 'amber',
    slope: -0.1,
    offset: -150,
  },
  {
    name: '请求失败',
    borderColor: 'red',
    slope: -0.065,
    offset: -200,
  },
];

const lightDelayFunctions: DelayFunction[] = [
  {
    name: '默认（减少延迟）',
    borderColor: 'green',
    slope: 0.04,
    offset: -50,
  },
  {
    name: '系统繁忙，请稍后再试',
    borderColor: 'blue',
    slope: -0.05,
    offset: -150,
  },
  {
    name: '服务器压力过大，请您稍后再试。',
    borderColor: 'purple',
    slope: -0.065,
    offset: -130,
  },
  {
    name: '请求过于频繁！',
    borderColor: 'amber',
    slope: -0.1,
    offset: -150,
  },
  {
    name: '请求失败',
    borderColor: 'red',
    slope: -0.065,
    offset: -200,
  },
];

const heavyDelayFunctions: DelayFunction[] = [
  {
    name: '默认（减少延迟）',
    borderColor: 'green',
    slope: 0.04,
    offset: -50,
  },
  {
    name: '系统繁忙，请稍后再试',
    borderColor: 'blue',
    slope: -0.03,
    offset: -150,
  },
  {
    name: '服务器压力过大，请您稍后再试。',
    borderColor: 'purple',
    slope: -0.05,
    offset: -125,
  },
  {
    name: '请求过于频繁！',
    borderColor: 'amber',
    slope: -0.7,
    offset: -150,
  },
  {
    name: '请求失败',
    borderColor: 'red',
    slope: -0.75,
    offset: -200,
  },
];

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const delayFunctions: Ref<DelayFunction[]> = ref(defaultDelayFunctions);

    function getDelay(name: string, input: number): number {
      const delayFunction =
        delayFunctions.value.find((df) => df.name === name) ??
        delayFunctions.value[0];
      return delayFunction.slope * (input + delayFunction.offset);
    }

    function preset(type: 'default' | 'light' | 'heavy') {
      switch (type) {
        case 'default':
          delayFunctions.value = defaultDelayFunctions;
          break;
        case 'light':
          delayFunctions.value = lightDelayFunctions;
          break;
        case 'heavy':
          delayFunctions.value = heavyDelayFunctions;
          break;
      }
    }

    return { delayFunctions, getDelay, preset };
  },
  {
    persist: {
      storage: gm_storage,
    },
  }
);
