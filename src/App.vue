<script setup>
import { RouterLink, RouterView } from "vue-router";
import TheHeading from "./components/TheHeading.vue";
</script>

<template>
  <div class="p-4">
    <header>
      <TheHeading />
      <div class="container mx-auto my-4">
        <nav class="my-8">
          <RouterLink
            to="/"
            class="bg-indigo-500 text-white p-4 rounded-md text-xl hover:bg-indigo-600"
            ><i class="pi pi-home"></i> Home</RouterLink
          >
        </nav>
      </div>
    </header>

    <RouterView />
  </div>
</template>

<style scoped></style>
