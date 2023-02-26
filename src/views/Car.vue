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
const { jwt, refresh } = storeToRefs(UserStore)
const router = useRouter()
const route = useRoute()

const baseUrl = "https://apijwt.osc-fr1.scalingo.io"
//const baseUrl = "http://localhost:9292"

const car = ref('')

onMounted(() => {
  getCar()
})

async function postData(url = '', data = {}, headers = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: headers,
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response; // parses JSON response into native JavaScript objects
}

async function chercheDonnees (url = '', headers = {}) {
  let r = await fetch(url, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: headers,
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //body: JSON.stringify(data) // body data type must match "Content-Type" header
  })
  return r
}

async function getData(url = '', headers = {}) {
  let r = await chercheDonnees(url, headers)
  if (r.status === 200) {
    return r.json()
  }
  else if (r.status === 409) {
    await getjwt()
    headers = {
      'Content-Type': 'application/json', 
      '__auth__': jwt.value
    }
    let r = await chercheDonnees(url, headers)
    if (r.status === 200) {
      return r.json()
    }
  } 
}

async function getjwt() {
  let adresse = `${baseUrl}/auth/getjwt`
  let headers = { 'Content-Type': 'application/json' }
  const response = await postData(adresse, refresh.value, headers)
  if (response.status === 200) {
    jwt.value = response.headers.get('__auth__')  
    return true 
  }
  return false
}

const getCar = () => {
  let headers = {
    'Content-Type': 'application/json', 
    '__auth__': jwt.value
  }
  let url = `${baseUrl}/data/car/${route.params.id}`
  let r = getData(url, headers)
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