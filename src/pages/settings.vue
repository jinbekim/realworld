<route lang="json">
{
  "meta": {
    "requiresAuth": true
  }
}
</route>
<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit="onSubmit">
            <fieldset>
              <fieldset class="form-group">
                <input
                  name="image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  name="username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  name="bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  name="email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                type="submit"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <LogoutButton />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { LogoutButton } from '@/features/session/logout';
import { useUpdateCurrentUser } from '@/features/session/update';
import { useQueryClient } from '@tanstack/vue-query';
import type { UpdateUserDto } from '@/shared/api/user';
import { useDialog } from '@/shared/ui';

const { message } = useDialog();

const queryClient = useQueryClient();
const { mutate } = useUpdateCurrentUser(queryClient);
const onSubmit = (event: Event) => {
  event.preventDefault();
  const formData = new FormData(event.target as HTMLFormElement);
  const user: UpdateUserDto = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    image: formData.get('image') as string,
    username: formData.get('username') as string,
    bio: formData.get('bio') as string,
  };

  mutate(user, {
    onSuccess: () => {
      if (message) message.value = 'Succees to update';
    },
    onError: () => {
      if (message) message.value = 'Failed to update';
    },
  });
};
</script>
