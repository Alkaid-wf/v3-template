<template>
  <el-main class="app-main">
    <router-view v-slot="{ Component, route: { name } }">
      <transition name="fade-transform" mode="out-in">
        <component :is="Component" :key="name" />
      </transition>
    </router-view>
  </el-main>
</template>

<style lang="scss" scoped>
.app-main {
  overflow: hidden;
  box-sizing: content-box;
  padding: 2rem;
  position: relative;
}
</style>
