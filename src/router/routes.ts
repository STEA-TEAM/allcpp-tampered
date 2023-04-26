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
          const injectContainer = (await getElement('.margin-top-nav'))
            .parentElement!;
          injectContainer.style.gap = '20px';
          injectContainer.style.width = 'auto';
          addElement(
            'div',
            undefined,
            {
              id: injectId,
              className: 'margin-top-nav',
              style: [`height: calc(100vh - 385px)`, 'width: 300px'].join('; '),
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
