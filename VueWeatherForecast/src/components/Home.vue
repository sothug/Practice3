<template>
    <WeatherTable/>
</template>

<script lang="ts">
    import { defineComponent } from 'vue';
    import WeatherTable from '../components/WeatherTable.vue';


    type Forecasts = {
        date: string
    }[];

    interface Data {
        loading: boolean,
        post: null | Forecasts
    }

    export default defineComponent({
        name: 'Home',
        components: {
            WeatherTable
        }
    });
</script>