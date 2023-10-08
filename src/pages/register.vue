<route lang="json">
{
  "meta": {
    "guestOnly": true
  }
}
</route>

<script setup lang="ts">
import { useSessionStore } from '@/entities/session';
import { useRegisterUser } from '@/features/session/register';
import AuthInput from '@/shared/ui/input/AuthInput.vue';
import { reactive } from 'vue';
import { useRouter } from 'vue-router/auto';

const error = reactive({
  message: '',
});

const { addUser } = useSessionStore();
const { mutateAsync } = useRegisterUser();
const router = useRouter();

const onSubmit = async (event: Event) => {
  try {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const username = formData.get('username') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const result = await mutateAsync({
      username,
      email,
      password,
    });
    addUser(result);
    router.push('/user-feed');

  } catch (e) {
    if (typeof e === 'string') {
          error.message = e;
          return;
        }
  }
};
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ 'Sign up' }}</h1>
          <p class="text-xs-center">
            <RouterLink to="login">{{ 'Have an account?' }}</RouterLink>
          </p>

          <p v-if="error.message" class="error-messages">
            {{ error.message }}
          </p>

          <form @submit="onSubmit">
            <AuthInput
              name="username"
              placeholder="Your Name"
              type="text"
              required
            />

            <AuthInput
              name="email"
              placeholder="Email"
              type="Email"
              required
              @error="error.message = $event"
            />

            <AuthInput
              name="password"
              placeholder="Password"
              type="password"
              required
              @error="error.message = $event"
            />

            <button class="btn btn-lg btn-primary pull-xs-right" type="submit">
              {{ 'Sign up' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
