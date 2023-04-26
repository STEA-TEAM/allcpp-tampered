<template>
  <q-select
    v-if="selected && selected.validate"
    v-model="selectedPurchasers"
    :max-values="selected?.limit || 0"
    :options="options"
    counter
    dropdown-icon="expand_less"
    label="选择购票人"
    menu-anchor="top middle"
    menu-self="bottom middle"
    multiple
    outlined
    stack-label
    use-chips
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Purchaser, Ticket } from '@/components/models';

export interface Props {
  modelValue: Purchaser[];
  options: Purchaser[];
  selected?: Ticket;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const selectedPurchasers = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<style scoped></style>