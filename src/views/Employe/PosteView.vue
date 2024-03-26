<script setup>
import {
  mdiAccountSwitch,
  mdiAsterisk,
  mdiCogOutline,
  mdiAccount,
  mdiContentCopy,
  mdiLock,
  mdiEye,
  mdiAccountAlertOutline,
  mdiGamepadCircle,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import FormControl from "@/components/FormControl.vue";

import CardBoxModal from "@/components/CardBoxModal.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import { useRouter } from "vue-router";

import { useMainStore } from "@/stores/main";
import { onMounted, computed, ref } from "vue";
import { RequestApi } from "@/boot/RequestApi";

import FormField from "@/components/FormField.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
let request = new RequestApi();

const isModalActive = ref(false);
const isModalPassword = ref(false);
const isModalPoste = ref(false);
const isModalCreateCB = ref(false);
const perPage = ref(5);
const perPageFilter = ref(5);
const currentPage = ref(0);
const currentPageFilter = ref(0);
let listEmploye = ref([]);
let listPosteEmploye = ref([]);
let listPosteEmployeFilter = ref([]);
let listPoste = ref([]);
let listTypePoste = ref([]);
let typePoste = ref([]);
let loading = ref(true);
let loadingAction = ref(false);
let employe = ref("");
let poste = ref("");

const itemsPaginatedFilter = computed(() =>
  listPosteEmployeFilter.value.slice(
    perPageFilter.value * currentPageFilter.value,
    perPageFilter.value * (currentPageFilter.value + 1)
  )
);

const numPagesFilter = computed(() =>
  Math.ceil(listPosteEmploye.value.length / perPageFilter.value)
);

const currentPageHumanFilter = computed(() => currentPageFilter.value + 1);

const pagesListFilter = computed(() => {
  const pagesListFilter = [];

  for (let i = 0; i < numPagesFilter.value; i++) {
    pagesListFilter.push(i);
  }
  console.log(pagesListFilter);
  return pagesListFilter;
});
const mainStore = useMainStore();

async function getlistEmploye() {
  const response = await request.listEmploye();
  if (response.status) {
    loading.value = false;

    response.data.forEach((element) => {
      listEmploye.value.push({
        id: element.id,
        label: element.nom + " " + element.prenom,
      });
    });
  } else {
    loading.value = false;
  }
}
async function getPosteEmploye() {
  const response = await request.listPosteEmploye();
  if (response.status) {
    // loading.value = false;
    listPosteEmploye.value = response.data;
  } else {
    // loading.value = false;
  }
}
async function getlistPoste() {
  const response = await request.listPoste();
  if (response.status) {
    // loading.value = false;

    response.data.forEach((element) => {
      listPoste.value.push({
        id: element.id,
        label: element.libelle,
      });
    });
  } else {
    // loading.value = false;
  }
}
async function getlistTypePoste() {
  const response = await request.listTypePoste();
  if (response.status) {
    response.data.forEach((element) => {
      listTypePoste.value.push({
        id: element.id,
        label: element.libelle,
      });
    });
  } else {
    // loading.value = false;
  }
}
const itemsPaginated = computed(() =>
  listPosteEmploye.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() =>
  Math.ceil(listPosteEmploye.value.length / perPage.value)
);

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }
  console.log(pagesList);
  return pagesList;
});
const router = useRouter();

onMounted(async () => {
  connected();
  await getlistTypePoste();
  await getlistPoste();
  await getlistEmploye();
  await getPosteEmploye();
});

const connected = () => {
  router.beforeEach(() => {
    if ((mainStore.nom = null)) {
      console.log("------------", "Vas te connecter");

      router.push("/Login");
    } else {
      console.log("------------", "Vas te connecter");
    }
  });
};

let _seletUser = ref();
function setAction(user) {
  console.log(user);
  console.log("---user");
  _seletUser.value = user;
  isModalActive.value = true;
  console.log(_seletUser.value);
}

function setAction1(user) {
  _seletUser.value = user;
  isModalPoste.value = true;
  console.log(_seletUser.value);
}

const affectToPoste = async () => {
  loadingAction.value = true;
  let data = {
    poste: "/api/postes/" + poste.value.id,
    typePoste: "/api/type_postes/" + typePoste.value.id,
    employe: "/api/employes/" + employe.value.id,
  };
  const response = await request.affectToPoste(data);
  if (response.status) {
    toast.success("Succes !", {
      autoClose: 2000,
    });
    await getPosteEmploye();
    loadingAction.value = false;
    isModalActive.value = false;
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    loadingAction.value = false;
  }
};
const PosteEmployeFilter = async () => {
  listPosteEmployeFilter.value = [];
  loadingAction.value = true;

  const response = await request.listPosteEmployeFilter(employe.value.id);
  if (response.status) {
    listPosteEmployeFilter.value = response.data;

    loadingAction.value = false;
    isModalActive.value = false;
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    loadingAction.value = false;
  }
};
</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Poster un employe">
    <p>
      Vous allez
      <b>Modifier le poste journalier d'un employe</b>
    </p>
    <FormField label="Selectionner un employe ">
      <FormControl v-model="employe" :options="listEmploye" />
    </FormField>
    <FormField label="Selectionner le poste ">
      <FormControl v-model="poste" :options="listPoste" />
    </FormField>
    <FormField label="Selectionner le type poste ">
      <FormControl v-model="typePoste" :options="listTypePoste" />
    </FormField>

    <BaseButton
      target="_blank"
      :loading="loadingAction"
      :icon="mdiCogOutline"
      label="Enregistrer"
      color="bg-blue-400"
      small
      @click="affectToPoste"
    />
  </CardBoxModal>
  <CardBoxModal v-model="isModalPoste" title="Poster un employe">
    <p>
      Selectionner l'employe
      <b>dont vous voulez l'historique de postes</b>
    </p>
    <FormField label="Selectionner un employe ">
      <FormControl v-model="employe" :options="listEmploye" />
    </FormField>

    <BaseButton
      target="_blank"
      :loading="loadingAction"
      :icon="mdiCogOutline"
      label="Filtrer"
      color="bg-blue-400"
      small
      @click="PosteEmployeFilter"
    />

    <Loader v-if="loadingAction" />
    <CardBox class="mb-2" has-table v-else>
      <table>
        <thead>
          <tr>
            <th>Nom</th>

            <th>Phone</th>

            <th>Poste</th>
            <th>Type de Poste</th>
            <th>Date mise en poste</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="posteUser in itemsPaginatedFilter" :key="posteUser.id">
            <td data-label="nom">
              {{ posteUser.employe.nom }}
            </td>

            <td data-label="phone">
              {{ posteUser.employe.phone }}
            </td>

            <td data-label="poste">
              {{ posteUser.poste.libelle }}
            </td>
            <td data-label="typePoste">
              {{ posteUser.typePoste.libelle }}
            </td>

            <td data-label="date_poste">
              {{ posteUser.dateCreated.split("T")[0] }} a
              {{ posteUser.dateCreated.split("T")[1] }}
            </td>

            <td class="before:hidden lg:w-1 whitespace-nowrap">
              <BaseButtons type="justify-start lg:justify-end" no-wrap>
                <BaseButton
                  color="warning"
                  :icon="mdiGamepadCircle"
                  small
                  @click="setAction(posteUser)"
                />

                <BaseButton
                  color="info"
                  :icon="mdiEye"
                  small
                  @click="setAction1(posteUser)"
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
              v-for="page in pagesListFilter"
              :key="page"
              :active="page === currentPageFilter"
              :label="page + 1"
              :color="page === currentPageFilter ? 'lightDark' : 'whiteDark'"
              small
              @click="currentPageFilter = page"
            />
          </BaseButtons>
          <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
        </BaseLevel>
      </div>
    </CardBox>
  </CardBoxModal>

  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountSwitch"
        title="Postes de vos agents"
        main
      >
        <BaseButton
          target="_blank"
          label="Voir historique de poste d'un employe"
          color="contrast"
          @click="isModalPoste = true"
          rounded-full
          small
        />
        <BaseButton
          target="_blank"
          label="Poster Un employe"
          color="contrast"
          @click="isModalActive = true"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <Loader v-if="loading" />
      <CardBox class="mb-2" has-table v-else>
        <table>
          <thead>
            <tr>
              <th>Nom</th>

              <th>Phone</th>

              <th>Poste</th>
              <th>Type de Poste</th>
              <th>Date mise en poste</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="posteUser in itemsPaginated" :key="posteUser.id">
              <td data-label="nom">
                {{ posteUser.employe.nom }}
              </td>

              <td data-label="phone">
                {{ posteUser.employe.phone }}
              </td>

              <td data-label="poste">
                {{ posteUser.poste.libelle }}
              </td>
              <td data-label="typePoste">
                {{ posteUser.typePoste.libelle }}
              </td>

              <td data-label="date_poste">
                {{ posteUser.dateCreated.split("T")[0] }} a
                {{ posteUser.dateCreated.split("T")[1] }}
              </td>

              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    color="warning"
                    :icon="mdiGamepadCircle"
                    small
                    @click="setAction(posteUser)"
                  />

                  <BaseButton
                    color="info"
                    :icon="mdiEye"
                    small
                    @click="setAction1(posteUser)"
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
                :color="page === currentPage ? 'lightDark' : 'whiteDark'"
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
