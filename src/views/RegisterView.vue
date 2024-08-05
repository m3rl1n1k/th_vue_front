<script setup>
import ColorModeComponent from "@/components/ColorModeComponent.vue";
import {RouterLink, useRouter} from 'vue-router';
import {onMounted, ref, watch} from "vue";
import axios from 'axios';  // Додайте цей імпорт для axios
import emitter from "@/eventBus.js";
import AlertComponent from "@/components/AlertComponent.vue";

const router = useRouter();
const email = ref("");
const password = ref("");
const re_password = ref("");  // Додайте змінну для підтвердження пароля
const server_error = ref("");
const isLoading = ref(false);
const emailError = ref("");
const passwordError = ref("");
const rePasswordError = ref("");  // Додайте змінну для помилки підтвердження пароля

onMounted(() => {
  if (localStorage.getItem('token')) {
    router.push('dashboard');
  }
});

watch(email, (value) => {
  validateEmail(value);
});

watch(password, (value) => {
  validatePassword(value);
});

watch(re_password, (value) => {
  validatePassword(value);
});

function validateEmail(value) {
  const re = /\S+@\S+\.\S+/;
  if (!value) {
    emailError.value = 'Email is required';
  } else if (!re.test(value)) {
    emailError.value = 'Email is not valid';
  } else {
    emailError.value = '';
  }
}

function validatePassword() {
  if (!password.value) {
    passwordError.value = 'Password is required';
  } else {
    passwordError.value = '';
  }

  if (!re_password.value) {
    rePasswordError.value = 'Confirmation password is required';
  } else if (password.value !== re_password.value) {
    rePasswordError.value = 'Passwords don\'t match';
  } else {
    rePasswordError.value = '';
  }
}

async function registration() {
  validateEmail(email.value);
  validatePassword();
  if (emailError.value || passwordError.value || rePasswordError.value) {
    return;
  }
  isLoading.value = true;

  const errorHandle = (err) => {
    if (err.response) {
      const {status} = err.response;
      if (status === 201) {
        router.push('login');
      } else if (status === 400) {
        emitter.emit('showAlert', 'Email is taken');
      }   else {
        emitter.emit('showAlert', "Server has error");
      }
    } else if (err.request) {
      router.push('index');
    } else {
      router.push('index');
    }
  }

  try {
    const response = await axios.post('http://localhost:2280/api/v1/registration', {
      email: email.value,
      password: password.value
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    await router.push('login');
    emitter.emit('showAlert', response.data.message);
  } catch (err) {

    errorHandle(err);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <main class="form-signin w-100 m-auto align-content-center align-items-center min-vh-100 ">
    <form @submit.prevent="registration">
      <h1 class="h3 mb-3 fw-normal">Sign up</h1>

      <!--email-->
      <div class="form-floating mb-2">
        <input type="email" class="form-control" id="email" placeholder="name@example.com"
               @change="validateEmail"
               v-model="email"
               name="email"
        autocomplete="on">
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
      <!--      repeat password -->
      <div class="form-floating mb-2">
        <input type="password" class="form-control" id="repeat_pass" placeholder="Repeat password"
               @change="validatePassword"
        name="repeat_password"
        v-model="re_password">
        <label for="repeat_pass">Repeat password</label>
        <span v-if="rePasswordError" class="text-danger ">{{ rePasswordError }}</span>
      </div>
      <!--      buttons -->
      <div class="row">
        <div class="col-md-6 col-sm-12 mt-sm-2 mt-2">
          <button class="btn btn-primary w-100 py-2" type="submit">Sign up</button>
        </div>
        <div class="col-md-6 col-sm-12 mt-sm-2 mt-2">
          <RouterLink to="/login" class="btn btn-outline-primary w-100 py-2">Back</RouterLink>
        </div>
      </div>
      <alert-component></alert-component>
    </form>
  </main>

  <color-mode-component></color-mode-component>
</template>

<style scoped>

</style>