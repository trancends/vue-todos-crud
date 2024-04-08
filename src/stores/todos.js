import { ref } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

export const useTodoStore = defineStore("todos", () => {
  const todos = ref([]);
  const currentPage = ref(0);
  const limit = ref(10);
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
    try {
      const response = await axios.post(
        `https://jsonplaceholder.typicode.com/todos`,
        todo
      );
      todos.value.push(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  function nextPage() {
    if (currentPage.value < todos.value.length / limit.value) {
      currentPage.value += 1;
    }
  }
  function prevPage() {
    if (currentPage.value > 0) {
      currentPage.value -= 1;
    }
  }

  return { todos, currentPage, limit, addTodo, fetchTodos, nextPage, prevPage };
});
