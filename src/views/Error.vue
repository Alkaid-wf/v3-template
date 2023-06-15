<script lang="ts" setup>
const is401 = useRoute().path === '/401';
const message = is401
  ? '对不起，您没有访问权限。<br/>请确认您的权限范围，不要进行非法操作！'
  : '对不起，您正在寻找的页面不存在。<br/>尝试检查URL的错误，然后按浏览器上的刷新按钮或尝试在我们的应用程序中找到其他内容。';
</script>

<template>
  <div class="error-page">
    <h1>{{ is401 ? 401 : 404 }} 错误!</h1>
    <el-empty>
      <template #description>
        <p v-html="message" />
      </template>
      <router-link to="/" class="el-button el-button--primary el-button--large"> 返回首页 </router-link>
    </el-empty>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-color: rgba($color: #fff, $alpha: 0.4);
  color: $primary;
  :deep(.el-empty__image) {
    width: 24rem;
  }
  h1 {
    font-size: 5rem;
    margin-top: -10%;
  }
}
</style>
