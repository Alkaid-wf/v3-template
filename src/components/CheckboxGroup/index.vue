<script lang="ts" setup>
import type { Dict } from '@/stores/types';

interface Props {
  modelValue: any;
  dict: string | Dict[];
  valueName?: string;
  labelName?: string;
}

const props = withDefaults(defineProps<Props>(), {
  valueName: 'id',
  labelName: 'name'
});

// 传递属性，事件
const attr = useAttrs();

// v-model 响应式部分
const emit = defineEmits(['update:modelValue']);
const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  }
});

// 字典部分，从store取 或 直接使用props.dict数组
const options = computed(() => (typeof props.dict === 'string' ? getDict(props.dict) : props.dict));
</script>

<template>
  <el-checkbox-group v-model="value" v-bind="{ attr }">
    <el-checkbox v-for="item in options" :key="item[props.valueName]" :label="item[props.valueName]">
      {{ item[props.labelName || props.valueName] }}
    </el-checkbox>
  </el-checkbox-group>
</template>
