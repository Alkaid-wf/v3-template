<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';

import useUserStore from '@/stores/user';

const userStore = useUserStore();

// 监听theme改变，调整主题色
watchEffect(() => changeTheme(userStore.theme));
</script>

<template>
  <el-config-provider :button="{ autoInsertSpace: true }" size="large" :locale="zhCn">
    <Suspense>
      <router-view />
    </Suspense>
  </el-config-provider>
</template>
