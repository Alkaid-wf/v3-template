<template>
  <el-container class="layout" direction="vertical">
    <Header />

    <el-container>
      <Aside />

      <app-main />
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
.layout.el-container {
  height: 100%;
  .el-container {
    min-height: calc(100% - 4rem);
    width: 100%;
  }
}
</style>
