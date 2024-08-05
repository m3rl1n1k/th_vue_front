<script setup>

import HeaderComponent from "@/components/HeaderComponent.vue";
import SidebarComponent from "@/components/SidebarComponent.vue";
</script>

<template>
  <header-component></header-component>
  <sidebar-component></sidebar-component>
  <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
    <h1>Profile</h1>
    <hr>
    <div class="col-md-9 personal-info">
      <form class="form-horizontal" role="form">
        <div class="form-group">
          <label class="col-lg-3 control-label">Email:</label>
          <div class="col-lg-8">
            <input class="form-control" type="text" value="">
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Time Zone:</label>
          <div class="col-lg-8">
            <div class="ui-select">
              <select id="user_time_zone" class="form-control">
                <option value="Hawaii">(GMT-10:00) Hawaii</option>
                <option value="Alaska">(GMT-09:00) Alaska</option>
                <option value="Pacific Time (US &amp; Canada)">(GMT-08:00) Pacific Time (US &amp; Canada)</option>
                <option value="Arizona">(GMT-07:00) Arizona</option>
                <option value="Mountain Time (US &amp; Canada)">(GMT-07:00) Mountain Time (US &amp; Canada)</option>
                <option selected="selected" value="Central Time (US &amp; Canada)">(GMT-06:00) Central Time (US &amp;
                  Canada)
                </option>
                <option value="Eastern Time (US &amp; Canada)">(GMT-05:00) Eastern Time (US &amp; Canada)</option>
                <option value="Indiana (East)">(GMT-05:00) Indiana (East)</option>
              </select>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label class="col-lg-3 control-label">Currency</label>
          <div class="col-lg-8">
            <div class="ui-select">
              <select id="user_time_zone" class="form-control">
                <option value="USD">USD</option>
                <option value="PLN">PLN</option>
              </select>
            </div>
          </div>
        </div>
        <button class="btn btn-outline-primary my-3" type="submit">Save changes</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
body {
  margin-top: 20px;
}

.avatar {
  width: 200px;
  height: 200px;
}
</style>