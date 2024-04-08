<script setup>
import { useTodoStore } from "../stores/todos";
import { ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "primevue/usetoast";
import InputText from "primevue/inputtext";
import Toast from "primevue/toast";
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();
const store = useTodoStore();

const toast = useToast();
const editTodo = () => {
  store.updateTodo(todo.value);
  setTimeout(() => {
    toast.add({
      severity: "info",
      summary: "Todo Updated",
      detail: "Todo updated successfully",
      life: 3000,
    });
  }, 100);
  router.push("/");
};

const Log = (todo) => {
  console.log(`onChange: ${todo.completed}, value: ${todo}`);
};

const todo = ref(store.todos.find((t) => t.id === parseInt(route.params.id)));

onMounted(() => {
  console.log(`Todo ID: ${route.params.id} todo: ${todo.value}`);
});
</script>
<template>
  <div v-if="todo">
    <form @submit.prevent="updateTodo">
      <div class="grid grid-cols-5 w-8/12 gap-3">
        <InputText
          class="col-span-3"
          type="text"
          v-model="todo.title"
          required
        />

        <div class="flex items-center">
          <Checkbox
            class="col-span-1"
            v-model="todo.completed"
            input-id="completed"
            :binary="true"
            :value="todo.completed"
            @change="Log(todo)"
          />
          <label for="completed" class="ml-2">Completed</label>
        </div>
      </div>
      <Toast />
      <Button
        class="p-1 my-4"
        icon="pi pi-save"
        label="Save"
        severity="info"
        @click="editTodo(todo)"
      />
    </form>
  </div>
</template>
