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
import NotificationBar from "@/components/NotificationBar.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import FormControl from "@/components/FormControl.vue";

import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";

import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
// import UserAvatar from "@/components/UserAvatar.vue";
import AsideMenuItem from "@/components/AsideMenuItem.vue";

import { useMainStore } from "@/stores/main";
import { onMounted, computed, ref } from "vue";
import { RequestApi } from "@/boot/RequestApi";

import FormField from "@/components/FormField.vue";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";
let request = new RequestApi();

const isModalCreateCB = ref(false);
const perPage = ref(5);
const currentPage = ref(0);
let listEmploye = ref([]);
let listPaiement = ref([]);
let listMois = ref([]);
let loading = ref(true);
let loadingAction = ref(false);
let mois = ref();
let salaire = ref("");

const mainStore = useMainStore();

async function creerPaiement() {
  let data = {
    datePaiement: new Date(),
    admin: "/api/user_plateforms/" + mainStore.id,
    employe: "/api/employes/" + employe.value.id,
    mois: "/api/mois/" + mois.value.id,
    montant: parseInt(salaire.value),
  };
  console.log(data);
  loadingAction.value = true;
  const response = await request.creerPaiement(data);
  if (response.status) {
    console.log(response.message);

    toast.success("Employe paye avec Succes !", {
      autoClose: 2000,
    });

    loadingAction.value = false;

    getlistPaiement();
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    loadingAction.value = false;
  }
}
async function getlistEmploye() {
  const response = await request.listEmploye();
  if (response.status) {
    response.data.forEach((element) => {
      listEmploye.value.push({
        id: element.id,
        label: element.nom + " " + element.prenom,
        salaire: element.salaire,
      });
    });
  } else {
  }
}

async function getlistPaiement() {
  const response = await request.listPaiement();
  if (response.status) {
    loading.value = false;

    listPaiement.value = response.data;
  } else {
    loading.value = false;
  }
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
    const currentMonth = now.getMonth() - 1 > 0 ? now.getMonth() : 12;
    mois.value = listMois.value.find((mois) => mois.id === currentMonth);
  } else {
  }
}
const itemsPaginated = computed(() =>
  listPaiement.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() =>
  Math.ceil(listPaiement.value.length / perPage.value)
);

const currentPageHuman = computed(() => currentPage.value + 1);

let employe = ref(null);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }
  console.log(pagesList);
  return pagesList;
});

onMounted(async () => {
  await getlistPaiement();
  await getlistEmploye();
  await getlistMois();
});
</script>

<template>
  <CardBoxModal
    v-model="isModalCreateCB"
    title="Creer un Paiement"
    bg="purplePink"
    button="danger"
  >
    <p>Vous allez payer un employe</p>

    <FormField label="Selectionner un employe">
      <FormControl
        placeholder="Selectionner un employe"
        v-model="employe"
        v-on:change="salaire = employe.salaire"
        :options="listEmploye"
      />
    </FormField>

    <FormField label="Selectionner le mois ">
      <FormControl v-model="mois" :options="listMois" />
    </FormField>
    <FormField label="Salaire ( En FCFA )">
      <FormControl v-model="salaire" :icon="mdiAccount" name="Salaire" />
    </FormField>

    <BaseButtons>
      <BaseButton
        @click="creerPaiement"
        type="submit"
        :loading="loadingAction"
        color="info"
        label="Creer"
      />
    </BaseButtons>
  </CardBoxModal>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountSwitch"
        title="Paiement vos employes"
        main
      >
        <BaseButton
          target="_blank"
          label="Creer un paiement"
          color="contrast"
          @click="isModalCreateCB = true"
          rounded-full
          small
        />
      </SectionTitleLineWithButton>

      <Loader v-if="loading" />
      <CardBox class="mb-2" has-table v-else>
        <table>
          <thead>
            <tr>
              <th>Nom Complet</th>
              <th>Phone</th>
              <th>Region de service</th>
              <th>Montant Paye</th>
              <th>Mois</th>
              <th>Date de paiement</th>
              <th>Paye par</th>
              <!-- <th>Action</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="paiement in itemsPaginated" :key="paiement.id">
              <td data-label="nom">
                {{ paiement.employe.prenom }} {{ paiement.employe.nom }}
              </td>

              <td data-label="phone">
                {{ paiement.employe.phone }}
              </td>

              <td data-label="region_de_service">
                {{ paiement.employe.regionDeService.libelle }}
              </td>

              <td data-label="montant">{{ paiement.montant }} FCFA</td>
              <td data-label="mois">
                {{ paiement.mois.libelle }}
              </td>
              <td data-label="date_paiement">
                {{ paiement.datePaiement.split("T")[0] }} a
                {{ paiement.datePaiement.split("T")[1].split("+")[0] }}
              </td>
              <td data-label="admin">
                {{ paiement.admin.prenom }} {{ paiement.admin.nom }}
              </td>

              <!-- <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    color="warning"
                    :icon="mdiGamepadCircle"
                    small
                    @click="setAction(user)"
                  />

                  <BaseButton
                    color="info"
                    :icon="mdiEye"
                    small
                    @click="setAction1(user)"
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
