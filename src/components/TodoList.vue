<script setup>
import { ref, computed } from "vue";
import { storeToRefs } from "pinia";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import { onMounted } from "vue";
import { useTodoStore } from "../stores/todos";

const store = useTodoStore();
// give each todo a unique id
let id = 0;

const newTodo = ref("");
const { todos, currentPage, limit } = storeToRefs(store);

// Computed property for the current slice of todos
const visibleTodos = computed(() => {
  const start = currentPage.value * limit.value;
  const end = start + limit.value;
  return todos.value.slice(start, end);
});

function addTodo() {
  store.addTodo({ title: newTodo.value, completed: false, userId: 1 });
  newTodo.value = "";
}

function removeTodo(todo) {
  todos.value = todos.value.filter((t) => t !== todo);
}

function goToPreviousPage() {
  if (currentPage.value > 0) {
    currentPage.value -= 1;
  }
}

function goToNextPage() {
  if (currentPage.value < todos.value.length / limit.value) {
    currentPage.value += 1;
  }
}

onMounted(() => {
  if (todos.value.length === 0) {
    store.fetchTodos();
  }
});
</script>

<template>
  <div class="flex flex-col items-center w-9/12 mx-auto">
    <form @submit.prevent="addTodo" class="flex gap-2 mb-4">
      <InputText v-model="newTodo" required placeholder="new todo" />
      <Button type="submit">Add Todo</Button>
    </form>
    <div class="flex justify-center w-9/12 mx-auto"></div>
    <ul>
      <li
        v-for="todo in visibleTodos"
        :key="todo.id"
        class="grid grid-cols-5 my-2 justify-center"
      >
        <div
          class="col-span-4 flex items-center px-3 rounded-md bg-slate-50 border boder-solid border-indigo-500"
        >
          {{ todo.title }}
        </div>
        <div class="flex justify-center px-3 gap-1">
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
  </div>
  <div class="flex justify-center w-9/12 mx-auto gap-2">
    <Button @click="goToPreviousPage" :disabled="currentPage === 0">
      <i class="pi pi-chevron-left"></i>Prev
    </Button>
    <div class="px-4 py-2 text-gray-700 bg-gray-200 rounded-md">
      Page {{ currentPage + 1 }}
    </div>
    <Button
      @click="goToNextPage"
      :disabled="currentPage >= todos.length / limit - 1"
    >
      Next<i class="pi pi-chevron-right"></i>
    </Button>
  </div>
</template>
