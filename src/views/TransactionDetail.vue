<template>
  <sidebar-component></sidebar-component>
  <div class="relative md:ml-64 bg-blueGray-100">
    <DashboardNavbar></DashboardNavbar>
    <div>
      <h1>Transaction Details</h1>
      <p>Amount: {{ transaction.amount }}</p>
      <p>Description: {{ transaction.description }}</p>
      <!-- Додайте інші поля, які потрібні -->
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import DashboardNavbar from "@/components/DashboardNavbar.vue";
import SidebarComponent from "@/components/Sidebar.vue";

export default {
  name: 'TransactionDetail',
  components: {SidebarComponent, DashboardNavbar},
  data() {
    return {
      transaction: {}
    };
  },
  async created() {
    await this.fetchTransaction();
  },
  methods: {
    async fetchTransaction() {
      const transactionId = this.$route.params.id;
      try {
        const response = await axios.get(`http://localhost:2280/api/v1/transaction/${transactionId}`, {
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
        this.transaction = response.data;
      } catch (error) {
        console.error('Error fetching transaction:', error);
      }
    }
  }
}
</script>

<style scoped>

</style>