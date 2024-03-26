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
const isModalStateUser = ref(false);
const isModalCreateCB = ref(false);
const perPage = ref(5);
const currentPage = ref(0);
let listEmploye = ref([]);
let loading = ref(true);
let loadingAction = ref(false);
let name = ref("");
let surname = ref("");
let phone = ref("");
let salaire = ref("");
let dateStart = ref();
let heureArrive = ref();

const mainStore = useMainStore();

async function creerEmploye() {
  let data = {
    nom: name.value,
    phone: phone.value,
    prenom: surname.value,
    datePriseFonction: dateStart.value,
    admin: "/api/user_plateforms/" + mainStore.id,

    regionDeService: "/api/region_services/1",
    salaire: parseInt(salaire.value),
  };
  console.log(data);
  loadingAction.value = true;
  const response = await request.creerEmploye(data);
  if (response.status) {
    console.log(response.message);

    toast.success("Employe ajoute avec Succes !", {
      autoClose: 2000,
    });

    loadingAction.value = false;

    getlistEmploye();
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
    loading.value = false;
    listEmploye.value = response.data;
  } else {
    loading.value = false;
  }
}
const itemsPaginated = computed(() =>
  listEmploye.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() =>
  Math.ceil(listEmploye.value.length / perPage.value)
);

const currentPageHuman = computed(() => currentPage.value + 1);
let listMissions = ref([]);
let mission = ref(null);

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
  await getlistEmploye();
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
  isModalStateUser.value = true;
  console.log(_seletUser.value);
}

const marquerAbesent = async () => {
  loadingAction.value = true;
  let data = {
    heureArrive: heureArrive.value,
    employe: "/api/employes/" + _seletUser.value.id,
    date: new Date(),
  };
  const response = await request.marquerAbesent(data);
  if (response.status) {
    await getlistEmploye();
    toast.success("Succes !", {
      autoClose: 2000,
    });

    loadingAction.value = false;
    isModalActive.value = false;
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    loadingAction.value = false;
  }
};

function setAction3(user) {
  _seletUser.value = user;
  isModalPassword.value = true;
  console.log(_seletUser.value);
  newPass.value = "";
}
</script>

<template>
  <CardBoxModal
    v-model="isModalActive"
    v-if="_seletUser != null"
    title="Marquer absence"
  >
    <p>
      Vous allez marquer absent
      <b>{{ _seletUser.nom }}</b>
    </p>
    <FormField label="Heure d'arrive">
      <FormControl
        type="time"
        placeholder="Heure d'arrive"
        v-model="heureArrive"
      />
    </FormField>

    <BaseButton
      target="_blank"
      :loading="loadingAction"
      :icon="mdiCogOutline"
      label="Enregistrer"
      color="bg-blue-400"
      small
      @click="marquerAbesent"
    />
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalStateUser"
    v-if="_seletUser != null"
    title="Les absences"
    button="danger"
  >
    <p>
      Voici les absences de

      <b>{{ _seletUser.nom }} {{ _seletUser.prenom }}</b> :
    </p>

    <div>
      <ul>
        <li v-for="items in _seletUser.absences">
          <b>
            Le {{ items.date.split("T")[0] }} a
            {{ items.heure_arrive.split("T")[1].split("+")[0] }}
          </b>
        </li>
      </ul>
    </div>
  </CardBoxModal>
  <CardBoxModal
    v-model="isModalCreateCB"
    title="Creer un employe"
    bg="purplePink"
    button="danger"
  >
    <p>Vous allez creer ajouter employe</p>

    <FormField label="Nom">
      <FormControl v-model="name" :icon="mdiAccount" />
    </FormField>
    <FormField label="Prenom">
      <FormControl v-model="surname" :icon="mdiAccount" />
    </FormField>
    <FormField label="Phone">
      <FormControl v-model="phone" :icon="mdiAccount" name="login" />
    </FormField>
    <FormField label="Salaire">
      <FormControl v-model="salaire" :icon="mdiAccount" name="Salaire" />
    </FormField>

    <FormField label="Date de prise de fonction">
      <FormControl
        :icon="mdiAccount"
        v-model="dateStart"
        type="date"
        name="Date de prise de fonction"
      />
    </FormField>

    <!-- <FormCheckRadio v-model="remember" name="remember" label="Remember" :input-value="true" /> -->

    <BaseButtons>
      <BaseButton
        @click="creerEmploye"
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
        title="Employes"
        main
      >
        <BaseButton
          target="_blank"
          label="Ajouter Un employe"
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
              <th>Nom</th>
              <th>Preom</th>

              <th>Phone</th>

              <th>Region de service</th>

              <th>Matricule</th>
              <th>Nombre d'absence Total</th>
              <th>Salaire</th>
              <th>Date de prise de fonction</th>
              <th>Date d'ajout</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in itemsPaginated" :key="user.id">
              <td data-label="nom">
                {{ user.nom }}
              </td>
              <td data-label="prenom">
                {{ user.prenom }}
              </td>

              <td data-label="phone">
                {{ user.phone }}
              </td>

              <td data-label="region_de_service">
                {{ user.regionDeService.libelle }}
              </td>

              <td data-label="matricule">
                {{ user.matricule }}
              </td>
              <td data-label="absences">
                {{ user.absences.length }}
              </td>
              <td data-label="salaire">
                {{ user.salaire }}
              </td>
              <td data-label="date_start">
                {{ user.datePriseFonction.split("T")[0] }}
              </td>
              <td data-label="date_created">
                {{ user.date_created }}
              </td>

              <td class="before:hidden lg:w-1 whitespace-nowrap">
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
