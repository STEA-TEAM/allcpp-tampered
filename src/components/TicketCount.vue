<template>
  <q-input
    v-if="!selected || !selected.validate"
    v-model.number="ticketCount"
    :disable="!selected"
    label="购票数量"
    mask="###"
    outlined
  >
    <template v-slot:prepend>
      <q-btn
        :disable="ticketCount <= 1"
        flat
        icon="remove"
        round
        @click="ticketCount--"
      />
    </template>
    <template v-slot:append>
      <q-btn
        :disable="ticketCount >= 999"
        flat
        icon="add"
        round
        @click="ticketCount++"
      />
    </template>
  </q-input>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { Ticket } from '@/components/models';

export interface Props {
  modelValue: number;
  selected?: Ticket;
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const ticketCount = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<style scoped></style>