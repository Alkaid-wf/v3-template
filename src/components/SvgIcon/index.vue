<script lang="ts" setup>
interface Props {
  name: string;
  size?: string;
}
withDefaults(defineProps<Props>(), { size: '1.2em' });
</script>

<template>
  <svg aria-hidden="true" :class="['svg-icon', name]" :style="{ width: size, height: size }">
    <use :xlink:href="`#icon-${name}`" />
  </svg>
</template>
