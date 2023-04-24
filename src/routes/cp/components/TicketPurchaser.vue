<template>
  <q-select
    v-if="selected && selected['validate']"
    counter
    dropdown-icon="expand_less"
    label="选择购票人"
    :max-values="selected['limit']"
    menu-anchor="top middle"
    multiple
    :options="options"
    outlined
    menu-self="bottom middle"
    stack-label
    use-chips
    v-model="selectedPurchasers"
  />
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array,
    required: true,
  },
  options: {
    type: Array,
    required: true,
  },
  selected: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedPurchasers = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<style scoped></style>
