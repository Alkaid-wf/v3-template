<script lang="ts" setup>
interface Props {
  content?: string;
  rows?: number;
  tag?: string;
  className?: string;
}

withDefaults(defineProps<Props>(), {
  content: '',
  rows: 1,
  tag: 'span',
  className: ''
});

// 传递属性，事件
const attr = useAttrs();

const isMobile = inject('isMobile');

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
    :content="content"
    :disabled="disabled"
    placement="top"
    :trigger="isMobile ? 'click' : 'hover'"
    v-bind="attr"
  >
    <component :is="tag" ref="textRef" :class="`tooltip ${className}`">{{ content }}</component>
  </el-tooltip>
</template>

<style lang="scss" scoped>
.tooltip {
  @include multilineEllipsis(v-bind(rows));
}
</style>
