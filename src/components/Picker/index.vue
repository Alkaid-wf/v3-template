<script lang="ts" setup>
import { clamp, debounce, isString, throttle } from 'lodash';
import type { Dict } from '@/stores/types';

interface Props {
  modelValue: any;
  visible?: boolean;
  dict: string | Dict[];
  valueName?: string;
  labelName?: string;
  showName?: string;
  label?: string;
  hidden?: boolean;
  isClear?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  valueName: 'id',
  labelName: 'name',
  showName: '',
  label: ''
});

// 传递属性，事件
const attr = useAttrs();

// v-model 响应式部分
const emit = defineEmits(['update:modelValue', 'update:visible', 'change', 'close']);
const value = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

// 字典部分，从store取 或 直接使用props.dict数组
const options = computed(() => {
  const list = isString(props.dict) ? getDict(props.dict) : props.dict;
  return list.filter((item) => (item[props.showName] === undefined ? true : item[props.showName]));
});

const data = reactive({
  optionRef: null as any,
  show: false,
  isMove: false,
  start: 0,
  initTransl: 0,
  translate: 0
});
const { optionRef, show, isMove, start, initTransl, translate } = toRefs(data);

const rem = window.getComputedStyle(document.documentElement)['fontSize'];
// 元素高度
const itemHeight = Number.parseFloat(rem) * 4;

/** 打开选择器 */
const open = () => {
  show.value = true;
  nextTick(() => {
    // 默认值
    if (value.value) {
      const index = options.value.findIndex((item) => item[props.valueName] === value.value);
      translate.value = -Number(index) * itemHeight;
    } else translate.value = 0;
  });
};

/** 确定按钮 */
const submit = () => {
  const index = Math.abs(translate.value / itemHeight);
  value.value = options.value[index]?.[props.valueName];

  emit('change');
  show.value = false;
};

/** 取消按钮 */
const close = () => {
  if (props.isClear) value.value = undefined;
  emit('close');
  show.value = false;
};

// 触摸事件处理
/** 开始 */
const touchstart = (e: any) => {
  // 初始位置
  start.value = e.touches[0].pageY;
  initTransl.value = Number.parseInt(optionRef.value.style.transform.split(',')[1]);
};

/** 移动 */
const touchmove = throttle((e) => {
  optionRef.value.style.transition = '';
  isMove.value = true;
  // 滑动时的位置
  const current = e.touches[0].pageY;
  // 通过差值计算滚动位置
  translate.value = current - start.value + initTransl.value;
}, 10);

/** 结束 */
const touchend = debounce((e) => {
  // 滑动操作
  if (isMove.value) {
    isMove.value = false;

    // 去余，确保滚动至中心位置
    const len = Math.round(translate.value / itemHeight) * itemHeight;
    // 取夹值
    translate.value = clamp(len, -(options.value.length - 1) * itemHeight, 0);
  }
  // 点击操作
  else {
    optionRef.value.style.transition = `transform .1s ease-in-out`;
    const index = e.target.getAttribute('index');
    translate.value = -Number(index) * itemHeight;
  }
}, 100);

/** 滚动选项列表 */
watchEffect(() => {
  if (optionRef.value) {
    optionRef.value.style.transform = `translate3d(0, ${translate.value}px, 0)`;
  }
});

// 同步visible状态，可通过prop打开选择器
watch(
  () => props.visible,
  (val) => (show.value = val)
);
watch(
  () => show.value,
  (val) => emit('update:visible', val)
);
</script>

<template>
  <div class="picker">
    <div v-if="!hidden" class="el-input__inner" @click="open">
      <span class="truncate" :placeholder="attr.placeholder as string || '请选择'">
        {{ dictParse(options, value) }}
      </span>
      <span class="i-tabler-caret-down" :class="{ open: show }" />
    </div>

    <el-drawer
      v-model="show"
      direction="btt"
      class="picker-drawer"
      :show-close="false"
      :style="`--itemHeight: ${itemHeight}px`"
    >
      <template #header>
        <el-button link @click="close">
          {{ isClear ? '清除' : '取消' }}
        </el-button>
        <h4>{{ label }}</h4>
        <el-button type="primary" link @click="submit"> 确定 </el-button>
      </template>

      <div ref="optionRef" class="item-wrapper" @touchstart="touchstart" @touchmove="touchmove" @touchend="touchend">
        <div v-for="(item, i) in options" :key="i" :index="i" class="truncate">
          {{ item[labelName] }}
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<style lang="scss">
.picker {
  width: 100%;
  .el-input__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .truncate:empty::before {
      content: attr(placeholder);
      color: var(--el-text-color-placeholder);
    }
    .i-tabler-caret-down {
      transition: transform 0.2s ease-in-out;
      border: 0.1rem solid #fff;
      font-size: 1.2rem;
      &.open {
        transform: rotate(-180deg);
      }
    }
  }
}
.picker-drawer {
  height: 40rem !important;
  .el-drawer__body {
    position: relative;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      height: 4rem;
      width: 100%;
      border-top: $border;
      border-bottom: $border;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      box-sizing: border-box;
    }
    &::after {
      content: '';
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(180deg, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6)),
        linear-gradient(0deg, hsla(0, 0%, 100%, 0.95), hsla(0, 0%, 100%, 0.6));
      background-position: top, bottom;
      background-size: 100% 43.7%;
      background-repeat: no-repeat;
      pointer-events: none;
    }
    .item-wrapper {
      display: flex;
      flex-direction: column;
      will-change: transform;
      padding-top: 15.5rem;
      div {
        line-height: var(--itemHeight);
        width: 100%;
        text-align: center;
        flex: none;
      }
    }
  }
}
</style>
