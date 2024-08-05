<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import emitter from '../eventBus';

const alertOpen = ref(false);
const message = ref('');
const classBg = ref();

function showAlert(newMessage, newClassBg = 'alert-danger', timeout_s = 4) {
  message.value = newMessage;
  classBg.value = newClassBg;
  alertOpen.value = true;
  setTimeout(() => {
    closeAlert();
  }, timeout_s * 1000); // Автоматичне закриття через 3 секунди
}

function closeAlert() {
  alertOpen.value = false;
}

onMounted(() => {
  emitter.on('showAlert', showAlert);
});

onUnmounted(() => {
  emitter.off('showAlert', showAlert);
});
</script>

<template>
  <div v-if="alertOpen" :class="classBg" class="alert alert-dismissible fade show mt-2" role="alert">
    {{ message }}
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"
            v-on:click="closeAlert()"></button>
  </div>
</template>

<style scoped>

</style>