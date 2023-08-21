import MainLayout from 'layouts/MainLayout.vue';
import IndexPage from 'pages/IndexPage.vue';
import LoginPage from 'pages/LoginPage.vue';
import RegisterPage from 'pages/RegisterPage.vue';

export default [
    {
        path: '/',
        component: MainLayout,
        children: [
            {
                path: '',
                component: IndexPage
            }
        ]
    },
    {
        path: '/session/:session',
        component: MainLayout,
        children: [
            {
                path: '',
                component: IndexPage
            }
        ]
    },
    {
        path: '/login',
        component: LoginPage
    },
    {
        path: '/register',
        component: RegisterPage
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]
