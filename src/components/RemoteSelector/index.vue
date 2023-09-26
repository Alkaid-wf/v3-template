<!--  远程搜索选择器 -->
<script lang="ts" setup>
import { isEmpty } from 'lodash';
import type { Dict } from '@/stores/types';

interface Props {
  modelValue: any;
  fun: Function;
  valueName?: string;
  labelName?: string;
  infoKey?: string; // 提示信息的key
  initKey?: string; // 初始化查询的key（回显数据）
  params?: Record<string, any>; // 额外参数
}

const props = withDefaults(defineProps<Props>(), {
  valueName: 'id',
  labelName: 'name',
  initKey: ({ valueName }) => String(valueName),
  params: () => ({})
});

// 传递属性，事件
const attr = useAttrs();

// v-model 响应式部分
const emit = defineEmits(['update:modelValue', 'change']);
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const data = ref<Dict[]>([]);

// 下拉弹窗loading
const loading = ref(true);
// 初始化loading
const initLoading = ref(true);

/** 获取远程数据 */
const remoteMethod = async (query?: string, val?: any) => {
  loading.value = true;

  const params = {
    page: 1,
    per_page: 20,
    [props.labelName]: query,
    [props.initKey]: val || undefined,
    ...props.params
  };

  data.value = resHandle(await props.fun(params), '');

  loading.value = false;
};

// 初始化数据列表
const init = async () => {
  initLoading.value = true;

  await remoteMethod(undefined, value.value);

  initLoading.value = false;
};

/** 数据改变时 */
const change = (val: any) => {
  const item = data.value.find((item) => item.id === val);
  emit('change', item as Dict);
};

// 首次渲染、值清空时 初始化
watch(
  value,
  (newVal, oldVal) => {
    if (isEmpty(newVal) || oldVal === undefined) init();
  },
  { immediate: true }
);

defineExpose({ init });
</script>

<template>
  <el-select
    v-model="value"
    remote
    remote-show-suffix
    collapse-tags
    v-loading="initLoading"
    :loading="loading"
    :remote-method="remoteMethod"
    v-bind="{ ...selectPreset, placeholder: '请输入', ...attr }"
    @change="change"
  >
    <el-option
      v-for="item in data"
      :key="item[valueName]"
      :label="item[labelName]"
      :value="item[valueName]"
      class="flex justify-between"
    >
      <span>{{ item[labelName] }}</span>
      <span v-if="infoKey" class="mr-1rem infoColor">{{ item[infoKey] }}</span>
    </el-option>
  </el-select>
</template>

<style lang="scss" scoped>
.el-select {
  :deep(.el-select__tags) {
    max-width: calc(100% - 55px) !important;
  }
}
</style>
