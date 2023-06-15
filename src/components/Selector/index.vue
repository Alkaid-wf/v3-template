<script lang="ts" setup>
import { isString } from 'lodash';
import type { Dict } from '@/stores/types';

interface Props {
  modelValue: any;
  dict: string | Dict[];
  valueName?: string;
  labelName?: string;
  showName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  valueName: 'id',
  labelName: 'name',
  showName: ''
});

// 传递属性，事件
const attr = useAttrs();
const bind: Record<string, any> = { ...selectPreset, ...attr };

// v-model 响应式部分
const emit = defineEmits(['update:modelValue']);
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// 字典部分，从store取 或 直接使用props.dict数组
const options = computed(() => {
  const list = isString(props.dict) ? getDict(props.dict) : props.dict;
  return list.filter((item) => (item[props.showName] === undefined ? true : item[props.showName]));
});
</script>

<template>
  <el-select v-if="!isMobile" v-model="value" v-bind="bind">
    <el-option
      v-for="(item, idx) in options"
      :key="idx"
      :label="item[labelName] === '' ? '未输入' : item[labelName]"
      :value="item[valueName]"
      :disabled="item[labelName] === ''"
    >
      <span v-if="item[labelName] === ''" class="infoColor"> 未输入 </span>
    </el-option>
  </el-select>

  <Picker v-else v-model="value" :dict="options" v-bind="bind" />
</template>
