import { getElement, getElementAll } from '@/utils/dom';

export const prepare = async () => {
  switch (location.hostname) {
    case 'www.allcpp.cn': {
      const headElements = await getElementAll(
        'head > link:not([rel="shortcut icon"]), head > script'
      );
      const body = await getElement('body');
      if (headElements.length === 0 || !body) {
        return false;
      }
      headElements.forEach((element) => element.remove());
      body.innerHTML = '<div id="__allcpp_tampered__" data-v-app/>';
      return true;
    }
    case 'cp.allcpp.cn': {
      return false;
    }
    default: {
      return false;
    }
  }
};
