<template>

  <div>
    <div v-if="loginResp" >
      {{ resp }}
    </div>
    <div class="formulaire mt-4" v-else >
      
      <input class="mb-4" type="text" placeholder="nom" v-model="moi.name"  >
      <input class="mb-4" type="password" placeholder="mot de passe" v-model="moi.password" >

      <div       @click="login">s'indentifier</div>
    
      {{ loginMessage }}

    </div>
  </div>

</template>

<script setup>
import { ref, reactive } from 'vue';

const loginResp = ref(false)
const loginMessage = ref("")
const resp = ref('')
const jwt = ref('')

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
  return response.json(); // parses JSON response into native JavaScript objects
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

const moi = reactive({
  name:"",
  password:""
})

const login = () => {
  let headers = { 'Content-Type': 'application/json' }
  postData('http://localhost:9292/auth/login', { moi }, headers )
  .then((response) => {
    if ( response.status === 200 ) {
      //getjwt()
      getCars()
    }
    else {
      loginMessage.value = response.reason        
      moi.name = ''
      moi.password = ''
      setTimeout(() => {
        loginMessage.value = ""
      }, 2000)
    }
  })
  .catch((err) => { 
    alert(err)
  })
}

const getCars = () => {
  let headers = {
    'Content-Type': 'application/json', 
    '__auth__': 'aeflmknasef.aefasefln.aaaaaaa'
  }
  getData('http://localhost:9292/data/cars', headers)
  .then((response) => { console.log(response) })
}

async function getjwt() {
  await getData('http://localhost:9292/auth/getjwt')
  .then((response) => {
    console.log(`réponse de getjwt : ${response.__auth__}`)
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
.mt-4{
  margin-top: 2rem;
}

</style>