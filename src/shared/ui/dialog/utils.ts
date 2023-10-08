import { inject, type InjectionKey, type Ref } from 'vue';
export const key = Symbol() as InjectionKey<Ref<string>>;

export const useDialog = () => {
  const message = inject(key);

  return {
    message,
  };
};
