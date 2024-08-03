<template>
  <div>
    <a
        ref="btnDropdownRef"
        class="text-blueGray-500 block"
        href="#pablo"
        v-on:click="toggleDropdown($event)"
    >
      <div class="items-center flex">
        <span
            class="w-12 h-12 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full"
        >
          <img
              alt="..."
              class="w-full rounded-full align-middle border-none shadow-lg"
              src="../assets/img/team-1-800x800.jpg"
          />
        </span>
      </div>
    </a>
    <div
        ref="popoverDropdownRef"
        class="bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg mt-1"
        style="min-width: 12rem"
        v-bind:class="{
        hidden: !dropdownPopoverShow,
        block: dropdownPopoverShow
      }"
    >
      <a
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          href="#pablo"
      >
        Action
      </a>
      <a
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          href="#pablo"
      >
        Another action
      </a>
      <a
          class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          href="#pablo"
      >
        Something else here
      </a>
      <div class="h-0 my-2 border border-solid border-blueGray-100"/>
      <a class="text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
         v-on:click="logout"
      >
        Logout
      </a>
    </div>
  </div>
</template>
<style>
a:hover {
  cursor: pointer
}
</style>
<script>
import {createPopper} from "@popperjs/core";

export default {
  data() {
    return {
      dropdownPopoverShow: false
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('login')
    },
    toggleDropdown: function (event) {
      event.preventDefault();
      if (this.dropdownPopoverShow) {
        this.dropdownPopoverShow = false;
      } else {
        this.dropdownPopoverShow = true;
        createPopper(this.$refs.btnDropdownRef, this.$refs.popoverDropdownRef, {
          placement: "bottom-end"
        });
      }
    }
  }
};
</script>
