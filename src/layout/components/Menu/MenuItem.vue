<script lang="ts" name="MenuItem" setup>
import type { RouteRecordRaw } from 'vue-router';

const props = defineProps<{ item: RouteRecordRaw; basePath: string }>();

const justOne = props.item.children?.length === 1;
</script>

<template>
  <el-sub-menu
    v-if="item?.children?.length && !item?.hidden && !justOne"
    popper-class="layout__menu-popper"
    :index="String(item.name)"
    :class="{ 'is-root': item.meta?.isRoot }"
    :popper-offset="15"
  >
    <template v-if="item.meta" #title>
      <component :is="item.meta?.icon" class="mb-0.125em mr-1.5rem" />
      <span class="menu-title">{{ item.meta?.title }}</span>
    </template>

    <menu-item
      v-for="child in item.children"
      :key="child.path"
      :item="child"
      :base-path="list2str([basePath, child.path], '/')"
    />
  </el-sub-menu>

  <router-link v-else-if="!item?.hidden" :to="basePath">
    <el-menu-item :index="basePath">
      <component :is="item.meta?.icon" class="mb-0.125em mr-1.5rem" />
      <span class="menu-title">{{ item?.meta?.title || '' }}</span>
    </el-menu-item>
  </router-link>
</template>

<style lang="scss" scoped>
.el-sub-menu {
  > :deep(.el-sub-menu__title):hover {
    background-color: $primaryLight;
  }
  &.is-active > :deep(.el-sub-menu__title) {
    color: $primary;
  }
}
.el-menu-item {
  color: #545860;
  transition: all 0.1s ease-in-out;
  &.is-active {
    color: $primary;
    background-color: $primaryLight;
  }
}
</style>

<style lang="scss">
.layout__menu-popper {
  .el-sub-menu__title {
    padding-left: 1.5rem !important;
    > svg {
      display: none;
    }
  }
  .el-menu-item {
    padding-left: 1.5rem !important;
    &.is-active {
      color: $primary;
      background-color: $primaryLight;
    }
  }
}
</style>
