<script setup>
import { mdiHomeGroup, mdiReload, mdiEye, mdiAxis } from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import CardBoxModal from "@/components/CardBoxModal.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useRouter } from "vue-router";
import { mdiAccount, mdiAsterisk } from "@mdi/js";
import SectionFullScreen from "@/components/SectionFullScreen.vue";
// import FormCheckRadio from "@/components/FormCheckRadio.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";
import { RequestApi } from "@/boot/RequestApi";
// import UserAvatar from "@/components/UserAvatar.vue";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { ref } from "vue";
let request = new RequestApi();

let loading = ref(false);
let titre = ref("");
let point = ref("");
let description = ref("");

async function submit() {
  loading.value = true;
  let data = {
    libelle: titre.value,
    description: description.value,
    nbre_point: point.value,
  };
  const response = await request.NewMission(data);
  console.log(response.status);
  if (response.status == true) {
    loading.value = false;
    toast.success("Succes !", {
      autoClose: 2000,
    });
  } else {
    loading.value = false;
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
  }
}
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiHomeGroup"
        title="Nouvelle Mission"
        main
      >
      </SectionTitleLineWithButton>

      <!-- <Loader v-if="loading" /> -->
      <CardBox class="mb-2" has-table>
        <CardBox :class="cardClass" is-form @submit.prevent="submit">
          <FormField
            label="Titre de la mission"
            help="Please enter your mission title"
          >
            <FormControl
              v-model="titre"
              :icon="mdiAccount"
              name="login"
              autocomplete="username"
            />
          </FormField>
          <FormField label="Nombre de points de la mission" help="">
            <FormControl
              v-model="point"
              :icon="mdiAccount"
              name="point"
              autocomplete="username"
            />
          </FormField>
          <FormField
            label="Description"
            help="Please enter a description of your mission"
          >
            <FormControl
              v-model="description"
              type="textarea"
              :icon="mdiAsterisk"
              name="password"
              autocomplete="current-password"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton
                type="submit"
                :loading="loading"
                color="info"
                label="Creer la Mission"
              />
            </BaseButtons>
          </template>
        </CardBox>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
