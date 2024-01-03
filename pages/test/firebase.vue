<template>
  <BCard>
    <template #body>
      <form @submit.prevent="handleSubmit" method="post">
        <!-- Input Bootstrap 5.3 email and password -->
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" aria-describedby="emailHelp" v-model="newUser.email" />
          <div id="emailHelp" class="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="newUser.password" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </template>

    <template #footer>
      <dl class="row">
        <dt class="col-sm-3">UDI</dt>
        <dd>{{ newUser.uuid }}</dd>
      </dl>
      <button type="button" class="btn btn-danger" @click="handleDeleteUser">
        <BootstrapIconTrashFill />
        Borrar usuario
      </button>
    </template>
  </BCard>
</template>

<script lang="ts" setup>
definePageMeta({
  auth: false,
})
import { initializeApp } from 'firebase/app'

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { reactive } from 'vue';


const auth = getAuth()
const handleSubmit = async () => {
  alert(`Email: ${newUser.email} Password: ${newUser.password}`)
  createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      newUser.uuid = user.uid
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..

      alert(`Error: ${errorCode} ${errorMessage}`)
    })

}

const handleDeleteUser = async () => {
  await signInWithEmailAndPassword(auth, newUser.email, newUser.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user
      // ...
      alert(`User ${user.email} signed in`)
      user.delete()
        .then(() => {
          // User deleted.
          alert(`User ${user.email} deleted`)
          Object.assign(newUser, {
            email: '',
            password: '',
            uuid: '',
          })
        })
        .catch((error) => {
          // An error ocurred
          // ...
          alert(`Error: ${error.code} ${error.message}`)
        })
    })
    .catch((error) => {
      const errorCode = error.code
      const errorMessage = error.message
      // ..
      alert(`Error: ${errorCode} ${errorMessage}`)
    })

}

const newUser = reactive({
  email: '',
  password: '',
  uuid: '',
})
</script>

