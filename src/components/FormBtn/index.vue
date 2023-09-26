<script lang="ts" async setup>
import Search from '~icons/tabler/search';
import Refresh from '~icons/tabler/refresh';

withDefaults(defineProps<{ span?: number; show?: boolean; justSearch?: boolean }>(), {
  show: true
});

const emit = defineEmits(['search', 'reset']);
await nextTick();
await nextTick();

// 兄弟元素数量
const formItemCount = computed(() => {
  const count = getCurrentInstance()?.parent?.proxy?.$el?.childElementCount;
  return count || 0;
});

// 布局方法
const layout = (span: number) => {
  const mold = formItemCount.value % (24 / span); // 取模（最后一行有几个表单元素）
  return 24 - mold * span;
};
</script>

<template>
  <el-col :xl="span || layout(6)" :lg="span || layout(8)" :sm="span || layout(12)" :xs="span || layout(24)">
    <el-form-item label-width="0">
      <template v-if="show">
        <el-button type="primary" :icon="Search" @click="emit('search')">查询</el-button>
        <el-button v-if="!justSearch" :icon="Refresh" @click="emit('reset')">重置</el-button>
      </template>

      <slot />
    </el-form-item>
  </el-col>
</template>

<style lang="scss" scoped>
.el-col :deep(.el-form-item__content) {
  justify-content: flex-end;
}
@media only screen and (max-width: 767px) {
  .el-col-xs-24 :deep(.el-form-item__content) {
    justify-content: center;
  }
}
</style>
