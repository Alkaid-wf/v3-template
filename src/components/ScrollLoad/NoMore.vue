<script lang="ts" setup>
interface Props {
  show: boolean;
  loading: boolean;
  direction?: 'horizontal' | 'vertical';
}

withDefaults(defineProps<Props>(), { direction: 'horizontal' });
</script>

<template>
  <transition name="el-zoom-in-top">
    <div v-if="show || loading" v-loading="loading" :class="`noMore ${direction}`">
      <span>{{ loading ? '' : '没有更多了' }}</span>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.noMore {
  display: flex;
  justify-content: space-between;
  align-items: center;
  span {
    font-size: 0.85em;
    letter-spacing: 0.2rem;
    flex: none;
    padding: 1.6em;
    color: var(--el-text-color-disabled);
  }
  :deep(.el-loading-mask) {
    background-color: transparent;
  }
  &::before,
  &::after {
    content: '';
    width: calc(50% - 4rem);
    height: 0.1rem;
    background-color: var(--el-border-color);
  }
  &.vertical {
    width: 4rem;
    writing-mode: vertical-lr;
    &::before,
    &::after {
      content: '';
      width: 0.1rem;
      height: calc(50% - 4rem);
    }
  }
}
</style>
