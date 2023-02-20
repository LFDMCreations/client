<template>

  <div v-if="gotCars">
   <div class="mb-2" v-for="car in cars" :key="car.id" >
    <span class="mr-4">{{ car.marque }}</span>
    <span>{{ car.modele }}</span>
    <router-link :to="{
      name: 'Car',
      params: {id: car.id}
    }"
    >voir</router-link>
   </div>
  </div>

  <div v-else>
    <div v-if="loginResp" >
      {{ resp }}
    </div>
    <div class="formulaire mt-4" v-else >
      
      <input class="mb-4" type="text" placeholder="nom" v-model="moi.name"  >
      <input class="mb-4" type="password" placeholder="mot de passe" v-model="moi.password" >

      <div @click="login(moi)">s'indentifier</div>
    
      {{ loginMessage }}

    </div>
  </div>

</template>

<script setup>

import { ref, reactive } from 'vue';
import { useUserStore } from '../stores/UserStore.js'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'

const router = useRouter()
const route = useRoute()

const loginResp = ref(false)
const gotCars = ref(false)
const cars = ref('')

const UserStore = useUserStore()
const { jwt } = storeToRefs(UserStore)

const loginMessage = ref("")
const resp = ref('')

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
const login = () => {

  fetch('http://localhost:9292/auth/login', {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: { 'Content-Type': 'application/json' },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(moi) // body data type must match "Content-Type" header
  })
  .then((response) => {
    moi.name = ''
    moi.password = ''
    if (response.status === 200) {
      jwt.value = response.headers.get('__auth__')
      loginMessage.value = "identification réussie"
      setTimeout(() => {
        loginMessage.value = ""
        getCars()
      }, 2000)
    } else {

      loginMessage.value = "échec d'identification"
    }
  })
  .catch((err) => {alert(err)})
}

const moi = reactive({
  name:"",
  password:""
})

const getCars = () => {
  let headers = {
    'Content-Type': 'application/json', 
    '__auth__': jwt.value
  }
  getData('http://localhost:9292/data/cars', headers)
  .then((response) => {
    gotCars.value = true
    cars.value = response.reason
  })
}

async function getjwt() {
  await getData('http://localhost:9292/auth/getjwt')
  .then((response) => {
   
  })
  .catch((err) => {
    throw(err)
  })
}


</script>

<style lang="css" scoped >

.formulaire {
  display: flex;
  flex-direction: column;
}
.mb-4{
  margin-bottom: 2rem;
}
.mr-4{
  margin-right: 2rem;
}
.mb-2{
  margin-bottom: 1rem;
}
.mt-4{
  margin-top: 2rem;
}

</style>