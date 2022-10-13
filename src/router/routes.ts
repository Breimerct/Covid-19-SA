import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
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
    path: '*',
    redirect: {
      name: 'covidHome'
    }
  }
]

export default routes
