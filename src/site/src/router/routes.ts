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
        path: '/:file',
        component: IndexPage,
        children: [
            {
                path: '/',
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
        path: '/library/:language',
        name: 'library',
        component: MainLayout,
        children: [
            {
                path: ':dir1/:filename',
                component: IndexPage,
            },
            {
                path: ':dir1/:dir2/:filename',
                component: IndexPage,
            },
            {
                path: ':dir1/:dir2/:dir3/:filename',
                component: IndexPage,
            },
            {
                path: ':dir1/:dir2/:dir3/:dir4/:filename',
                component: IndexPage,
            },
            {
                path: ':dir1/:dir2/:dir3/:dir4/:dir5/:filename',
                component: IndexPage,
            }
        ]
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue')
    }
]
