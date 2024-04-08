<script>
import { useTodoStore } from "../stores/todos";

const store = useTodoStore;
const todo = store.todos.find((t) => t.id === $route.params.id);
</script>
<template>
  <div v-if="todo">
    <h1>{{ todo.title }}</h1>
  </div>
  <div v-else>
    <h1>Todo not found</h1>
  </div>
</template>
