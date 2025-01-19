import MainLayout from 'layouts/MainLayout.vue';
import IndexPage from 'pages/IndexPage.vue';

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
        path: '/document/:param',
        component: MainLayout,
        children: [
            {
                path: '',
                component: IndexPage
            }
        ]
    },
    {
        path: '/library/:param',
        name: 'library',
        component: MainLayout,
        children: [
            {
                path: '',
                component: IndexPage
            }
        ]
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]
