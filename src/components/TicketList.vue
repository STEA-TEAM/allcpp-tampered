<template>
  <q-list
    v-show="options.length > 0"
    bordered
    :dense="options.length > 3"
    separator
  >
    <q-item
      v-for="(ticket, index) in options"
      :key="index"
      v-ripple
      :active="selectedTicket === ticket"
      active-class="bg-primary text-black"
      clickable
      @click="selectedTicket = ticket"
    >
      <q-item-section>
        <q-item-label>{{ ticket.name }}</q-item-label>
        <q-item-label caption>
          限购{{ ticket.limit }}张，剩余{{ ticket.remain }}张
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>{{ ticket.price }}￥</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { Ticket } from '@/components/models';

export interface Props {
  modelValue: Ticket;
  options: Ticket[];
}

const props = defineProps<Props>();

const emit = defineEmits(['update:modelValue']);

const selectedTicket = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
</script>

<style scoped></style>
