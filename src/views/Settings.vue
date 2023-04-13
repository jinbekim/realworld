<script setup lang="ts">
import { Get } from "@/dependency";
import type { IUserRepository } from "@/domain/IUserRepository";
import type { UpdateUser } from "@/domain/User";
import useUser from "@/hooks/useUser";
import { RealWorldStorage } from "@/infrastructure/storage";
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

const updateModel = reactive({
  password: "",
  image: "",
  username: "",
  bio: "",
  email: "",
  ...useUser().value,
});
const password = ref("");

function logout() {
  RealWorldStorage.set("user", null);
  router.replace("/");
}

async function updateUser() {
  const userRepository = Get.get<IUserRepository>("IUserRepository");
  userRepository.updateCurrentUser({
    ...updateModel,
  });
}
</script>

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
                  v-model="updateModel.image"
                  class="form-control"
                  type="text"
                  placeholder="URL of profile picture"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="updateModel.username"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Your Name"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                  v-model="updateModel.bio"
                  class="form-control form-control-lg"
                  rows="8"
                  placeholder="Short bio about you"
                ></textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="updateModel.email"
                  class="form-control form-control-lg"
                  type="text"
                  placeholder="Email"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                  v-model="password"
                  class="form-control form-control-lg"
                  type="password"
                  placeholder="Password"
                />
              </fieldset>
              <button
                class="btn btn-lg btn-primary pull-xs-right"
                @click="updateUser"
              >
                Update Settings
              </button>
            </fieldset>
          </form>
          <hr />
          <button class="btn btn-outline-danger" @click="logout">
            Or click here to logout.
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
