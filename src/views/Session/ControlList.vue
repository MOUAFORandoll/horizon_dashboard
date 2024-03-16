<script setup>
import { mdiAccountAlertOutline, mdiPlus, mdiLock, mdiAccount } from "@mdi/js";
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
import { useMainStore } from "@/stores/main";

import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
import { onMounted, computed, ref } from "vue";
import { RequestApi } from "@/boot/RequestApi";
let request = new RequestApi();

const isModalActive = ref(false);

const perPage = ref(5);
let listMissionsSessionBiker = ref([]);
const currentPage = ref(0);
async function getMissionsControlList() {
  console.log("----------------start-----");
  const response = await request.getMissionsControlList();
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
let listSecteur = ref([]);
let loading = ref(true);
let reloading = ref(true);
let loadingUpdate = ref(false);
let isModalNewControl = ref(false);
let controller_terrain = ref({ id: "" });
let secteur = ref({ id: "" });
let mission = ref({ id: "" });
let keySecretBabana = ref("");
let listUsersControllerterraint = ref([]);
let listMissions = ref([]);

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
  await getMissionsControlList();

  await getListSecteur();
  await getListCTerrain();
  await getMissionsList();
});

async function getMissionsList() {
  const response = await request.ListMission();
  if (response.status) {
    reloading.value = false;
    loading.value = false;

    response.data.forEach((element) => {
      listMissions.value.push({
        id: element.id,
        label: element.libelle,
      });
    });
  } else {
    reloading.value = false;
    loading.value = false;
  }
}
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

async function getListSecteur() {
  const response = await request.ListSecteur();
  if (response.status) {
    listSecteur.value = [];
    response.data.forEach((element) => {
      listSecteur.value.push({
        id: element.id,
        label: element.libelle,
      });
    });
  } else {
  }
}

const affectController = async () => {
  const mainStore = useMainStore();
  loadingUpdate.value = true;
  let data = {
    keySecretCbureau: mainStore.keySecret,
    keySecretCterrain: controller_terrain.value.keySecret,
    idSecteur: secteur.value.id,
    idMission: mission.value.id,
  };
  console.log(data);
  const response = await request.NewControlBiker(data);
  console.log(response);
  if (response.status) {
    isModalNewControl.value = false;
    loadingUpdate.value = false;
    toast.success("Succes !", {
      autoClose: 2000,
    });
    await getMissionsControlList();
  } else {
    loadingUpdate.value = false;
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
  }
};
</script>

<template>
  <CardBoxModal
    v-model="isModalNewControl"
    title="Nouvelle mission de controle"
    button="danger"
  >
    <p>Vous allez demarrer une mission de control</p>
    <FormField label="Selectionner la mission">
      <FormControl
        placeholder="Selectionner la mission"
        v-model="mission"
        :options="listMissions"
      />
    </FormField>
    <FormField label="Selectionner un controller">
      <FormControl
        placeholder="Selectionner un controller"
        v-model="controller_terrain"
        :options="listUsersControllerterraint"
      />
    </FormField>
    <FormField label="Selectionner un secteur">
      <FormControl
        placeholder="Selectionner un secteur"
        v-model="secteur"
        :options="listSecteur"
      />
    </FormField>

    <BaseButton
      label="Confirmer"
      :loading="loadingUpdate"
      color="info"
      @click="affectController"
    />
  </CardBoxModal>

  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiHomeGroup"
        title="Liste des Controles"
        main
      >
        <BaseButton
          target="_blank"
          :icon="mdiPlus"
          label="Ajouter"
          color="contrast"
          rounded-full
          small
          @click="isModalNewControl = !isModalNewControl"
        />
      </SectionTitleLineWithButton>

      <Loader v-if="loading" />
      <CardBox v-else class="mb-2" has-table>
        <table>
          <thead>
            <tr>
              <th>Titre de la mission</th>
              <th>Nom du controller</th>

              <th>Phone du controller</th>
              <th>Nom du Secteur</th>
              <th>Status de la mission de control</th>
              <th>Date de Creation de la mission de control</th>
              <th>Date de debut de la mission de control</th>
              <th>Date de fin de la mission de control</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="mission_control in itemsPaginated"
              :key="mission_control.id"
            >
              <td data-label="libelle">
                {{ mission_control.mission.libelle }}
              </td>
              <td data-label="name">
                {{ mission_control.controller.name }}
              </td>
              <td data-label="Phone">
                {{ mission_control.controller.phone }}
              </td>

              <td data-label="Secteur">
                {{ mission_control.secteur.libelle }}
              </td>

              <td data-label="Status">
                {{
                  mission_control.status == 0
                    ? "En attente du controller"
                    : mission_control.status == 1
                    ? "En Cours"
                    : "Terminee"
                }}
              </td>
              <td data-label="dateCreated">
                {{ mission_control.date_created }}
              </td>
              <td data-label="date_start">
                {{ mission_control.date_start }}
              </td>
              <td data-label="date_end">
                {{ mission_control.date_end }}
              </td>
              <!-- <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    class="mx-1"
                    :loading="loadingUpdate"
                    color="danger"
                    :icon="mdiLock"
                    small
                    @click="selectMissionFStatus(mission_control)"
                  />
                </BaseButtons>
              </td> -->
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
