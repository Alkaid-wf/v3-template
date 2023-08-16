<script lang="ts" setup>
const { VITE_APP_TITLE } = import.meta.env;
</script>

<template>
  <el-header>
    <router-link to="/">
      <span class="logo" />
      <h3>{{ VITE_APP_TITLE }}</h3>
    </router-link>

    <right-menu />
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  height: 4rem;
  background-color: $primary;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  a {
    display: flex;
    align-items: center;
    color: #fff;
    gap: 1rem;
    .logo {
      width: 5.5rem;
      height: 1.9rem;
      background-image: url('@/assets/img/logo.png');
      background-size: 100%;
      background-repeat: no-repeat;
    }
  }
}
</style>
