import type { Directive } from 'vue';

export const vLoading: Directive<HTMLElement, boolean> = function (
  el,
  binding
) {
  if (binding.value) {
    el.classList.add('state-loading');
    el.setAttribute('disabled', 'disabled');
  } else {
    el.classList.remove('state-loading');
    el.removeAttribute('disabled');
  }
};
