<!--<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <HomePage msg="Welcome to Your Vue.js + TypeScript App"/>
</template>-->
<template>
    <header>
        <Nav :routes="routes"></Nav>
    </header>
    <RouterView v-slot="{ Component }">
        <Transition :name="routeAnimName">
            <component :is="Component" />
        </Transition>
    </RouterView>
</template>

<script lang="ts">
    import { RouterLink, RouterView, useRoute, useRouter, type RouterLinkProps } from "vue-router";
    import { defineComponent, ref, watch, type Ref, nextTick } from "vue";
    import NavItem from './components/NavItem.vue';
        const route = useRoute();
    const routeAnimName: Ref<"slide-left" | "slide-right" | "none"> = ref("none");
    function getRouteIdxByPath(path: string): number {
      const routeDesc = routes.filter(r => r.to == route.path)[0];
      return routes.indexOf(routeDesc);
    }
    const routes = [
      { to: "/", text: "Главная страница", },
      { to: "/weatherforecasts", text: "Все прогнозы погоды", },
      { to: "/weatherforecast", text: "Прогноз погоды по id", },
    ];
    let changedRouteOnce = false;
    let lastRouteIndex = getRouteIdxByPath(route.path);
    watch(() => route.matched, () => {
      if (changedRouteOnce) {
        const nextRouteIndex = getRouteIdxByPath(route.path);
        if (nextRouteIndex > lastRouteIndex) {
          routeAnimName.value = "slide-left";
        }
        else {
          routeAnimName.value = "slide-right";
        }
        lastRouteIndex = nextRouteIndex;
      }
      else {
        changedRouteOnce = true;
      }
    },
      {
        flush: "pre"
      });
    export default defineComponent({
      name: 'App',
      components: {
          NavItem
      }
    });
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
