import { InjectionKey } from "vue";
export const useLoginFormLogic = () => {};

export const loginFormLogicKey = Symbol() as InjectionKey<() => void>;

// error boundary 넣을려면
// 1. 루트 template에 이벤트나 vmodel같은거 거는게 번거로우니까
// 적절한 범위에서 해야하고 , provide와 inject를 사용해야함.
// 혹은 prop으로 일일히 전달해 줘야함
