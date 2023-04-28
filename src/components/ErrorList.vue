<template>
  <q-list bordered separator>
    <q-item v-if="props.modelValue.size === 0">
      <q-item-section>
        <q-item-label class="text-grey text-italic" lines="1">
          暂无请求错误
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-for="[key, value] in props.modelValue" :key="key">
      <q-item-section>
        <q-item-label lines="2">{{ key }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>{{ value }}次</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
export interface Props {
  modelValue: Map<string, number>;
}

const props = defineProps<Props>();
</script>

<style scoped></style>
