<script setup lang="ts">
import { Get } from "@/dependency";
import { RealWorldStorage } from "@/infrastructure/storage";
import { getErrorMessage, isError } from "@/libs/isError";
import { reactive, watchEffect, ref, InjectionKey, watch } from "vue";
import { useRouter } from "vue-router";
import LoginTitle from "./auth/LoginTitle.vue";
import { useLoginTitle } from "./auth/useLoginTitle";
import AuthInput from "./auth/AuthInput.vue";
import { useLoginRouter } from "./auth/useLoginTitle";

const router = useRouter();
const errors = reactive<{ message: string }>({
  message: "",
});

const loginText = useLoginTitle();
const { path, isRegisterPage } = useLoginRouter();

/**
 * 각 data를 input으로 delegate 가능
 */
const formModel = reactive({
  username: "",
  email: "",
  password: "",
});

/**
 * 그럼 여기서 event delegation 해야함.
 */
async function onSubmit(event: Event) {
  // move to useAuthLogic
  event.preventDefault();
  const repo = Get.get("IUserRepository");
  if (path.value === "./login") {
    const user = await repo.login({
      email: formModel.email,
      password: formModel.password,
    });
    if (!isError(user)) {
      RealWorldStorage.set("user", user);
      router.push("/");
    } else {
      errors.message = getErrorMessage(user);
    }
  } else if (path.value === "./register") {
    const user = await repo.register({
      email: formModel.email,
      password: formModel.password,
      username: formModel.username,
    });
    if (!isError(user)) {
      RealWorldStorage.set("user", user);
      router.push("/");
    } else {
      errors.message = getErrorMessage(user);
    }
  }
}
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <login-title></login-title>

          <p v-if="errors.message" class="error-messages">
            {{ errors.message }}
          </p>

          <form @submit="onSubmit">
            <auth-input
              v-if="isRegisterPage"
              name="username"
              v-model="formModel.username"
              placeholder="Your Name"
              type="text"
              :required="isRegisterPage"
            />

            <auth-input
              name="email"
              v-model="formModel.email"
              placeholder="Email"
              type="Email"
              required
              @error="errors.message = $event"
            />

            <auth-input
              name="password"
              v-model="formModel.password"
              placeholder="Password"
              type="password"
              required
              @error="errors.message = $event"
            />

            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ loginText.h1 }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
