<script setup>
import { ref } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { onMounted } from "vue";
// give each todo a unique id
let id = 0;

const newTodo = ref("");
const todos = ref([]);

const page = ref(0);

function addTodo() {
  todos.value.push({ id: id++, title: newTodo.value });
  newTodo.value = "";
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo);
}

const fetchData = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_page=${page.value}&_limit=10`
  );
  todos.value = await res.json();
  id = todos.value.length;
};

onMounted(() => {
  fetchData();
});
</script>

<template>
  <form @submit.prevent="addTodo" class="flex gap-2 mb-4">
    <InputText v-model="newTodo" required placeholder="new todo" />
    <Button type="submit">Add Todo</Button>
  </form>
  <ul class="overflow-x-scroll">
    <li
      v-for="todo in todos"
      :key="todo.id"
      class="grid grid-cols-2 my-2 gap-3"
    >
      <div
        class="flex items-center px-3 rounded-md bg-slate-50 border boder-solid border-indigo-500"
      >
        {{ todo.title }}
      </div>
      <div class="flex items-center px-3 gap-1">
        <Button class="p-1" icon="pi pi-file-edit" severity="help" />
        <Button
          class="p-1"
          icon="pi pi-trash"
          severity="danger"
          @click="removeTodo(todo)"
        />
      </div>
    </li>
  </ul>
</template>
