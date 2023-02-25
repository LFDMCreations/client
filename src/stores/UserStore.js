import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore("UserStore", () => {

  const jwt = ref('')
  const refresh = ref('')

  return { 
    jwt,
    refresh
  }

})