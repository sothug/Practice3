<script setup lang="ts">
    import { useRoute } from 'vue-router';
    import NavBar from '@/components/NavBar.vue';

    const route = useRoute();
</script>

<template>
    <header>
        <NavBar></NavBar>
    </header>
    <RouterView v-slot="{ Component }">
        <Transition :name="routeAnimName">
            <component :is="Component" />
        </Transition>
    </RouterView>
</template>

<style>
    #app {
        display: flex;
        flex-direction: column;
    }
    #app {
      font-family: Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
      margin-top: 60px;
    }

    a.router-link {
        margin: 10px 10px 50px 10px
    }
    .menu-main {
        list-style: none;
        padding: 0 30px;
        margin: 0;
        font-size: 18px;
        text-align: center;
        position: relative;
        background: #47ffee;
    }

    .menu-main:after {
        content: "";
        position: absolute;
        width: 100%;
        height: 20px;
        left: 0;
        bottom: -20px;
        background-size: 20px 20px;
        background-repeat: repeat-x;
    }

    .menu-main li {
        display: inline-block;
    }

    .menu-main a {
        text-decoration: none;
        display: inline-block;
        margin: 0 15px;
        padding: 10px 30px;
        font-family: 'PT Sans Caption', sans-serif;
        color: #777777;
        transition: .3s linear;
        position: relative;
    }

    .menu-main a:before,
    .menu-main a:after {
        content: "";
        position: absolute;
        top: calc(50% - 3px);
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #F58262;
        opacity: 0;
        transition: .5s ease-in-out;
    }

    .menu-main a:before {
        left: 5px;
    }

    .menu-main a:after {
        right: 5px;
    }

        .menu-main a.router-link-active:before,
        .menu-main a.router-link-active:after,
        .menu-main a:hover:before,
        .menu-main a:hover:after {
            opacity: 1;
        }

        .menu-main a.router-link-active,
        .menu-main a:hover {
            color: #F58262;
        }

    @media(max-width:680px) {
        .menu-main li {
            display: block;
        }
    }
</style>
