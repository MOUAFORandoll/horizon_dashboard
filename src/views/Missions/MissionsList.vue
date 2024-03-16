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
let listMissions = ref([]);
let loading = ref(true);
let reloading = ref(true);
let loadingUpdate = ref(false);
let isModalStatusMission = ref(false);
let isModalUpdateMission = ref(false);
let mission = ref({ id: "" });
let keySecretBabana = ref("");

let titre = ref("");
let point = ref("");
let description = ref("");
const itemsPaginated = computed(() =>
  listMissions.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() =>
  Math.ceil(listMissions.value.length / perPage.value)
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
  await getMissionsList();
});

async function getMissionsList() {
  const response = await request.ListMission();
  if (response.status) {
    reloading.value = false;
    loading.value = false;
    listMissions.value = response.data;
  } else {
    reloading.value = false;
    loading.value = false;
  }
}
async function actualiser() {
  reloading.value = true;

  await getMissionsList();
}

const changeStatus = async () => {
  console.log("-------------data");
  loadingUpdate.value = true;
  let data = {
    missionId: mission.value.id,
  };
  console.log(data);
  const response = await request.statusMission(data);
  console.log(response);
  if (response.status) {
    actualiser();
    isModalStatusMission.value = false;
    loadingUpdate.value = false;
  } else {
    loadingUpdate.value = false;
  }
};
async function updateMission() {
  loadingUpdate.value = true;
  let data = {
    missionId: mission.value.id,
    libelle: titre.value,
    description: description.value,
    nbre_point: point.value,
  };
  const response = await request.NewMission(data);
  console.log(response.status);
  if (response.status == true) {
    actualiser();
    isModalUpdateMission.value = false;
    loadingUpdate.value = false;
    toast.success("Succes !", {
      autoClose: 2000,
    });
  } else {
    loadingUpdate.value = false;
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
  }
}
const selectMissionFStatus = (missionS) => {
  mission.value = missionS;
  isModalStatusMission.value = true;
};
const selectMissionFUpdate = (missionS) => {
  mission.value = missionS;

  titre.value = mission.value.libelle;
  point.value = mission.value.nbre_point;
  description.value = mission.value.description;
  isModalUpdateMission.value = true;
};
</script>

<template>
  <CardBoxModal
    v-model="isModalUpdateMission"
    v-if="mission != null"
    title="Informations de la mission"
    button="danger"
  >
    <p>
      Vous allez mettre a jour les informations de La mission

      <b>{{ mission.libelle }}</b>
    </p>

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

    <BaseButtons>
      <BaseButton
        label="Mettre a jour la mission"
        :loading="loadingUpdate"
        color="info"
        @click="updateMission"
    /></BaseButtons>
  </CardBoxModal>
  <CardBoxModal
    v-model="isModalStatusMission"
    v-if="mission != null"
    title="Status de la mission"
    button="danger"
  >
    <p>
      Vous allez
      {{ mission.status == true ? "desactiver" : "activer" }} La mission

      <b>{{ mission.libelle }}</b>
    </p>

    <BaseButton
      label="Confirmer"
      :loading="loadingUpdate"
      color="info"
      @click="changeStatus"
    />
  </CardBoxModal>

  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiHomeGroup"
        title="Liste des missions"
        main
      >
        <BaseButton
          :loading="reloading"
          target="_blank"
          :icon="mdiReload"
          label="Actualise"
          color="contrast"
          rounded-full
          small
          @click="actualiser()"
        />
      </SectionTitleLineWithButton>

      <Loader v-if="loading" />
      <CardBox v-else class="mb-2" has-table>
        <table>
          <thead>
            <tr>
              <th>Titre de la mission</th>
              <th>Description de la mission</th>
              <th>Nombre de point de la mission</th>
              <th>Date de Creation de la mission</th>

              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="mission in itemsPaginated" :key="mission.id">
              <td data-label="libelle">
                {{ mission.libelle }}
              </td>
              <td data-label="description">
                {{ mission.description }}
              </td>
              <td data-label="nbre_point">
                {{ mission.nbre_point }}
              </td>

              <td data-label="dateCreated">
                {{ mission.date_created }}
              </td>
              <td data-label="Status">
                {{ mission.status == true ? "En Cours" : "Terminee" }}
              </td>
              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    class="mx-1"
                    :loading="loadingUpdate"
                    color="danger"
                    :icon="mdiLock"
                    small
                    @click="selectMissionFStatus(mission)"
                  />
                  <BaseButton
                    class="mx-1"
                    :loading="loadingUpdate"
                    color="info"
                    :icon="mdiAccountAlertOutline"
                    small
                    @click="selectMissionFUpdate(mission)"
                  />
                </BaseButtons>
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
