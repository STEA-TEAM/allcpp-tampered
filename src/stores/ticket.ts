import { defineStore } from 'pinia';
import type { Ref } from 'vue';
import { ref } from 'vue';

import { gm_storage } from '@/utils/storage';

export interface DelayFunction {
  name: string;
  enable: boolean;
  borderColor: string;
  slope: number;
  offset: number;
}

const defaultDelayFunctions: DelayFunction[] = [
  {
    name: '默认（减少延迟）',
    enable: true,
    borderColor: 'green',
    slope: 0.02,
    offset: 5,
  },
  {
    name: '系统繁忙，请稍后再试',
    enable: true,
    borderColor: 'blue',
    slope: -0.04,
    offset: -150,
  },
  {
    name: '服务器压力过大，请您稍后再试。',
    enable: false,
    borderColor: 'purple',
    slope: 0,
    offset: 0,
  },
  {
    name: '请求过于频繁！',
    enable: true,
    borderColor: 'amber',
    slope: -0.04,
    offset: -250,
  },
  {
    name: '请求失败',
    enable: true,
    borderColor: 'red',
    slope: -0.062,
    offset: -290,
  },
];

const lightDelayFunctions: DelayFunction[] = [
  {
    name: '默认（减少延迟）',
    enable: true,
    borderColor: 'green',
    slope: 0.02,
    offset: 5,
  },
  {
    name: '系统繁忙，请稍后再试',
    enable: true,
    borderColor: 'blue',
    slope: -0.04,
    offset: -150,
  },
  {
    name: '服务器压力过大，请您稍后再试。',
    enable: true,
    borderColor: 'purple',
    slope: -0.04,
    offset: -100,
  },
  {
    name: '请求过于频繁！',
    enable: true,
    borderColor: 'amber',
    slope: -0.04,
    offset: -250,
  },
  {
    name: '请求失败',
    enable: true,
    borderColor: 'red',
    slope: -0.062,
    offset: -290,
  },
];

const heavyDelayFunctions: DelayFunction[] = [
  {
    name: '默认（减少延迟）',
    enable: true,
    borderColor: 'green',
    slope: 0.02,
    offset: 5,
  },
  {
    name: '系统繁忙，请稍后再试',
    enable: false,
    borderColor: 'blue',
    slope: 0,
    offset: 0,
  },
  {
    name: '服务器压力过大，请您稍后再试。',
    enable: false,
    borderColor: 'purple',
    slope: 0,
    offset: 0,
  },
  {
    name: '请求过于频繁！',
    enable: true,
    borderColor: 'amber',
    slope: -0.04,
    offset: -250,
  },
  {
    name: '请求失败',
    enable: true,
    borderColor: 'red',
    slope: -0.062,
    offset: -290,
  },
];

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const delayFunctions: Ref<DelayFunction[]> = ref(defaultDelayFunctions);

    function getDelay(name: string, input: number): number {
      const delayFunction = delayFunctions.value.find(
        (df) => df.enable && df.name === name
      );
      if (delayFunction) {
        const delay = delayFunction.slope * (input + delayFunction.offset);
        return delay > 0 ? delay : 0;
      }
      const delay =
        delayFunctions.value[0].slope *
        (input + delayFunctions.value[0].offset);
      return -(delay > 0.1 ? delay : 0.1);
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
