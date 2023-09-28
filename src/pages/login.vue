<route lang="json">
{
  "meta": {
    "requiresAuth": false
  }
}
</route>

<script setup lang="ts">
import { reactive } from 'vue';
import AuthInput from '@/shared/ui/input/AuthInput.vue';
import { useLoginUser } from '@/features/session/login';
import { sessionModel } from '@/entities/session';
import { useRouter } from 'vue-router/auto';
import { getErrorMessage } from '@/shared/api/utils';

const error = reactive({
  message: '',
});

const { addUser } = sessionModel.useSessionStore();
const { mutate, isLoading } = useLoginUser();
const router = useRouter();

const onSubmit = (event: Event) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  mutate(
    {
      email,
      password,
    },
    {
      onSuccess(user) {
        addUser(user);
        router.push('/');
      },
      onError(e) {
        error.message = getErrorMessage(e);
      },
    }
  );
};
</script>

<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ 'Sign in' }}</h1>
          <p class="text-xs-center">
            <RouterLink to="register">{{ 'Need an account?' }}</RouterLink>
          </p>

          <p v-if="error.message" class="error-messages">
            {{ error.message }}
          </p>

          <form @submit="onSubmit">
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

            <button
              class="btn btn-lg btn-primary pull-xs-right"
              type="submit"
              :disabled="isLoading"
            >
              {{ 'Sign in' }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
