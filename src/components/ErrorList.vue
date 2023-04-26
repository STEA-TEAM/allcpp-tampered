<template>
  <q-list bordered separator>
    <q-item v-if="Object.keys(modelValue).length === 0">
      <q-item-section>
        <q-item-label class="text-grey text-italic" lines="1">
          暂无请求错误
        </q-item-label>
      </q-item-section>
    </q-item>
    <q-item v-for="(count, name) in modelValue" :key="name">
      <q-item-section>
        <q-item-label lines="2">{{ name }}</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>{{ count }}次</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
});
</script>

<style scoped></style>