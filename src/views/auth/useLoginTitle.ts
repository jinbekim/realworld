import { inject, computed, InjectionKey, Ref, watch, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";

// all is view logic

// where be setter?
// 1. provide
// 2. here

// 이게 지금 logintile이라서 종속적인데
// 그냥 타이틀이라면 아니 login title 하위에 있을거임
//그러면 여기서 다시 provide inject를 하는거지
export const useLoginTitle = () => {
  const TextContent = {
    login: {
      h1: "Sign in",
      p: "Need an account?",
    },
    register: {
      h1: "Sign up",
      p: "Have an account?",
    },
    default: {
      h1: "default h1",
      p: "default p",
    },
  };

  const context = inject(loginTitleKey);

  // 이런식
  // NOTE - provide('title', TextContent[context.value ?? "default"].h1)

  // TODO - 공통 title 컴토넌트 만들기
  // TODO - setter 어디에 둘지 고민
  watchEffect(() => {
    context.value = useRoute().path === "/login" ? "login" : "register";
  });

  return computed(() => TextContent[context.value ?? "default"]);
};

export const useLoginRouter = () => {
  const path = inject(loginRouterKey);
  const router = useRouter();

  const togglePath = computed(() => {
    return path.value === "./login" ? "./register" : "./login";
  });

  const isRegisterPage = computed(() => path.value === "./register");

  watch(
    () => router.currentRoute.value.path,
    () => {
      path.value =
        router.currentRoute.value.path === "/login" ? "./login" : "./register";
    },
    { immediate: true }
  );

  return { path, togglePath, isRegisterPage };
};

export type loginTitleType = "login" | "register" | "default";
export const loginTitleKey = Symbol() as InjectionKey<Ref<loginTitleType>>;
export type loginRouterType = "./login" | "./register" | "/";
export const loginRouterKey = Symbol() as InjectionKey<Ref<loginRouterType>>;
// or provide handler function
