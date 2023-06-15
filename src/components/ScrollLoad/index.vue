<script lang="ts" setup>
import type { ResArr } from '@/api/types';

interface Query {
  page: number;
  per_page: number;
  [key: string]: any;
}

interface Props {
  query: Query;
  total: number;
  list: Record<string, any>[];
  scrollLoad: (query?: any) => Promise<ResArr>;
}
const props = defineProps<Props>();

const loading = ref(false);

// v-model 响应式部分
const emit = defineEmits(['update:query', 'update:total', 'update:list']);
// 请求参数
const query = computed({
  get: () => props.query,
  set: (value) => emit('update:query', value)
});
// 数据总量
const total = computed({
  get: () => props.total,
  set: (value) => emit('update:total', value)
});
// 数据列表
const list = computed({
  get: () => props.list,
  set: (value) => emit('update:list', value)
});

// 滚动加载
const load = async () => {
  // 加载条件
  if (total.value <= list.value.length || loading.value) return false;

  loading.value = true;

  query.value.page += 1;
  const res = await props.scrollLoad(query.value);
  resHandle(res, '', () => {
    list.value = [...list.value, ...(res.data as any[])];
    total.value = res.total as number;
  });

  loading.value = false;
};
</script>

<template>
  <div v-infinite-scroll="load" :infinite-scroll-immediate="false" class="scrollLoad">
    <slot />

    <NoMore :show="total === list.length && query.page > 1" :loading="loading" />
  </div>
</template>
