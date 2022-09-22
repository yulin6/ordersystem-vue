import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import CustomerHome from "@/views/CustomerHome.vue";
import OwnerHome from "@/views/OwnerHome.vue";
import Canteen from "@/views/Canteen.vue";
import ManageCanteen from "@/views/ManageCanteen.vue";

const routes = [
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/customerHome",
        name: "customerHome",
        component: CustomerHome,
    },
    {
        path: "/ownerHome",
        name: "ownerHome",
        component: OwnerHome,
    },
    {
        path: "/canteen/:id",
        name: "canteen",
        component: Canteen,
        props: true
    },
    {
        path: "/manage-canteen/:id",
        name: "manage-canteen",
        component: ManageCanteen,
        props: true
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    if (to.path === '/login') {
        next(); //TODO navigate logged-in users to home instead of login page
    } else {
        let token = localStorage.getItem('userToken');

        if (token === null || token === '') {
            // this.$message.error("Username or password is invalid");
            next('/login');
        } else {
            next();
        }
    }
});

export default router;