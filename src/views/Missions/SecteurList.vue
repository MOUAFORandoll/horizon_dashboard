<script setup>
import {
  mdiAccountAlertOutline,
  mdiReload,
  mdiLock,
  mdiAccount,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";

import CardBoxModal from "@/components/CardBoxModal.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
// import UserAvatar from "@/components/UserAvatar.vue";
import FormField from "@/components/FormField.vue";
import FormControl from "@/components/FormControl.vue";

import { onMounted, computed, ref } from "vue";
import { RequestApi } from "@/boot/RequestApi";
let request = new RequestApi();

const isModalActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);
let listSecteur = ref([]);
let loading = ref(true);
let loadingUpdate = ref(false);
let isModalSecteur = ref(false);

let titre = ref("");
const itemsPaginated = computed(() =>
  listSecteur.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() =>
  Math.ceil(listSecteur.value.length / perPage.value)
);

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

onMounted(async () => {
  await getListSecteur();
});

async function getListSecteur() {
  loading.value = true;
  const response = await request.ListSecteur();
  if (response.status) {
    loading.value = false;
    listSecteur.value = response.data;
  } else {
    loading.value = false;
  }
}
const NewSecteur = async () => {
  console.log("-------------data");
  loadingUpdate.value = true;
  let data = {
    libelle: titre.value,
  };
  console.log(data);
  const response = await request.NewSecteur(data);
  console.log(response);
  if (response.status) {
    getListSecteur();
    loadingUpdate.value = false;
  } else {
    loadingUpdate.value = false;
  }
};
</script>

<template>
  <CardBoxModal
    v-model="isModalSecteur"
    title="Ajouter un secteur de mission"
    button="danger"
  >
    <p>Vous allez Ajouter un secteur de mission</p>

    <FormField label="Titre du secteur" help="Please enter your secteur title">
      <FormControl
        v-model="titre"
        :icon="mdiAccount"
        name="login"
        autocomplete="username"
      />
    </FormField>

    <BaseButtons>
      <BaseButton
        label="Ajouter le Secteur"
        :loading="loadingUpdate"
        color="info"
        @click="NewSecteur"
    /></BaseButtons>
  </CardBoxModal>

  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiHomeGroup"
        title="Liste des secteurs"
        main
      >
        <BaseButton
          :loading="reloading"
          target="_blank"
          :icon="mdiReload"
          label="Ajouter"
          color="contrast"
          rounded-full
          small
          @click="isModalSecteur = !isModalSecteur"
        />
      </SectionTitleLineWithButton>

      <Loader v-if="loading" />
      <CardBox v-else class="mb-2" has-table>
        <table>
          <thead>
            <tr>
              <th>Titre du secteur</th>
              <th>Date d'ajout du secteur</th>

              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mission in itemsPaginated" :key="mission.id">
              <td data-label="libelle">
                {{ mission.libelle }}
              </td>

              <td data-label="dateCreated">
                {{ mission.dateCreated }}
              </td>
              <td data-label="Status">
                {{ mission.status == true ? "Actif" : "Inactif" }}
              </td>
            </tr>
          </tbody>
        </table>
        <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
          <BaseLevel>
            <BaseButtons>
              <BaseButton
                v-for="page in pagesList"
                :key="page"
                :active="page === currentPage"
                :label="page + 1"
                :color="page === currentPage ? ' lightDark' : 'whiteDark'"
                small
                @click="currentPage = page"
              />
            </BaseButtons>
            <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
          </BaseLevel>
        </div>
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
