<template>
  <q-circular-progress
    :color="
      props.modelValue >= 200
        ? 'red'
        : props.modelValue >= 150
        ? 'amber'
        : props.modelValue >= 100
        ? 'light-green'
        : 'green'
    "
    :max="250"
    :min="50"
    :value="props.modelValue"
    show-value
    size="70px"
    track-color="grey-4"
  >
    <div class="column items-center">
      <div
        :class="
          props.modelValue >= 200
            ? 'text-red'
            : props.modelValue >= 150
            ? 'text-amber'
            : props.modelValue >= 100
            ? 'text-light-green'
            : 'text-green'
        "
        class="text-center"
      >
        {{ props.modelValue.toFixed(1) }}
      </div>
      <div class="text-grey text-center">ms</div>
    </div>
  </q-circular-progress>
</template>

<script lang="ts" setup>
export interface Props {
  modelValue: number;
}

const props = defineProps<Props>();
</script>

<style scoped></style>