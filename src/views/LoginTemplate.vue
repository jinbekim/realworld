<script setup lang="ts">
import { Get } from '@/dependency';
import { RealWorldStorage } from '@/infrastructure/storage';
import { computed, reactive } from 'vue';
import { useRouter } from 'vue-router';
import LoginTitle from './auth/LoginTitle.vue';
import AuthInput from './auth/AuthInput.vue';
import { getErrorMessage } from '@/shared/api/isError';

const errors = reactive<{ message: string }>({
  message: '',
});

const router = useRouter();

const Text = {
  login: {
    h1: 'Sign in',
    p: 'Need an account?',
  },
  register: {
    h1: 'Sign up',
    p: 'Have an account?',
  },
};

const formModel = reactive({
  username: '',
  email: '',
  password: '',
});

const isRegisterPage = computed(
  () => router.currentRoute.value.path === '/register'
);

/**
 * 그럼 여기서 event delegation 해야함.
 */
async function onSubmit(event: Event) {
  // move to useAuthLogic
  event.preventDefault();
  // const repo = Get.get('IUserRepository');
  // if (router.currentRoute.value.path === '/login') {
  //   const user = await repo.login({
  //     email: formModel.email,
  //     password: formModel.password,
  //   });
  //   if (user) {
  //     RealWorldStorage.set('user', user);
  //     router.push('/');
  //   } else {
  //     errors.message = getErrorMessage(user);
  //   }
  // } else if (router.currentRoute.value.path === '/register') {
  //   const user = await repo.register({
  //     email: formModel.email,
  //     password: formModel.password,
  //     username: formModel.username,
  //   });
  //   if (user) {
  //     RealWorldStorage.set('user', user);
  //     router.push('/');
  //   } else {
  //     errors.message = getErrorMessage(user);
  //   }
  // }
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
              {{ Text.login.h1 }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
