<script setup>
import SidebarComponent from "@/components/SidebarComponent.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import axios from "axios";
import {onMounted, reactive, ref} from "vue";
import LoaderComponent from "@/components/LoaderComponent.vue";


const transactions = ref([]);
const categoryCache = reactive({});
const isLoading = ref(false);
const pagination = reactive({
  current_page: 1,
  has_next_page: true,
  has_previous_page: false,
  per_page: 10,
  total_items: 22,
  total_pages: 3,
  pages: []
});

async function getCategoryName(categoryUrl) {
  if (categoryCache[categoryUrl]) {
    return categoryCache[categoryUrl].name;
  }
  try {
    const response = await axios.get(`http://localhost:2280${categoryUrl}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const category = response.data;
    categoryCache[categoryUrl] = category;
    return category.name;
  } catch (error) {
    console.error(error);
    return 'Unknown';
  }
}

async function getTransactionsList(page = 1) {
  isLoading.value = true;
  try {
    const response = await axios.get(`http://localhost:2280/api/v1/transaction?page=${page}`, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    const data = response.data;
    transactions.value = data.transactions.items;
    pagination.current_page = page;
    pagination.has_next_page = data.transactions.pagination.has_next_page;
    pagination.has_previous_page = data.transactions.pagination.has_previous_page;
    pagination.total_pages = data.transactions.pagination.total_pages;
    pagination.pages = Array.from({length: pagination.total_pages}, (v, k) => k + 1);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}

function changePage(page) {
  if (page < 1 || page > pagination.total_pages) return;
  getTransactionsList(page);
}

onMounted(() => {
  getTransactionsList();
});
</script>
<template>
  <loader-component :visible="isLoading"></loader-component>
  <header-component></header-component>
  <sidebar-component></sidebar-component>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <div
        class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
      <h1 class="h2">Transactions</h1>
    </div>
    <div v-if="transactions.length > 0" class="">
      <div v-for="transaction in transactions" :key="transaction.id">
        {{ transaction.name }} - {{ getCategoryName(transaction.categoryUrl) }}
      </div>
      <div>
        <button :disabled="!pagination.has_previous_page" @click="changePage(pagination.current_page - 1)">Previous
        </button>
        <button v-for="page in pagination.pages" :key="page" @click="changePage(page)">{{ page }}</button>
        <button :disabled="!pagination.has_next_page" @click="changePage(pagination.current_page + 1)">Next</button>
      </div>
    </div>
    <div v-else>
      Not have records:
      <router-link to="transaction/new">add one</router-link>
    </div>
  </main>
</template>

<style scoped>

</style>
