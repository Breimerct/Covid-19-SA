import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        redirect: { name: 'covidHome' }
      },
      {
        path: '/covid-19',
        name: 'covidHome',
        component: () => import('pages/CovidHome.vue'),
        meta: {
          title: 'COVID-19 South America'
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
