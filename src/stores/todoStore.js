import { defineStore } from "pinia";

export const useTodoStore = defineStore("todos", {
  state: () => ({
    todos: [],
    currentPage: 0,
    limit: 10,
  }),
  actions: {
    async fetchTodos() {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos?_page=${this.currentPage}&_limit=${this.limit}`
      );
      this.todos = await response.json();
    },
    setCurrentPage(page) {
      this.currentPage = page;
      this.fetchTodos();
    },
    // Add more actions for CRUD operations here
  },
});
