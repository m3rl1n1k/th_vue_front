<script>
import {onMounted, ref} from 'vue';
import axios from 'axios';
import {useRouter} from 'vue-router';
import NavbarComponent from "../components/Navbar.vue";
import FooterComponent from "../components/Footer.vue";
import LoaderComponent from "@/components/Loader.vue";
import AlertClosed from "@/components/AlertClosed.vue";

export default {
  name: "login",
  components: {
    LoaderComponent,
    NavbarComponent,
    FooterComponent,
    AlertClosed
  },
  setup() {
    const router = useRouter();
    const email = ref("");
    const password = ref("");
    const re_password = ref("");
    const isLoading = ref(false);
    const emailError = ref("");
    const passwordError = ref("");
    const rePasswordError = ref("");

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
        // this.refs.alertClose.showAlert('Please fix the validation errors before sending', 'bg-red-500');
        return;
      }
      isLoading.value = true;

      const errorHandle = (err) => {
        if (err.response) {
          const {status} = err.response;

          if (status === 400) {
            this.$refs.alertClose.showAlert(err.response.data.message, 'bg-red-500');
          } else if (status === 401) {
            this.$refs.alertClose.showAlert(err.response.data.message, 'bg-red-500');
          } else if (status === 500) {
            this.$refs.alertClose.showAlert(err.response.data.message, 'bg-red-500');
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
    };

    onMounted(() => {
      if (localStorage.getItem('token')) {
        router.push('dashboard');
      }
    });

    return {
      email,
      password,
      re_password,
      isLoading,
      emailError,
      passwordError,
      rePasswordError,
      logIn
    };
  }
};
</script>
<template>
  <div>
    <navbar-component></navbar-component>
    <AlertClosed ref="alertClose"/>
    <LoaderComponent :visible="isLoading"/>
    <main>
      <section class="absolute w-full h-full">
        <div
            :style="{'background-image': 'url(' + require('../assets/img/register_bg_2.png').default + ')'}"
            class="absolute top-0 w-full h-full bg-gray-900"
            style="background-size: 100%; background-repeat: no-repeat;"
        ></div>
        <div class="container mx-auto px-4 h-full">
          <div class="flex content-center items-center justify-center h-full">
            <div class="w-full lg:w-4/12 px-4">
              <div
                  class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
              >
                <div class="rounded-t mb-0 px-6 py-6">
                  <div class="text-center mb-3">
                    <h6 class="text-gray-600 text-sm font-bold">
                      Sign in with
                    </h6>
                  </div>
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form id="logIn" @submit.prevent="logIn">
                    <div class="relative w-full mb-3">
                      <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                      >Email</label
                      ><input v-model="email"
                              autocomplete="on"
                              class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                              name="email"
                              placeholder="Email"
                              style="transition: all 0.15s ease 0s;"
                              type="email"
                              @change="validateEmail"
                    />
                      <span v-if="emailError" class="text-red-500">{{ emailError }}</span>
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="grid-password"
                      >Password</label
                      ><input v-model="password"
                              autocomplete="on"
                              class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                              name="password"
                              placeholder="Password"
                              style="transition: all 0.15s ease 0s;"
                              type="password"
                              @change="validatePassword"
                    />
                      <span v-if="emailError" class="text-red-500">{{ passwordError }}</span>
                    </div>
                    <div class="text-center mt-6">
                      <button
                          class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          style="transition: all 0.15s ease 0s;"
                          type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <div class="flex flex-wrap mt-6">
                    <!--                    <div class="w-1/2">-->
                    <!--                      <a class="text-white" href="#pablo"-->
                    <!--                      ><small>Forgot password?</small></a-->
                    <!--                      >-->
                    <!--                    </div>-->
                    <RouterLink
                        class="bg-gray-700 text-center text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                        to="/registration">
                      Create new account
                    </RouterLink>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
        <footer-component></footer-component>
      </section>
    </main>
  </div>

</template>