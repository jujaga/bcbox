import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/store/authStore';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
    },
    {
      path: '/myBuckets',
      name: 'myBuckets',
      component: () => import('../views/MyBucketsView.vue'),
      // meta: { requiresAuth: true }, Remove temporarily for parallel dev
    },
    {
      path: '/myObjects',
      name: 'myObjects',
      component: () => import('../views/MyObjectsView.vue'),
      // meta: { requiresAuth: true }, Remove temporarily for parallel dev
    },
    {
      path: '/addBucket',
      name: 'addBucket',
      component: () => import('../views/AddBucketView.vue'),
      // meta: { requiresAuth: true }, Remove temporarily for parallel dev
    },
    {
      path: '/developer',
      name: 'developer',
      component: () => import('../views/DeveloperView.vue'),
      // meta: { requiresAuth: true }, Remove temporarily for parallel dev
    },
    {
      path: '/logout',
      name: 'logout',
      redirect: (to) => {
        return { path: '/' };
      },
    },
  ],
});

router.beforeEach((to, from) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return {
      path: '/',
      // save the location we were at to come back later
      query: { redirect: to.fullPath },
    };
  }
});

export default router;
