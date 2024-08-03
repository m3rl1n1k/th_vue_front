<template>
  <LoaderComponent :visible="isLoading"></LoaderComponent>
  <SidebarComponent></SidebarComponent>
  <div class="relative md:ml-64">
    <DashboardNavbar></DashboardNavbar>
    <div class="relative overflow-x-auto sm:rounded-lg md:pt-32 pt-12 px-12 p-5">
      <div v-if="transactions.length > 0">
        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th class="px-6 py-3" scope="col">Amount</th>
            <th class="px-6 py-3" scope="col">Color</th>
            <th class="px-6 py-3" scope="col">Category</th>
            <th class="px-6 py-3" scope="col">Price</th>
            <th class="px-6 py-3" scope="col">Action</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="transaction in transactions" :key="transaction.id"
              class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <th class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white" scope="row">
              {{ transaction.amount }}
            </th>
            <td class="px-6 py-4">{{ transaction.color }}</td>
            <td class="px-6 py-4">{{ getCategoryName(transaction.category.url) }}</td>
            <td class="px-6 py-4">{{ transaction.price }}</td>
            <td class="px-6 py-4">
              <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline" href="#">Edit</a>
            </td>
          </tr>
          </tbody>
        </table>
        <nav aria-label="Table navigation"
             class="flex items-center flex-column flex-wrap md:flex-row justify-between pt-4">
        <span
            class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto">Showing <span
            class="font-semibold text-gray-900 dark:text-white">{{ pagination.per_page }}-{{
            pagination.total_items
          }}</span> of <span
            class="font-semibold text-gray-900 dark:text-white">{{ pagination.total_pages }}</span></span>
          <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
            <li>
              <a class="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                 href="#"
                 @click.prevent="changePage(pagination.current_page - 1)">Previous</a>
            </li>
            <li v-for="page in pagination.pages" :key="page">
              <a :class="['flex items-center justify-center px-3 h-8 leading-tight', {'text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white': pagination.current_page === page, 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white': pagination.current_page !== page}]"
                 @click.prevent="changePage(page)">{{ page }}</a>
            </li>
            <li>
              <a class="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                 href="#"
                 @click.prevent="changePage(pagination.current_page + 1)">Next</a>
            </li>
          </ul>
        </nav>
      </div>
      <div v-else>
        <h2>Records not found</h2>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DashboardNavbar from "@/components/DashboardNavbar.vue";
import SidebarComponent from "@/components/Sidebar.vue";
import LoaderComponent from "@/components/Loader.vue";

export default {
  name: 'TransactionList',
  components: {LoaderComponent, SidebarComponent, DashboardNavbar},
  data() {
    return {
      transactions: [],
      categoryCache: {},
      isLoading: false,
      pagination: {
        current_page: 1,
        has_next_page: true,
        has_previous_page: false,
        per_page: 10,
        total_items: 22,
        total_pages: 3,
        pages: []
      },
    };
  },
  methods: {
    async getCategoryName(categoryUrl) {
      if (this.categoryCache[categoryUrl]) {
        return this.categoryCache[categoryUrl].name;
      }
      try {
        console.log(categoryUrl)
        const response = await axios.get(`http://localhost:2280${categoryUrl}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const category = response.data;
        this.categoryCache[categoryUrl] = category;
        return category.name;
      } catch (error) {
        console.error(error);
        return 'Unknown';
      }
    },
    async getTransactionsList(page = 1) {
      this.isLoading = true;
      try {
        const response = await axios.get(`http://localhost:2280/api/v1/transaction?page=${page}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = response.data;
        this.transactions = data.transactions.items;
        this.pagination = data.transactions.pagination;
        this.pagination.pages = Array.from({length: this.pagination.total_pages}, (v, k) => k + 1);
        this.pagination.current_page = page;
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },
    changePage(page) {
      if (page < 1 || page > this.pagination.total_pages) return;
      this.getTransactionsList(page);
    }
  },
  mounted() {
    this.getTransactionsList();
  }
}
</script>

<style scoped>
/* Ваші стилі */
</style>

<style scoped>
/* Ваші стилі */
</style>