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

export default router;