<template>
  <div v-if="alertOpen" :class="classBg" class="text-white px-6 py-4 border-0 rounded relative mb-4 alert alert-pos">
    <span class="text-xl inline-block mr-5 align-middle">
      <i class="fas fa-bell"></i>
    </span>
    <span class="inline-block align-middle mr-8">
      {{ message }}
    </span>
    <button
        class="absolute bg-transparent text-2xl font-semibold leading-none right-0 top-0 mt-4 mr-6 outline-none focus:outline-none"
        v-on:click="closeAlert()">
      <span>×</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "alert",
  data() {
    return {
      alertOpen: '',
      message: '',
      classBg: ''
    }
  },
  methods: {
    showAlert(message, classBg = 'bg-blueGray-500', timeout_s = 3) {
      this.message = message;
      this.classBg = classBg;
      this.alertOpen = true;
      setTimeout(() => {
        this.alertOpen = false;
      }, timeout_s * 1000); // Автоматичне закриття через 3 секунди
    },
    closeAlert: function () {
      this.alertOpen = false;
    }
  }
}
</script>

<style>
.alert {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 999;
  transition: all 1s ease 0s;
}
</style>