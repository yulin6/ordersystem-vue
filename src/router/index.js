import { createWebHistory, createRouter } from "vue-router";
import Login from "@/views/Login.vue";
import CustomerHome from "@/views/CustomerHome.vue";
import OwnerHome from "@/views/OwnerHome.vue";
import helloWorld from "@/components/HelloWorld.vue";

const routes = [
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/CustomerHome",
        name: "CustomerHome",
        component: CustomerHome,
    },
    {
        path: "/OwnerHome",
        name: "OwnerHome",
        component: OwnerHome,
    },
    {
        path: "/helloWorld",
        name: "HelloWorld",
        component: helloWorld,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;