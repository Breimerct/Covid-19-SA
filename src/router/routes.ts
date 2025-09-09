import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      name: 'covidHome'
    },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'covid-19',
        name: 'covidHome',
        component: () => import('pages/CovidHome.vue')
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    redirect: {
      name: 'covidHome'
    }
  }
]

export default routes
