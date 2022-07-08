import { createRouter, createWebHistory } from 'vue-router';
import Home from "../components/Home.vue";

const router = createRouter({
    history: createWebHistory(/*import.meta.env.BASE_URL*/),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/weatherForecasts",
            name: "weatherForecasts",
            component: () => import("../components/WeatherTable.vue")
        },
        {
            path: "/weatherForecast/:id",
            name: "weatherForecastInfo",
            component: () => import("../components/WeatherInfo.vue")
        },
        {
            path: "/weatherForecast",
            name: "weatherForecast",
            component: () => import("../components/WeatherInfo.vue")
        },
    ]
});

export default router;