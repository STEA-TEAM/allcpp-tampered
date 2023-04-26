import { routes } from '@/router/routes';

export const prepareTargetElement = async (injectId: string) => {
  const hashComponents = location.hash.replace('#', '').split('?');
  const pathComponents = hashComponents[0].split('/');
  switch (location.hostname) {
    case 'cp.allcpp.cn': {
      return (
        (await routes
          .find((route) => route.name === pathComponents[1])
          ?.children.find((route) => route.name === pathComponents[2])
          ?.prepare(injectId)) ?? false
      );
    }
    default:
      return false;
  }
};
