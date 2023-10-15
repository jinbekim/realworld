import { inject, ref, type InjectionKey, type Ref, toRef } from 'vue';
export const DialogKey = Symbol() as InjectionKey<Ref<string>>;

export const useDialog = () => {
  const message = inject(DialogKey, ref(''));

  const showDialog = (msg: string) => {
    message.value = msg;
  };
  const closeDialog = () => (message.value = '');
  return {
    message: toRef(() => message.value),
    showDialog,
    closeDialog,
  };
};
