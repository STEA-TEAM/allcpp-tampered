export const routes = [
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      {path: '', redirect: '/event'},
      {
        name: 'event',
        path: 'event',
        components: {
          header: () => import('@/layouts/headers/MainHeader.vue'),
        },
      },
    ],
  },
];
