<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
// give each todo a unique id
let id = 0;

const newTodo = ref("");
const todos = ref([
  { id: id++, text: "Learn HTML" },
  { id: id++, text: "Learn JavaScript" },
  { id: id++, text: "Learn Vue" },
]);

function addTodo() {
  todos.value.push({ id: id++, text: newTodo.value });
  newTodo.value = "";
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo);
}
</script>

<template>
  <form @submit.prevent="addTodo">
    <InputText v-model="newTodo" required placeholder="new todo" />
    <Button>Add Todo</Button>
  </form>
  <ul>
    <li v-for="todo in todos" :key="todo.id" class="grid grid-cols-2 my-2">
      <div class="flex items-center">
        {{ todo.text }}
      </div>
      <Button
        class="p-1"
        icon="pi pi-trash"
        severity="danger"
        @click="removeTodo(todo)"
      />
    </li>
  </ul>
</template>
