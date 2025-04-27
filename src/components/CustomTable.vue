<template>
  <n-card>
    <n-data-table
      :columns="computedColumns"
      :data="data"
      :pagination="pagination"
      :loading="loading"
      :row-key="(row) => row.id"
      striped
      @update:sorter="handleSorter"
      @update:filters="handleFilters"
      v-bind="$attrs"
    >
      <!-- 支持插槽 -->
      <template v-for="(_, slotName) in $slots" #[slotName]>
        <slot :name="slotName" />
      </template>
    </n-data-table>
  </n-card>
</template>

<script setup lang="jsx">
import { computed } from 'vue'
import { NDataTable, NInput, NButton, NSelect } from 'naive-ui'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  pagination: {
    type: Object,
    required: true,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  filterValues: {
    type: Object,
    default: () => ({}),
  },
})

const emit = defineEmits(['update:sorter', 'update:filters'])

const handleSorter = ({ columnKey, order }) => {
  const sortKey = order ? columnKey : ''
  const sortOrder = order
  emit('update:sorter', { sortKey, sortOrder })
}

const handleFilters = (filters) => {
  emit('update:filters', filters)
}

const createFilterMenu =
  (key, placeholder) =>
  ({ hide }) =>
    (
      <div style={{ padding: '8px', minWidth: '150px' }}>
        <NInput
          value={props.filterValues[key]}
          placeholder={placeholder}
          clearable
          onUpdateValue={(value) => {
            const newFilters = { ...props.filterValues, [key]: value || null }
            handleFilters(newFilters)
          }}
        />
        <NButton
          size="small"
          style={{ marginTop: '8px', width: '100%' }}
          onClick={() => hide()}
        >
          关闭
        </NButton>
      </div>
    )

const createSelectFilterMenu =
  (options, key, placeholder) =>
  ({ hide }) =>
    (
      <div style={{ padding: '8px', minWidth: '150px' }}>
        <NSelect
          value={props.filterValues[key]}
          options={options}
          clearable
          onUpdateValue={(value) => {
            const newFilters = { ...props.filterValues, [key]: value || null }
            handleFilters(newFilters)
          }}
          placeholder={placeholder}
        />
        <NButton
          size="small"
          style={{ marginTop: '8px', width: '100%' }}
          onClick={() => hide()}
        >
          关闭
        </NButton>
      </div>
    )

const computedColumns = computed(() => {
  return props.columns.map((col) => {
    const {
      title,
      key,
      sortable = true,
      filterable = true,
      placeholder,
      filterOptions,
      ...rest
    } = col
    return {
      title,
      key,
      sorter: sortable,
      filter: filterable,
      filterOptionValue: props.filterValues[key],
      renderFilterMenu:
        filterable && filterOptions
          ? createSelectFilterMenu(
              filterOptions,
              key,
              placeholder || `搜索 ${title}`
            )
          : filterable
          ? createFilterMenu(key, placeholder || `搜索 ${title}`)
          : undefined,
      ...rest,
    }
  })
})
</script>

<style scoped></style>
