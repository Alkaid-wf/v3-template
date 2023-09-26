<script lang="ts" setup>
import { isEmpty } from 'lodash';
import type { Component } from 'vue';

interface Props {
  tip?: string;
  content?: string;
  rows?: number;
  tag?: string | Component;
  props?: Record<string, any>;
}

withDefaults(defineProps<Props>(), {
  tip: '',
  content: '',
  rows: 1,
  tag: 'span',
  props: () => ({})
});

// 传递属性，事件
const attr = useAttrs();

const textRef = ref();

const disabled = ref(true);

onMounted(() => {
  watch(
    textRef,
    (el: HTMLInputElement) => {
      nextTick(() => {
        // 判断文本溢出情况，未溢出则禁用tooltip
        const width = el.scrollWidth - el.clientWidth;
        const height = el.scrollHeight - el.clientHeight;
        disabled.value = !(width || height);
      });
    },
    { immediate: true }
  );
});
</script>

<template>
  <el-tooltip
    :content="tip || content"
    :disabled="!isEmpty(content) && disabled"
    placement="top"
    :trigger="isMobile ? 'click' : 'hover'"
    v-bind="attr"
  >
    <component :is="tag" ref="textRef" class="tooltip" v-bind="props">
      <slot>{{ content }}</slot>
    </component>
  </el-tooltip>
</template>

<style lang="scss" scoped>
.tooltip {
  @include multilineEllipsis(v-bind(rows));
}
</style>
