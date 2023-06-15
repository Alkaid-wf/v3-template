// 组件属性预设

/**
 * 表单校验规则预设
 * @param message 通过判断是否包含 '请选择' ，而选择触发方式
 * @returns '{ required, message, trigger }'
 */
export const rulePreset = (message: string) => {
  const trigger = message.includes('请输入') ? 'blur' : 'change';
  return { required: true, message, trigger };
};

// input
export const inputPreset = {
  placeholder: '请输入',
  clearable: true,
  'show-word-limit': !isMobile
};

// input-number
export const inputNumPreset = {
  placeholder: '请输入',
  min: 0,
  'controls-position': 'right'
};

// select
export const selectPreset = {
  clearable: true,
  filterable: true,
  placeholder: '请选择',
  'collapse-tags': true,
  'max-collapse-tags': 3,
  'collapse-tags-tooltip': true,
  'default-first-option': true
};

type TimeRangeType = 'year' | 'month' | 'date' | 'datetime' | 'week' | 'datetimerange' | 'daterange';

// dateTimeRange
export const timeRangePreset = {
  type: 'datetimerange' as TimeRangeType,
  'range-separator': '至',
  'start-placeholder': '开始时间',
  'end-placeholder': '结束时间',
  format: 'YYYY-MM-DD HH:mm',
  'value-format': 'YYYY-MM-DD HH:mm:ss',
  'default-time': [new Date(0, 0, 0, 0, 0, 0), new Date(0, 0, 0, 23, 59, 59)]
};

type placementType =
  | 'top'
  | 'top-start'
  | 'top-end'
  | 'bottom'
  | 'bottom-start'
  | 'bottom-end'
  | 'left'
  | 'left-start'
  | 'left-end'
  | 'right'
  | 'right-start'
  | 'right-end';

type triggerType = 'click' | 'focus' | 'hover' | 'contextmenu';

// popover
export const popoverPreset = {
  offset: 5,
  hideAfter: 100,
  placement: 'bottom-start' as placementType,
  showArrow: false,
  trigger: 'click' as triggerType
};

// form
export const formPreset = {
  'status-icon': !isMobile,
  'scroll-to-error': true,
  'scroll-into-view-options': { behavior: 'smooth', block: 'center' }
};

// image
export const imagePreset = {
  fit: 'contain' as any,
  // lazy: true,
  'hide-on-click-modal': true,
  'preview-teleported': true
};
