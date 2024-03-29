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
const isModalActiveNewSanction = ref(false);
const isModalSanction = ref(false);
const isModalCreateCB = ref(false);
const perPage = ref(5);
const perPageFilter = ref(5);
const currentPage = ref(0);
const currentPageFilter = ref(0);
let listEmploye = ref([]);
let listSanctionEmploye = ref([]);
let listSanctionEmployeFilter = ref([]);
let listMois = ref([]);
let listSanction = ref([]);
let loading = ref(true);
let loadingAction = ref(false);
let employe = ref("");
let sanction = ref("");
let titresanction = ref("");
let montantsanction = ref(0);
let mois = ref();

const itemsPaginatedFilter = computed(() =>
  listSanctionEmployeFilter.value.slice(
    perPageFilter.value * currentPageFilter.value,
    perPageFilter.value * (currentPageFilter.value + 1)
  )
);

const numPagesFilter = computed(() =>
  Math.ceil(listSanctionEmploye.value.length / perPageFilter.value)
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
  const response = await request.listEmployeSecond();
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
async function getSanctionEmploye() {
  const response = await request.listSanctionEmploye();
  if (response.status) {
    // loading.value = false;
    listSanctionEmploye.value = response.data;
  } else {
    // loading.value = false;
  }
}
async function getlistSanction() {
  const response = await request.listSanction();
  if (response.status) {
    // loading.value = false;

    response.data.forEach((element) => {
      listSanction.value.push({
        id: element.id,
        label: element.libelle,
      });
    });
  } else {
    // loading.value = false;
  }
}
const itemsPaginated = computed(() =>
  listSanctionEmploye.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() =>
  Math.ceil(listSanctionEmploye.value.length / perPage.value)
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
  await getlistMois();
  await getlistSanction();
  await getlistEmploye();
  await getSanctionEmploye();
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
  isModalSanction.value = true;
  console.log(_seletUser.value);
}

async function getlistMois() {
  const response = await request.listMois();
  if (response.status) {
    response.data.forEach((element) => {
      listMois.value.push({
        id: element.id,
        label: element.libelle,
      });
    });
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    mois.value = listMois.value.find((mois) => mois.id === currentMonth);
  } else {
  }
}
const giveSanction = async () => {
  loadingAction.value = true;
  let data = {
    sanction: "/api/sanctions/" + sanction.value.id,

    employe: "/api/employes/" + employe.value.id,
    mois: "/api/mois/" + mois.value.id,
  };
  const response = await request.giveSanction(data);
  if (response.status) {
    toast.success("Succes !", {
      autoClose: 2000,
    });
    await getSanctionEmploye();
    loadingAction.value = false;
    isModalActive.value = false;
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    loadingAction.value = false;
  }
};
const newSanction = async () => {
  loadingAction.value = true;
  let data = {
    libelle: titresanction.value,
    montant: parseInt(montantsanction.value),
  };
  const response = await request.newSanction(data);
  if (response.status) {
    toast.success("Succes !", {
      autoClose: 2000,
    });
    await getlistSanction();
    loadingAction.value = false;
    isModalActive.value = false;
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    loadingAction.value = false;
  }
};
const SanctionEmployeFilter = async () => {
  listSanctionEmployeFilter.value = [];
  loadingAction.value = true;

  const response = await request.listSanctionEmployeFilter(employe.value.id);
  if (response.status) {
    listSanctionEmployeFilter.value = response.data;

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
  <CardBoxModal
    v-model="isModalActiveNewSanction"
    title="Creer une nouvelle sanction"
  >
    <p>
      Vous allez
      <b>creer un nouveau sanction</b>
    </p>

    <FormField label="Titre de la sanction ">
      <FormControl v-model="titresanction" :icon="mdiAccount" />
    </FormField>
    <FormField label="Montant de la sanction ">
      <FormControl v-model="montantsanction" :icon="mdiAccount" />
    </FormField>

    <BaseButton
      target="_blank"
      :loading="loadingAction"
      :icon="mdiCogOutline"
      label="Creer"
      color="bg-blue-400"
      small
      @click="newSanction"
    />
  </CardBoxModal>
  <CardBoxModal v-model="isModalActive" title="Sanctioner un employe">
    <p>
      Vous allez
      <b>Modifier le sanction journalier d'un employe</b>
    </p>
    <FormField label="Selectionner un employe ">
      <FormControl v-model="employe" :options="listEmploye" />
    </FormField>
    <FormField label="Selectionner le sanction ">
      <FormControl v-model="sanction" :options="listSanction" />
    </FormField>

    <BaseButton
      target="_blank"
      :loading="loadingAction"
      :icon="mdiCogOutline"
      label="Sanctionner"
      color="bg-blue-400"
      small
      @click="giveSanction"
    />
  </CardBoxModal>
  <CardBoxModal
    v-model="isModalSanction"
    title="Chercher les sanctions d'un employe"
  >
    <p>
      Selectionner l'employe
      <b>dont vous voulez l'historique de sanctions</b>
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
      @click="SanctionEmployeFilter"
    />

    <Loader v-if="loadingAction" />
    <CardBox class="mb-2" has-table v-else>
      <table>
        <thead>
          <tr>
            <th>Nom</th>

            <th>Phone</th>

            <th>Sanction</th>
            <th>Montant de la Sanction</th>
            <th>Mois de la Sanction</th>
            <th>Date de sanction</th>
            <!-- <th>Action</th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="sanctionUser in itemsPaginatedFilter"
            :key="sanctionUser.id"
          >
            <td data-label="nom">
              {{ sanctionUser.employe.nom }}
            </td>

            <td data-label="phone">
              {{ sanctionUser.employe.phone }}
            </td>

            <td data-label="sanction">
              {{ sanctionUser.sanction.libelle }}
            </td>
            <td data-label="montant">
              {{ sanctionUser.sanction.montant }}
            </td>
            <td data-label="mois">
              {{ sanctionUser.mois.libelle }}
            </td>

            <td data-label="date_sanction">
              {{ sanctionUser.dateCreated.split("T")[0] }} a
              {{ sanctionUser.dateCreated.split("T")[1] }}
            </td>
            <!-- 
            <td class="before:hidden lg:w-1 whitespace-nowrap">
              <BaseButtons type="justify-start lg:justify-end" no-wrap>
                <BaseButton
                  color="warning"
                  :icon="mdiGamepadCircle"
                  small
                  @click="setAction(sanctionUser)"
                />

                <BaseButton
                  color="info"
                  :icon="mdiEye"
                  small
                  @click="setAction1(sanctionUser)"
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
        title="Sanctions"
        main
      >
        <BaseButton
          target="_blank"
          label="Voir historique de sanction d'un employe"
          color="contrast"
          @click="isModalSanction = true"
          rounded-full
          small
        />
        <BaseButton
          target="_blank"
          label="Nouvelle sanction"
          color="contrast"
          @click="isModalActiveNewSanction = true"
          rounded-full
          small
        />
        <BaseButton
          target="_blank"
          label="Sanctioner Un employe"
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

              <th>Sanction</th>
              <th>Montant de la Sanction</th>
              <th>Mois de la Sanction</th>
              <th>Date de sanction</th>
              <!-- <th>Action</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="sanctionUser in itemsPaginated" :key="sanctionUser.id">
              <td data-label="nom">
                {{ sanctionUser.employe.nom }}
              </td>

              <td data-label="phone">
                {{ sanctionUser.employe.phone }}
              </td>

              <td data-label="sanction">
                {{ sanctionUser.sanction.libelle }}
              </td>
              <td data-label="montant">
                {{ sanctionUser.sanction.montant }}
              </td>
              <td data-label="mois">
                {{ sanctionUser.mois.libelle }}
              </td>

              <td data-label="date_sanction">
                {{ sanctionUser.dateCreated.split("T")[0] }} a
                {{ sanctionUser.dateCreated.split("T")[1] }}
              </td>
              <!-- <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    color="warning"
                    :icon="mdiGamepadCircle"
                    small
                    @click="setAction(sanctionUser)"
                  />

                  <BaseButton
                    color="info"
                    :icon="mdiEye"
                    small
                    @click="setAction1(sanctionUser)"
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
