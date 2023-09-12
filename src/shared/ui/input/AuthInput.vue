<template>
  <fieldset class="form-group">
    <input
      v-bind="$attrs"
      @blur="checkValidate"
      @invalid="(e) => e.preventDefault()"
      v-model="modelValue"
      class="form-control form-control-lg"
      :type="type"
    />
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  modelValue?: string;
  type?: string;
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => '',
});

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit('update:modelValue', value);
  },
});

interface Emits {
  (e: 'error', message: string): void;
  (e: 'update:modelValue', value: string): void;
}
const emit = defineEmits<Emits>();

function checkValidate(event: Event) {
  event.preventDefault();
  const target = event.target as HTMLInputElement;
  if (target.validity.valid) {
    emit('error', '');
  } else {
    emit('error', target.name + target.validationMessage);
  }
}
</script>

<style scoped></style>
