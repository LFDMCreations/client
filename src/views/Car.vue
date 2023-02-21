<template>

  <h1>Selected car</h1>

  <div>

    <p>
      <span>{{ car.marque }}</span><span>{{ car.modele }}</span><span class="ml-4">{{ car.prix }}</span></p>

  </div>



</template>


<script setup>

import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/UserStore.js'
import { storeToRefs } from 'pinia'
const UserStore = useUserStore()
const { jwt } = storeToRefs(UserStore)
const router = useRouter()
const route = useRoute()

const car = ref('')

onMounted(() => {
  getCar()
})

async function getData(url = '', headers = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: headers,
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

const getCar = () => {
  let headers = {
    'Content-Type': 'application/json', 
    '__auth__': jwt.value
  }
  let url = `https://apijwt.osc-fr1.scalingo.io/data/car/${route.params.id}`
  getData(url, headers)
  .then((response) => {
    if (response.status === 200) {
       car.value = response.reason
    } else {
      router.push({
        name: 'Home'
      })
    }
   
  })
  .catch((err) => {alert(err)})
}




</script>

<style lang="css" scoped >

.ml-4{
  margin-left: 2rem;
}

</style>