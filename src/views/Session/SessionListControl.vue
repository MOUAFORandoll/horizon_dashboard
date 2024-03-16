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
import { useMainStore } from "@/stores/main";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
const isModalActive = ref(false);
let request = new RequestApi();

const perPage = ref(5);

const currentPage = ref(0);
let listMissionsSessionBiker = ref([]);
let loading = ref(true);
let reloading = ref(true);
let loadingUpdate = ref(false);
let isModalStatusMission = ref(false);
let isModalUpdateMission = ref(false);
let mission_session = ref({ id: "" });
let controller_terrain = ref(null);
let listUsersControllerterraint = ref([]);
let titre = ref("");
let point = ref("");
let description = ref("");
const itemsPaginated = computed(() =>
  listMissionsSessionBiker.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() =>
  Math.ceil(listMissionsSessionBiker.value.length / perPage.value)
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
  await getMissionsSessionList();
  await getListCTerrain();
});

async function getListCTerrain() {
  const response = await request.getListCTerrain();
  if (response.status) {
    loading.value = false;
    listUsersControllerterraint.value = [];
    response.data.forEach((element) => {
      listUsersControllerterraint.value.push({
        id: element.id,
        label: element.nom,
        keySecret: element.keySecret,
      });
    });
    console.log(listUsersControllerterraint.value);
  } else {
    loading.value = false;
  }
}
async function getMissionsSessionList() {
  console.log("----------------start-----");
  const response = await request.getMissionsSessionList();
  if (response.status) {
    console.log("----------------end-----");
    reloading.value = false;
    loading.value = false;
    listMissionsSessionBiker.value = response.data;
  } else {
    reloading.value = false;
    loading.value = false;
  }
}
async function actualiser() {
  reloading.value = true;

  await getMissionsSessionList();
  await getListCTerrain();
}

const affectController = async () => {
  const mainStore = useMainStore();
  loadingUpdate.value = true;
  let data = {
    keySecretCbureau: mainStore.keySecret,
    keySecretCterrain: controller_terrain.value.keySecret,
    idMissionSession: mission_session.value.id,
  };
  console.log(data);
  const response = await request.NewControlBiker(data);
  console.log(response);
  if (response.status) {
    actualiser();
    isModalStatusMission.value = false;
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
};
const selectMissionFStatus = (missionS) => {
  console.log(missionS);
  mission_session.value = missionS;
  isModalStatusMission.value = true;
};
</script>

<template>
  <CardBoxModal
    v-model="isModalStatusMission"
    title="Selectionner controller"
    button="danger"
  >
    <p>Vous allez affecter un controller a cette session de mission</p>

    <FormField label="Selectionner un controller">
      <FormControl
        placeholder="Selectionner un controller"
        v-model="controller_terrain"
        :options="listUsersControllerterraint"
      />
    </FormField>

    <BaseButton
      target="_blank"
      :loading="loadingUpdate"
      :icon="mdiCogOutline"
      label="Affecter"
      color="bg-blue-400"
      small
      @click="affectController"
    />
  </CardBoxModal>

  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiHomeGroup"
        title="Liste des sessions de missions"
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

              <th>Nom du Biker</th>
              <th>Phone du Biker</th>
              <th>Date debut session</th>

              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="mission_session in itemsPaginated"
              :key="mission_session.id"
            >
              <td data-label="libelle">
                {{ mission_session.mission.libelle }}
              </td>
              <td data-label="name">
                {{ mission_session.biker.name }}
              </td>
              <td data-label="phone">
                {{ mission_session.biker.phone }}
              </td>

              <td data-label="date_start">
                {{ mission_session.date_start }}
              </td>
              <td data-label="Status">
                {{ mission_session.status == true ? "En Cours" : "Terminee" }}
              </td>
              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    class="mx-1"
                    :loading="loadingUpdate"
                    color="danger"
                    :icon="mdiLock"
                    small
                    @click="selectMissionFStatus(mission_session)"
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
