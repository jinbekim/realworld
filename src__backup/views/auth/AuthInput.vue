<template>
  <fieldset class="form-group">
    <input
      v-bind="$attrs"
      @blur="checkValidate"
      @invalid="(e) => e.preventDefault()"
      v-model="modelValue"
      class="form-control form-control-lg"
    />
  </fieldset>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
}>();

const modelValue = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const emit = defineEmits<{
  (e: "error", message: string): void;
  (e: "update:modelValue", value: string): void;
}>();

function checkValidate(event: Event) {
  event.preventDefault();
  const target = event.target as HTMLInputElement;
  console.log(target.value);
  if (target.validity.valid) {
    emit("error", "");
  } else {
    emit("error", target.name + target.validationMessage);
  }
}
</script>

<style scoped></style>
