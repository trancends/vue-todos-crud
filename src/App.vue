<script setup>
import { RouterLink, RouterView } from "vue-router";
import TheHeading from "./components/TheHeading.vue";
</script>

<template>
  <div class="p-4">
    <header>
      <TheHeading />
      <div class="container mx-auto">
        <nav flex flex-row>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped></style>
