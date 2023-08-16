<script lang="ts" setup>
import useUserStore from '@/stores/user';

const userStore = useUserStore();

const colorRef = ref();

const showColorPicker = () => {
  setTimeout(() => colorRef.value.show(), 100);
};

const logout = () => {
  ElMessageBox.confirm('确定注销并退出系统吗？', '系统提示', {
    type: 'warning'
  }).then(() => userStore.logout());
};
</script>

<template>
  <el-dropdown trigger="click" popper-class="right-menu-popper">
    <div class="info">
      <span class="i-tabler-user-check" />
      &nbsp; {{ userStore.profile?.name }}
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item class="theme" @click="showColorPicker">
          <span>主题色</span>
          <div class="color-block" :style="{ backgroundColor: userStore.theme }" />

          <teleport to="#app">
            <el-color-picker
              ref="colorRef"
              popper-class="right-menu-popper__color"
              :model-value="userStore.theme"
              @change="userStore.setTheme"
            />
          </teleport>
        </el-dropdown-item>

        <el-dropdown-item @click="logout">
          <span>退出登录</span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
.info {
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  span {
    font-size: 2rem;
  }
}
</style>

<style lang="scss">
.right-menu-popper {
  width: 14rem;
  .el-popper__arrow {
    display: none;
  }
  .theme {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .color-block {
      width: 2rem;
      height: 2rem;
      border-radius: 0.5rem;
    }
  }
}
.right-menu-popper__color {
  inset: 4.2rem 0.5rem auto auto !important;
}
</style>
