<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
import CardBox from "@/components/CardBox.vue";
// import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import BaseButton from "@/components/BaseButton.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import LayoutGuest from "@/layouts/LayoutGuest.vue";
import { useMainStore } from "@/stores/main";
import { RequestApi } from "@/boot/RequestApi";
let request = new RequestApi();
onMounted(() => {
  // connected();
});

const mainStore = useMainStore();

const router = useRouter(); 
let loading = ref(false);
// let remember = ref(true);
let phone = ref("");
let password = ref("");

async function submit() {
  loading.value = true;

  let data = { phone: phone.value, password: password.value };
  const response = await request.logIn(data);
  console.log(response.status);
  if (response.status == true) {
    router.push("/");
    loading.value = false;
  } else {
    loading.value = false;
  }
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Login Phone" help="Please enter your phone">
          <FormControl
            v-model="phone"
            :icon="mdiAccount"
            name="login"
            autocomplete="username"
          />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="current-password"
          />
        </FormField>

        <!-- <FormCheckRadio v-model="remember" name="remember" label="Remember" :input-value="true" /> -->

        <template #footer>
          <BaseButtons>
            <BaseButton
              type="submit"
              :loading="loading"
              color="info"
              label="Login"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
