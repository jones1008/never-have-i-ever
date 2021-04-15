import { createWebHistory, createRouter } from "vue-router";
import Home from "./views/Home.vue";
import AddQuestion from "./views/AddQuestion.vue";
import ReportQuestion from "./views/ReportQuestion.vue";
import EditQuestion from "./views/EditQuestion.vue";

const routes = [
    {
        path: "/",
        name: "home",
        component: Home,
        children: [
            {
                path: "add-question",
                name: "add-question",
                component: AddQuestion
            },
            {
                path: "report-question",
                name: "report-question",
                component: ReportQuestion
            },
            {
                path: "edit-question",
                name: "edit-question",
                component: EditQuestion
            }
        ]
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;