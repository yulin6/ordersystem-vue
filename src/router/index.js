import { createWebHistory, createRouter } from "vue-router";
import SignIn from "@/views/SignIn.vue";
import CustomerHome from "@/views/CustomerHome.vue";
import OwnerHome from "@/views/OwnerHome.vue";
import Canteen from "@/views/Canteen.vue";
import ManageCanteen from "@/views/ManageCanteen.vue";
import SignUp from "@/views/SignUp";
import OrderHistory from "@/views/OrderHistory";

const routes = [
    {
        path: "/signIn",
        name: "signIn",
        component: SignIn,
    },
    {
        path: "/signUp",
        name: "signUp",
        component: SignUp,
    },
    {
        path: "/customerHome",
        name: "customerHome",
        component: CustomerHome,
        props: true
    },
    {
        path: "/ownerHome",
        name: "ownerHome",
        component: OwnerHome,
        props: true
    },
    {
        path: "/orderHistory",
        name: "orderHistory",
        component: OrderHistory,
        props: true
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
    let toPath = to.path.toLowerCase()
    if (toPath === '/signin' || toPath === '/signup') {
        next(); //TODO navigate logged-in users to home instead of login page
    } else {
        let token = localStorage.getItem('userToken');

        if (token === null || token === '') {
            // this.$message.error("Username or password is invalid");
            next('/signin');
        } else {
            next();
        }
    }
});

export default router;