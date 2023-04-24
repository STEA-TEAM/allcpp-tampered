<template>
  <q-list bordered separator>
    <q-item v-if="ticketTypeList.length === 0">
      <q-item-section>
        <q-item-label>暂无票种数据</q-item-label>
        <q-item-label caption> 加载中……</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-spinner color="grey" size="24px" />
      </q-item-section>
    </q-item>
    <q-item
      v-for="(ticketType, index) in ticketTypeList"
      :key="index"
      :active="ticketType.id === selectedTicketId"
      active-class="bg-primary text-black"
      clickable
      v-ripple
      @click="selectedTicketId = ticketType.id"
    >
      <q-item-section>
        <q-item-label>{{ ticketType.name }}</q-item-label>
        <q-item-label caption>
          限购{{ ticketType.limit }}张，剩余{{ ticketType.remain }}张
        </q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-item-label caption>{{ ticketType.price }}￥</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { computed, reactive } from 'vue';

const props = defineProps({
  modelValue: {
    type: Number,
    required: true,
  },
  needValidate: {
    type: Boolean,
    required: true,
  },
});

const emit = defineEmits(['update:modelValue', 'update:needValidate']);

const ticketTypeList = reactive([]);
const selectedTicketId = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
});
const validatePurchaser = computed({
  get: () => props.needValidate,
  set: (value) => emit('update:needValidate', value),
});

const eventMainId = Object.fromEntries(
  location.hash
    .split('?')[1]
    .split('&')
    .map((pair) => pair.split('='))
).event;
GM_xmlhttpRequest({
  fetch: true,
  method: 'GET',
  responseType: 'json',
  url: `https://www.allcpp.cn/allcpp/ticket/getTicketTypeList.do?eventMainId=${eventMainId}`,
  onload: function (res) {
    res.response['ticketTypeList'].forEach((ticketType) => {
      validatePurchaser.value = ticketType['realnameAuth'];
      ticketTypeList.push({
        id: ticketType['id'],
        name: ticketType['ticketName'],
        limit: ticketType['purchaseNum'],
        price: (ticketType['ticketPrice'] / 100).toFixed(2),
        remain: ticketType['remainderNum'],
      });
    });
  },
  onerror: function (response) {
    console.log(response);
  },
});
</script>

<style scoped></style>
