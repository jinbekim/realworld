<script setup lang="ts">
import { Get } from "@/dependency";
import { RealWorldStorage } from "@/infrastructure/storage";
import { getErrorMessage, isError } from "@/libs/isError";
import { reactive, watchEffect } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const errors = reactive<{ message: string }>({
  message: "",
});

const text = reactive({
  h1: "",
  p: "",
  to: "",
});

const formModel = reactive({
  username: "",
  email: "",
  password: "",
});

async function onSubmit(event: Event) {
  event.preventDefault();
  const repo = Get.get("IUserRepository");
  console.log(formModel.email, formModel.password, formModel.username);
  if (text.h1 === "Sign in") {
    console.log("Sign in");
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
  } else if (text.h1 === "Sign up") {
    console.log("Sign up");
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

function checkValidate(event: Event) {
  event.preventDefault();
  const target = event.target as HTMLInputElement;
  console.log(target.value);
  if (target.validity.valid) {
    errors.message = "";
  } else {
    errors.message = target.name + target.validationMessage;
  }
}

watchEffect(() => {
  if (router.currentRoute.value.path === "/login") {
    text.h1 = "Sign in";
    text.p = "Need an account?";
    text.to = "./register";
  } else if (router.currentRoute.value.path === "/register") {
    text.h1 = "Sign up";
    text.p = "Have an account?";
    text.to = "./login";
  }
});
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ text.h1 }}</h1>
          <p class="text-xs-center">
            <router-link :to="text.to">{{ text.p }}</router-link>
          </p>

          <p v-if="errors.message" class="error-messages">
            {{ errors.message }}
          </p>

          <form @submit="onSubmit">
            <fieldset v-if="text.h1 === 'Sign up'" class="form-group">
              <input
                @blur="checkValidate"
                @invalid="(e) => e.preventDefault()"
                :required="text.h1 === 'Sign up'"
                v-model="formModel.username"
                name="username"
                class="form-control form-control-lg"
                type="text"
                placeholder="Your Name"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                @blur="checkValidate"
                @invalid="(e) => e.preventDefault()"
                required
                v-model="formModel.email"
                name="email"
                class="form-control form-control-lg"
                type="Email"
                placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                @blur="checkValidate"
                @invalid="(e) => e.preventDefault()"
                required
                v-model="formModel.password"
                name="password"
                class="form-control form-control-lg"
                type="password"
                placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ text.h1 }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
