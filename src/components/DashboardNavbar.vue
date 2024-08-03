<template>
  <!-- Navbar -->
  <nav
      class="absolute top-0 left-0 w-full z-10 bg-pink-600 md:flex-row md:flex-nowrap md:justify-start flex items-center p-4"
  >
    <div
        class="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4"
    >
      <span ref="pageTitle" class="text-white text-sm uppercase hidden lg:inline-block font-semibold"></span>
      <!--      Buttons-->
      <div class="">
        New
        <RouterLink
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            to="/transaction/new">
          transaction
        </RouterLink>
        <RouterLink
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            to="/new-category">
          category
        </RouterLink>
      </div>
      <!-- Form -->
      <!--      <form-->
      <!--          class="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3"-->
      <!--      >-->
      <!--        <div class="relative flex w-full flex-wrap items-stretch">-->
      <!--          <span-->
      <!--              class="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-300 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3"-->
      <!--          ><i class="fas fa-search"></i-->
      <!--          ></span>-->
      <!--          <input-->
      <!--              class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"-->
      <!--              placeholder="Search here..."-->
      <!--              type="text"-->
      <!--          />-->
      <!--        </div>-->
      <!--      </form>-->
      <!-- User -->
      <ul
          class="flex-col md:flex-row list-none items-center hidden md:flex"
      >
        <user-dropdown-component></user-dropdown-component>
      </ul>
    </div>
  </nav>

  <!-- End Navbar -->
</template>
<script>
import UserDropdownComponent from "./UserDropdown.vue";

export default {
  components: {
    UserDropdownComponent,
    // PageTitle
  },
  mounted() {
    this.$refs.pageTitle.valueOf().textContent = this.$route.name

  }
};
</script>
