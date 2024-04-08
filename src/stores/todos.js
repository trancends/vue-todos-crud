import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore("todos", () => {
  const todos = ref([]);
  const currentPage = ref(0);
  const currentId = ref(200);
  const limit = ref(10);
  const isLoading = ref(false);
  const fetchTodos = async () => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`
      );
      // fetch 10 per pages
      // const response = await fetch(
      //   `https://jsonplaceholder.typicode.com/todos?_page=${currentPage.value}&_limit=${limit.value}`
      // );
      todos.value = await response.json();
      todos.value.sort((a, b) => b.id - a.id);
      console.log(todos.value.slice(0, limit.value));
    } catch (error) {
      console.error(error);
    }
  };

  const addTodo = async (todo) => {
    isLoading.value = true;
    try {
      console.log(isLoading.value);
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/todos`,
        todo
      );
      // push new todo with currentId++
      currentId.value++;
      todos.value.unshift({ ...todo, id: currentId.value });
      isLoading.value = false;
    } catch (error) {
      isLoading.value = false;
      console.error(error);
    }
  };

  const deleteTodo = async (todo) => {
    isLoading.value = true;
    try {
      await axios.delete(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`
      );
      todos.value = todos.value.filter((t) => t.id !== todo.id);
      isLoading.value = false;
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async (todo) => {
    console.log(todo);
    isLoading.value = true;
    try {
      await axios.put(
        `https://jsonplaceholder.typicode.com/todos/${todo.id}`,
        todo
      );
      isLoading.value = false;
      const index = todos.value.findIndex((t) => t.id === todo.id);
      console.log(index);
      if (index !== -1) {
        todos.value[index] = todo;
      }
    } catch (error) {
      isLoading.value = false;
      console.log(
        "internal server error 500 when updating id >= which is expected"
      );
    }
  };

  return {
    todos,
    currentPage,
    isLoading,
    limit,
    addTodo,
    deleteTodo,
    updateTodo,
    fetchTodos,
  };
});
