import { createWebHistory, createRouter } from "vue-router";
import SignIn from "@/views/SignIn.vue";
import HomePage from "@/views/HomePage.vue";
import Canteen from "@/views/Canteen.vue";
import ManageCanteen from "@/views/ManageCanteen.vue";
import SignUp from "@/views/SignUp";
import OrderHistory from "@/views/OrderHistory";
import WelcomePage from "@/views/WelcomePage";

const routes = [
    {
        path: "/",
        name: "welcomePage",
        component: WelcomePage,
    },
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
        path: "/home",
        name: "home",
        component: HomePage,
    },
    {
        path: "/orderHistory",
        name: "orderHistory",
        component: OrderHistory,
    },
    {
        path: "/canteen/:id",
        name: "canteen",
        component: Canteen,
    },
    {
        path: "/manage-canteen/:id",
        name: "manage-canteen",
        component: ManageCanteen,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
    let toPath = to.path.toLowerCase()
    if (toPath === '/signin' || toPath === '/signup' || toPath === '/') {
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