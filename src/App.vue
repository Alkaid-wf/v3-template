<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
</script>

<template>
  <el-config-provider :button="{ autoInsertSpace: true }" size="large" :locale="zhCn">
    <Suspense>
      <router-view />
    </Suspense>
  </el-config-provider>
</template>
