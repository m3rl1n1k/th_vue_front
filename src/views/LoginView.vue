<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import ColorModeComponent from "@/components/ColorModeComponent.vue";
import {RouterLink} from 'vue-router'
import LoaderComponent from "@/components/LoaderComponent.vue";
import AlertComponent from "@/components/AlertComponent.vue";
import emitter from '../eventBus';

const router = useRouter();
const email = ref("");
const password = ref("");
const server_error = ref("");
const isLoading = ref(false);
const emailError = ref("");
const passwordError = ref("");

const validateEmail = () => {
  const re = /\S+@\S+\.\S+/;
  if (!re.test(email.value)) {
    emailError.value = 'Email is not valid';
  } else {
    emailError.value = '';
  }
};

const validatePassword = () => {
  if (!password.value) {
    passwordError.value = 'Password is required';
  } else {
    passwordError.value = '';
  }
};

const logIn = async () => {
  validateEmail();
  validatePassword();
  if (emailError.value || passwordError.value) {
    //todo: server_error.value ="";
    return;
  }
  isLoading.value = true;

  const errorHandle = (err) => {
    if (err.response) {
      const {status} = err.response;
      if (status === 400) {
        server_error.value = err.response.data.message;
      } else if (status === 401) {
        emitter.emit('showAlert' ,err.response.data.message);
      } else  {
        emitter.emit('showAlert' ,"Server has error",);
      }
    } else if (err.request) {
      router.push('index');
    }
  };

  const saveToken = (response) => {
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      const redirectTo = router.currentRoute.value.query.redirect || 'dashboard';
      router.push(redirectTo);
    }
  };

  try {
    await axios.post('http://localhost:2280/api/v1/login_check',
        {
          username: email.value,
          password: password.value
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => saveToken(response))
        .catch((err) => errorHandle(err));
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <LoaderComponent :visible="isLoading"/>
  <color-mode-component></color-mode-component>
  <main class="form-signin w-100 m-auto align-content-center align-items-center min-vh-100 ">
    <form @submit.prevent="logIn">
      <h1 class="h3 mb-3 fw-normal">Please sign in</h1>
      <!--email-->
      <div class="form-floating mb-2">
        <input type="email" class="form-control" id="email" placeholder="name@example.com"
               @change="validateEmail"
               v-model="email"
               name="email">
        <label for="email">Email address</label>
        <span v-if="emailError" class="text-danger">{{ emailError }}</span>
      </div>
      <!--   password   -->
      <div class="form-floating mb-2">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password"
               @change="validatePassword"
               v-model="password"
        name="password">
        <label for="floatingPassword">Password</label>
        <span v-if="passwordError" class="text-danger ">{{ passwordError }}</span>
      </div>
      <!--      buttons -->
      <div class="row">
        <div class="col-md-6 col-sm-12 mt-sm-2 mt-2">
          <button class="btn btn-primary w-100 py-2" type="submit">Sign in</button>
        </div>
        <div class="col-md-6 col-sm-12 mt-sm-2 mt-2">
          <RouterLink class="btn btn-outline-primary w-100 py-2" to="/register">Register</RouterLink>
        </div>
      </div>
      <alert-component></alert-component>
    </form>
  </main>

</template>

<style scoped>

</style>