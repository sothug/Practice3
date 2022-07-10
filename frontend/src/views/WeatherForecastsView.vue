<script setup lang="ts">
    import type { WeatherForecast }  from '@/services/WeatherForecast';
    import weatherForecastService from '@/services/WeatherForecast';
    import { ref, watchEffect } from 'vue';

    const weatherForecasts = ref([] as WeatherForecast[]);
    watchEffect(async () => {
        weatherForecasts.value = await weatherForecastService.getAll();
    });
</script>

<template>
    <div class="root">
        <div class="container-fluid">
            <table>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Temp. (C)</th>
                        <th>Temp. (F)</th>
                        <th>Summary</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="forecast in weatherForecasts">
                        <td>{{ forecast.date }}</td>
                        <td>{{ forecast.temperatureC }}</td>
                        <td>{{ forecast.temperatureF }}</td>
                        <td>{{ forecast.summary }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style>
    .root {
        flex: 1 1;
    }
</style>