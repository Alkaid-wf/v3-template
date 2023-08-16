<script lang="ts" setup>
import { routes } from '@/router';

const { path } = toRefs(useRoute());
</script>

<template>
  <el-scrollbar>
    <el-menu mode="vertical" :default-active="path" :ellipsis="false" class="layout__menu">
      <menu-item v-for="item in routes" :key="item.path" :item="item" :base-path="item.path" />
    </el-menu>
  </el-scrollbar>
</template>

<style lang="scss">
.layout__menu {
  border: unset;
  .el-sub-menu {
    > .el-sub-menu__title {
      padding-left: 2.5rem !important;
      font-size: 1.6rem;
    }
    &.is-root > .el-sub-menu__title {
      background-color: unset;
      font-size: 2.2rem;
      font-weight: bold;
      cursor: default;
      pointer-events: none;
      color: var(--el-text-color-primary);
      &:hover {
        background-color: unset;
      }
      .el-icon {
        display: none;
      }
    }
  }
  .el-menu-item {
    padding-left: 6rem !important;
    &.is-active {
      color: $primary;
      background-color: $primaryLight;
      border-right: 4px solid $primary;
    }
  }
}
</style>
