<script>
import NavbarComponent from "../components/Navbar.vue";
import FooterComponent from "../components/Footer.vue";
import axios from "axios";
import LoaderComponent from "@/components/Loader.vue";
import AlertClosed from "@/components/AlertClosed.vue";

export default {
  mounted() {
    if (localStorage.getItem('token')) {
      this.$router.push('dashboard')
    }
  },
  name: "registration",
  components: {
    LoaderComponent,
    NavbarComponent,
    FooterComponent,
    AlertClosed
  },

  data() {
    return {
      email: "",
      password: "",
      re_password: "",
      isLoading: false,
      emailError: "",
      passwordError: "",
      rePasswordError: '',
      serverError: null
    };
  },
  watch: {
    email(value) {
      // binding this to the data value in the email input
      this.email = value;
      this.validateEmail(value);
    },
    password(value) {
      // binding this to the data value in the email input
      this.password = value;
      this.validatePassword(value);
    },
    re_password(value) {
      // binding this to the data value in the email input
      this.re_password = value;
      this.validatePassword(value);
    }
  },
  methods: {
    validateEmail() {
      const re = /\S+@\S+\.\S+/;
      if (!this.email) {
        this.emailError = 'Email is required';
      } else if (!re.test(this.email)) {
        this.emailError = 'Email is not valid';
      } else {
        this.emailError = '';
      }
    },
    validatePassword() {
      if (!this.password) {
        this.passwordError = 'Password is required';
      } else {
        this.passwordError = '';
      }

      if (!this.re_password) {
        this.rePasswordError = 'Confirmation password is required';
      } else if (this.password !== this.re_password) {
        this.rePasswordError = 'Passwords don\'t match';
      } else {
        this.rePasswordError = '';
      }
    },
    async registration() {
      this.validateEmail();
      this.validatePassword();
      if (this.emailError || this.passwordError) {
        this.$refs.alertClose.showAlert('Please fix the validation errors before sending', 'bg-red-500');
        return;
      }
      this.isLoading = true;

      const errorHandle = (err) => {
        if (err.response) {
          const {status} = err.response;

          if (status === 201) {
            return this.router.push('login');
          } else if (status === 400) {
            this.serverError = err.response.data.message;
          } else if (status === 401) {
            this.$refs.alertClose.showAlert(err.response.data.message, 'bg-red-500', 5);
          } else if (status === 500) {
            this.$refs.alertClose.showAlert(err.response.data.message, 'bg-red-500', 5);
          }
        } else if (err.request) {
          this.router.push('index');
        } else {
          this.router.push('index');
        }
      }

      try {
        await axios.post('http://localhost:2280/api/v1/registration',
            {
              email: this.email,
              password: this.password
            },
            {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            .then(response => {
              this.$router.push('login')
              this.$refs.alertClose.showAlert(response.data.message, 'bg-green-500', 5);
            })
            .catch((err) => errorHandle(err))
      } finally {
        this.isLoading = false;
      }

    }
  }
}
</script>

<template>
  <div>
    <navbar-component></navbar-component>
    <LoaderComponent :visible="isLoading"/>
    <main>
      <AlertClosed ref="alertClose"/>
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
                      Sign up with
                    </h6>
                  </div>
                </div>
                <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
                  <form id="registration" @submit.prevent="registration">
                    <div class="relative w-full mb-3">
                      <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="email"

                      >Email</label
                      ><input id="email" v-model="email"
                              autocomplete="on"
                              class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
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
                          for="password"
                      >Password</label
                      ><input id="password"
                              v-model="password"
                              autocomplete="on"
                              class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                              placeholder="Password"
                              style="transition: all 0.15s ease 0s;"
                              type="password"
                              @change="validatePassword"
                    />
                      <span v-if="emailError" class="text-red-500">{{ passwordError }}</span>
                    </div>
                    <div class="relative w-full mb-3">
                      <label
                          class="block uppercase text-gray-700 text-xs font-bold mb-2"
                          for="re_password"
                      >Repeat password</label
                      ><input
                        id="re_password"
                        v-model="re_password"
                        class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                        placeholder="Repeat password"
                        style="transition: all 0.15s ease 0s;"
                        type="password"
                        @change="validatePassword"
                    />
                      <span v-if="rePasswordError" class="text-red-500">{{ rePasswordError }}</span>
                    </div>
                    <div class="text-center mt-6">
                      <button
                          class="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          style="transition: all 0.15s ease 0s;"
                          type="submit"
                      >
                        Sign Up
                      </button>
                    </div>
                    <div v-if="serverError" class="text-center mt-1">
                      <span class="text-red-500">{{ serverError }}</span>
                    </div>
                  </form>
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

<style scoped>

</style>