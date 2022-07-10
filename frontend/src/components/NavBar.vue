<script setup lang="ts">
    import { RouterLink } from "vue-router";
</script>

<template>
    <navbar>
        <ul class="menu-main">
            <li><RouterLink class="router-link" :to="'/'">Главная страница</RouterLink></li>
            <li><RouterLink class="router-link" :to="'/Weatherforecasts'">Все прогнозы погоды</RouterLink></li>
            <li><RouterLink class="router-link" :to="'/Weatherforecast'">Прогноз погоды</RouterLink></li>
        </ul>
    </navbar>
</template>

<style>
</style>