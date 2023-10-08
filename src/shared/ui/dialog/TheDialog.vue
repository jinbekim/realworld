<template>
  <dialog ref="dialogEl">
    <div>
      <p>{{ message }}</p>
      <form method="dialog">
        <button>OK</button>
      </form>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useDialog } from './utils';

const { message } = useDialog();

const dialogEl = ref<HTMLDialogElement | null>(null);

const openModal = () => {
  if (!dialogEl.value) return;
  dialogEl.value.showModal();
};

const closeModal = () => {
  if (!dialogEl.value) return;
  dialogEl.value.close();
};

watch(
  () => message?.value,
  (newMsg) => {
    if (newMsg) openModal();
    else closeModal();
  }
);
</script>

<style scoped>
dialog > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

dialog::backdrop {
  background-color: black;
  opacity: 0.75;
}
</style>
