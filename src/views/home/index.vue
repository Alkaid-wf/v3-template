<template>
  <div class="home">
    <SvgIcon name="launch" size="120px" />
    <h1 class="mt-2.5rem">Welcome</h1>
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding-top: 25vh;
  position: absolute;
  left: 0;
  right: 0;
  text-align: center;
  color: $primary;
  &.fade-transform-leave-to {
    transform: translate(0, -20vh);
  }
}
</style>
