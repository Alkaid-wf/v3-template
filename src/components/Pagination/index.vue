<script lang="ts" setup>
import { omit } from 'lodash';

interface Props {
  page: number;
  size: number;
  total: number;
  pageSizes?: number[];
  pagerCount?: number;
  background?: boolean;
  layout?: string;
}
const props = withDefaults(defineProps<Props>(), {
  pageSizes: () => [10, 15, 30, 50],
  pagerCount: 5,
  background: true,
  layout: 'total, sizes, prev, pager, next'
});

const attr = useAttrs();

const emit = defineEmits(['update:page', 'update:size', 'pagination']);

const currentPage = computed({
  get: () => props.page,
  set: (value) => emit('update:page', value)
});

const pageSize = computed({
  get: () => props.size,
  set: (value) => emit('update:size', value)
});

watch(
  () => [props.page, props.size],
  () => emit('pagination')
);
</script>

<template>
  <el-pagination
    v-if="total"
    v-model:currentPage="currentPage"
    v-model:page-size="pageSize"
    v-bind="{ ...omit(props, ['page', 'size']), ...attr }"
  />
</template>

<style lang="scss" scoped></style>
