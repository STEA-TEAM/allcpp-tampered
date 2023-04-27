import { addElement, getElement } from '@/utils/dom';

export const routes = [
  {
    name: 'ticket',
    path: '/ticket',
    component: () => import('@/layouts/TicketLayout.vue'),
    children: [
      {
        name: 'detail',
        path: 'detail',
        components: {
          default: () => import('@/pages/DetailPage.vue'),
          drawer: () => import('@/layouts/drawers/DetailDrawer.vue'),
          header: () => import('@/layouts/headers/DetailHeader.vue'),
        },
        prepare: async (injectId: string) => {
          await getElement('.sc-idXgbr');
          const injectReference = await getElement('.margin-top-nav');
          const injectContainer = injectReference.parentElement;
          if (!injectContainer) {
            return false;
          }
          injectReference.remove();
          injectContainer.style.gap = '20px';
          injectContainer.style.width = 'auto';
          addElement(
            'div',
            undefined,
            {
              id: injectId,
              className: 'margin-top-nav',
              style: [
                'min-height: 1024px',
                'height: auto',
                'width: 500px',
              ].join('; '),
            },
            injectContainer,
            injectContainer.firstChild as HTMLElement
          );
          return true;
        },
      },
    ],
  },
];
