<template>
  <q-list>
    <q-item v-for="ticketType in ticketTypeList" :key="ticketType.id">
      <q-item-section>
        <q-item-label>{{ ticketType.name }}</q-item-label>
        <q-item-label caption>{{ ticketType.price }} 元</q-item-label>
      </q-item-section>
      <q-item-section side>
        <q-checkbox color="primary" label="购买" v-model="ticketType.value" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script setup>
import { reactive } from 'vue';

const ticketTypeList = reactive(null);

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
    ticketTypeList.value = res.response['ticketTypeList'].map((ticketType) => {
      ticketType['ticketPrice'] = ticketType['ticketPrice'] / 100;
      return {
        id: ticketType['id'],
        name: ticketType['ticketName'],
        price: (ticketType['ticketPrice'] / 100).toFixed(2),
        value: false,
      };
    });
    console.log(ticketTypeList);
  },
  onerror: function (response) {
    console.log(response);
  },
});
</script>

<style scoped></style>
