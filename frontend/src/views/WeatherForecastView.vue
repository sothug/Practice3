<script setup lang="ts">
    import type { WeatherForecast } from '@/services/WeatherForecast';
    import weatherForecastService from '@/services/WeatherForecast';
    import { ref } from 'vue';
    import { useRoute, useRouter } from 'vue-router';

    const errorMsg = ref(null as string | null);
    const wcast = ref(null as WeatherForecast | null);
    const route = useRoute();
    const wcastIdStr = ref("");

    if (typeof route.params.id == "string") {
        wcastIdStr.value = route.params.id;
    }
    else if (Array.isArray(route.params.id) && route.params.id.length > 0) {
        wcastIdStr.value = route.params.id[0];
    }
    const router = useRouter();

    async function fetchData() {
        const id = Number.parseInt(wcastIdStr.value);
        if (Number.isNaN(id)) {
            errorMsg.value = "Id дожен быть целым числом";
            return;
        }
        router.push({ name: "weatherforecastByIdWithParam", params: { id } });
        const result = await weatherForecastService.getById(id);
        if (result == null) {
            errorMsg.value = "Не найдено";
        }
        else if (result instanceof Error) {
            errorMsg.value = `Ошибка: ${result.message}`;
        }
        else {
            errorMsg.value = "";
            wcast.value = result;
        }
    }
    function onInputIdChange(ev: Event) {
        // basically triggers only when user presses enter
        if (document.activeElement == ev.target) {
            onFindBtnClicked(new MouseEvent("click"));
        }
    }
    function onFindBtnClicked(ev: MouseEvent) {
        fetchData();
    }
    if (wcastIdStr.value != "") {
        fetchData();
    }
</script>

<template>
    <div class="root">
        <label class="form-label">
            Id прогноза:
            <input type="number" class="form-control" v-model="wcastIdStr" @change="onInputIdChange">
        </label>
        <button class="btn btn-primary" @click="onFindBtnClicked">Найти</button>
        <div v-if="errorMsg" class="alert alert-danger" role="alert">{{errorMsg}}</div>
        <div v-if="!errorMsg && wcast != null">
            <div>
                <label class="form-label">
                    Дата
                    <input type="text" readonly class="form-control" :value="wcast?.date" />
                </label>
            </div>
            <div>
                <label class="form-label">
                    Температура в градусац Цельсия
                    <input type="text" readonly class="form-control" :value="wcast?.temperatureC" />
                </label>
            </div>
            <div>
                <label class="form-label">
                    Температура в градусах Фаренгейта
                    <input type="text" readonly class="form-control" :value="wcast?.temperatureF" />
                </label>
            </div>
            <div>
                <label class="form-label">
                    Сводка
                    <input type="text" readonly class="form-control" :value="wcast?.summary" />
                </label>
            </div>
        </div>
    </div>
</template>

<style>
    .root {
        padding: 10px 10px;
    }

    div {
        flex: 1 1;
    }

    .form-label {
        font-size: 20px;
    }
    /* color palette from <https://github.com/vuejs/theme> */
    :root {
        --vt-c-white: #ffffff;
        --vt-c-white-soft: #f8f8f8;
        --vt-c-white-mute: #f2f2f2;
        --vt-c-black: #181818;
        --vt-c-black-soft: #222222;
        --vt-c-black-mute: #282828;
        --vt-c-indigo: #2c3e50;
        --vt-c-divider-light-1: rgba(60, 60, 60, 0.29);
        --vt-c-divider-light-2: rgba(60, 60, 60, 0.12);
        --vt-c-divider-dark-1: rgba(84, 84, 84, 0.65);
        --vt-c-divider-dark-2: rgba(84, 84, 84, 0.48);
        --vt-c-text-light-1: var(--vt-c-indigo);
        --vt-c-text-light-2: rgba(60, 60, 60, 0.66);
        --vt-c-text-dark-1: var(--vt-c-white);
        --vt-c-text-dark-2: rgba(235, 235, 235, 0.64);
    }

    /* semantic color variables for this project */
    :root {
        --color-background: var(--vt-c-white);
        --color-background-soft: var(--vt-c-white-soft);
        --color-background-mute: var(--vt-c-white-mute);
        --color-border: var(--vt-c-divider-light-2);
        --color-border-hover: var(--vt-c-divider-light-1);
        --color-heading: var(--vt-c-text-light-1);
        --color-text: var(--vt-c-text-light-1);
        --main-color: rgb(74, 236, 115);
        --second-color: var(--vt-c-white);
        --grayed-out: gray;
        --section-gap: 160px;
    }

    @media (prefers-color-scheme: dark) {
        :root {
            --color-background: var(--vt-c-black);
            --color-background-soft: var(--vt-c-black-soft);
            --color-background-mute: var(--vt-c-black-mute);
            --color-border: var(--vt-c-divider-dark-2);
            --color-border-hover: var(--vt-c-divider-dark-1);
            --color-heading: var(--vt-c-text-dark-1);
            --color-text: var(--vt-c-text-dark-2);
        }
    }

    *,
    *::before,
    *::after {
        box-sizing: border-box;
        margin: 0;
        position: relative;
        font-weight: normal;
    }

    body {
        min-height: 100vh;
        color: var(--color-text);
        background: #f2f3f4;
        transition: color 0.5s, background-color 0.5s;
        line-height: 1.6;
        font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
        font-size: 15px;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    h1 {
        font-size: 35px;
    }

    p {
        font-size: 20px;
    }
</style>