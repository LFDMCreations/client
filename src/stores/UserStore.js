import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("UserStore", () => {

  const jwt = ref('')

  return { 
    jwt,
  }

})