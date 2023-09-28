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

          <form>
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
                @click="handleUpdateUser"
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
import { ref, shallowRef } from 'vue';
import { LogoutButton } from '@/features/session/logout';
import { useSessionStore } from '@/entities/session/model/sessionModel';
import { useUpdateCurrentUser } from '@/features/session/update';
import { useQueryClient } from '@tanstack/vue-query';

const { currentUser } = useSessionStore();
const user = shallowRef(currentUser);

const queryClient = useQueryClient();
const { mutate } = useUpdateCurrentUser(queryClient);
const handleUpdateUser = () => {
  if (!user.value) return;
  mutate(user.value, {
    onSuccess: () => {},
    onError: () => {},
  });
};
</script>
