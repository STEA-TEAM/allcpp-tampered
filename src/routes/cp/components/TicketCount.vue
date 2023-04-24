<template>
  <q-input
    v-if="!selected || !selected['validate']"
    :disable="!selected"
    label="购票数量"
    outlined
    mask="###"
    v-model.number="ticketCount"
  >
    <template v-slot:prepend>
      <q-btn
        :disable="ticketCount <= 1"
        icon="remove"
        flat
        round
        @click="ticketCount--"
      />
    </template>
    <template v-slot:append>
      <q-btn
        :disable="ticketCount >= 999"
        icon="add"
        flat
        round
        @click="ticketCount++"
      />
    </template>
  </q-input>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  selected: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue']);

const ticketCount = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<style scoped></style>
