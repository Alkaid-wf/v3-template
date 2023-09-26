<script lang="ts" setup>
defineProps<{ span?: number; offset?: number }>();
const attr = useAttrs();
</script>

<template>
  <el-col :span="span || -1" :xl="span || 6" :lg="span || 8" :sm="span || 12" :xs="span || 24">
    <el-form-item v-bind="attr">
      <slot />
    </el-form-item>
  </el-col>
</template>

<style lang="scss" scoped>
.el-form-item :deep(.el-form-item__content) > div[class^='el-'] {
  width: 100%;
}
</style>
