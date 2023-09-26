<script lang="ts" setup>
import type { Page } from '@/api/types';
import { ElButton, type FormInstance } from 'element-plus';
import Delete from '~icons/tabler/trash';

interface QueryParams extends Page {
  query_1: string;
  query_2: string;
  query_3: number;
}

interface TableData {
  id: number;
  field_1: string;
  field_2: string;
  field_3: string;
  field_4: string;
}

const data = reactive({
  loading: true,
  formRef: {} as FormInstance,
  query: {
    page: 1,
    per_page: 15
  } as QueryParams,
  total: 0,
  tableData: [] as TableData[]
});
const { loading, formRef, query, total, tableData } = toRefs(data);

// 查询
const handleQuery = () => {
  loading.value = true;

  // TODO
  tableData.value = Array.from({ length: 15 }, (x, i) => ({
    id: i + 1,
    field_1: 'field1',
    field_2: 'field2',
    field_3: 'field3',
    field_4: 'field4'
  }));
  total.value = 22;

  loading.value = false;
};

// 重置
const resetQuery = () => {
  formRef.value.resetFields();
  handleQuery();
};

/** 删除 */
const delData = (id: number) => {
  ElMessage.info(`删除 ${id}`);
};

handleQuery();
</script>

<template>
  <div class="example__page1 paginationToBottom">
    <el-form :model="query" ref="formRef" label-width="80px">
      <el-row :gutter="20">
        <FormItem label="查询一" prop="query_1">
          <el-input v-model="query.query_1" v-bind="inputPreset" @keyup.enter="handleQuery" />
        </FormItem>

        <FormItem label="查询2" prop="query_2">
          <el-input v-model="query.query_2" v-bind="inputPreset" @keyup.enter="handleQuery" />
        </FormItem>

        <FormItem label="查询3" prop="query_3">
          <Selector
            v-model="query.query_3"
            :dict="[
              { id: 1, name: '选项一' },
              { id: 2, name: '选项二' }
            ]"
          />
        </FormItem>

        <FormBtn @search="handleQuery" @reset="resetQuery" />
      </el-row>
    </el-form>

    <el-table :data="tableData">
      <el-table-column label="#" prop="id" width="100" />
      <el-table-column v-for="i in 4" :key="i" :label="`Field ${i}`" :prop="`field_${i}`" />
      <el-table-column label="操作" width="150">
        <template #default="{ row }">
          <Tooltip
            :tag="ElButton"
            tip="删除"
            :props="{
              icon: Delete,
              class: 'icon-button',
              onclick: () => delData(row.id)
            }"
          />
        </template>
      </el-table-column>
    </el-table>

    <Pagination v-model:page="query.page" v-model:size="query.per_page" :total="total" @pagination="handleQuery" />
  </div>
</template>
