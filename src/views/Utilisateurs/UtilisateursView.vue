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

const isModalActive = ref(false);
const isModalPassword = ref(false);
const isModalStateUser = ref(false);
const isModalCreateCB = ref(false);
const perPage = ref(5);
const currentPage = ref(0);
let listUsers = ref([]);
let listBikers = ref([]);
let listCTerrain = ref([]);
let listCbureau = ref([]);
let listAdmin = ref([]);
let listUsersSave = ref([]);
let loading = ref(true);
let loadingUpdate = ref(false);
let reloading = ref(true);
let name = ref("");
let phone = ref("");
let password = ref("");
const mainStore = useMainStore();

async function creerController() {
  let data = {
    nom: name.value,
    phone: phone.value,
    password: password.value,
  };
  loading.value = true;
  const response = await request.NewControllerBureau(data);
  if (response.status) {
    console.log(response.message);
    if (response.message != "") {
      toast.info(response.message, {
        autoClose: 2000,
      });
      loading.value = false;
    } else {
      toast.success("Succes !", {
        autoClose: 2000,
      });
      typeUser.value = 2;
      getData();
      isModalCreateCB.value = false;
      loading.value = false;
    }
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    loading.value = false;
  }
}
async function getListBiker() {
  const response = await request.getListBiker();
  if (response.status) {
    loading.value = false;
    listUsers.value = response.data;
  } else {
    loading.value = false;
  }
}
async function getListCTerrain() {
  const response = await request.getListCTerrain();
  if (response.status) {
    loading.value = false;
    listUsers.value = response.data;
  } else {
    loading.value = false;
  }
}
async function getListCBureau() {
  const response = await request.getListCBureau();
  if (response.status) {
    loading.value = false;
    listUsers.value = response.data;
  } else {
    loading.value = false;
  }
}
async function getListAdmin() {
  const response = await request.getListAdmin();
  if (response.status) {
    loading.value = false;
    listUsers.value = response.data;
  } else {
    loading.value = false;
  }
}
const itemsPaginated = computed(() =>
  listUsers.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() =>
  Math.ceil(listUsers.value.length / perPage.value)
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

onMounted(async () => {
  getData();

  await getMissionsList();
});

async function getMissionsList() {
  const response = await request.ListMission();
  if (response.status) {
    reloading.value = false;
    loading.value = false;
    response.data.forEach((element) => {
      listMissions.value.push({ id: element.id, label: element.libelle });
    });
    console.log(listMissions.value);
  } else {
    reloading.value = false;
    loading.value = false;
  }
}
let typeUser = ref(4);

async function setType(typeselect) {
  console.log("---user", typeselect);

  typeUser.value = typeselect;

  listUsers.value = [];
  getData();
}

function getData() {
  loading.value = true;
  currentPage.value = 0;

  if (typeUser.value == 1) {
    getListAdmin();
  } else if (typeUser.value == 2) {
    getListCBureau();
  } else if (typeUser.value == 3) {
    getListCTerrain();
  } else {
    getListBiker();
  }
}

let _seletUser = ref();
function setAction(user) {
  console.log(user);
  console.log("---user");
  _seletUser.value = user;
  isModalActive.value = true;
  console.log(_seletUser.value);
}

const stateClient = async () => {
  loadingUpdate.value = true;

  const response = await request.makeClientAction(_seletUser.value.keySecret);
  if (response.status) {
    getData();
    getData();
    isModalActive.value = false;
    loadingUpdate.value = false;
  } else {
    loadingUpdate.value = false;
  }
};

const makeAdmin = async () => {
  loadingUpdate.value = true;

  const response = await request.makeAdminAction(_seletUser.value.keySecret);
  if (response.status) {
    getData();
    getData();
    loadingUpdate.value = false;
    isModalActive.value = false;
  } else {
    loadingUpdate.value = false;
  }
};
function setAction2(user) {
  _seletUser.value = user;
  isModalStateUser.value = true;
  console.log(_seletUser.value);
}

const stateUserAction = async () => {
  loadingUpdate.value = true;
  let data = {
    keySecretCbureau: localStorage.getItem("keySecret"),
    keySecret: _seletUser.value.keySecret,
  };
  const response = await request.ActivateBiker(data);
  if (response.status) {
    toast.success("Succes !", {
      autoClose: 2000,
    });
    getData();
    loadingUpdate.value = false;
    isModalStateUser.value = false;
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    loadingUpdate.value = false;
  }
};

const affectBikerToMission = async () => {
  loadingUpdate.value = true;
  let data = {
    keySecretCbureau: localStorage.getItem("keySecret"),
    keySecret: _seletUser.value.keySecret,
    mission_id: mission.value.id,
  };
  const response = await request.AffectBikerToMission(data);
  if (response.status) {
    toast.success("Succes !", {
      autoClose: 2000,
    });
    getData();
    loadingUpdate.value = false;
    isModalStateUser.value = false;
  } else {
    toast.error("Une erreur est survenue !", {
      autoClose: 2000,
    });
    loadingUpdate.value = false;
  }
};

function setAction3(user) {
  _seletUser.value = user;
  isModalPassword.value = true;
  console.log(_seletUser.value);
  newPass.value = "";
}

let newPass = ref("fdfdfd");

const resetPasswordUserAction = async () => {
  loadingUpdate.value = true;

  const response = await request.resetPasswordUserAction(
    _seletUser.value.keySecret
  );
  console.log(response);
  if (response.status) {
    newPass.value = response.password;

    getData();
    loadingUpdate.value = false;
  } else {
    loadingUpdate.value = false;
  }
};
const copyText = (missionE) => {
  mission.value = missionE;
  console.log(mission);
  navigator.clipboard
    .writeText(newPass.value)
    .then(() => {
      console.log("Text copied!");
    })
    .catch((error) => {
      console.error("Copy failed:", error);
    });
};
</script>

<template>
  <CardBoxModal
    v-model="isModalActive"
    v-if="_seletUser != null"
    title="Affecter la mission"
  >
    <FormField label="Selectionner une mission">
      <FormControl
        placeholder="Selectionner une mission"
        v-model="mission"
        :options="listMissions"
      />
    </FormField>

    <BaseButton
      target="_blank"
      :loading="loadingUpdate"
      :icon="mdiCogOutline"
      label="Affecter"
      color="bg-blue-400"
      small
      @click="affectBikerToMission"
    />
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalStateUser"
    v-if="_seletUser != null"
    title="Status du compte"
    button="danger"
  >
    <p>
      Vous allez
      {{ _seletUser.status == true ? "desactiver" : "activer" }} Le
      {{
        _seletUser.typeUser == 1
          ? "Admin"
          : _seletUser.typeUser == 2
          ? "Controller de bureau"
          : _seletUser.typeUser == 2
          ? "Controller de terrain"
          : "Biker"
      }}
      <b>{{ _seletUser.nom }}</b>
    </p>

    <BaseButton
      label="Confirmer"
      :loading="loadingUpdate"
      color="info"
      @click="stateUserAction"
    />
  </CardBoxModal>
  <CardBoxModal
    v-model="isModalPassword"
    v-if="_seletUser != null"
    title="Mot de passe"
    button="danger"
  >
    <p>
      Vous allez reinitialiser le mot de passe du compte de
      <b>{{ _seletUser.nom }}</b> au numero <b>{{ _seletUser.phone }}</b>
    </p>

    <BaseButton
      label="Reinitialiser"
      :loading="loadingUpdate"
      color="info"
      @click="resetPasswordUserAction"
    />
    <p v-if="newPass != ''">
      Voici le nouveau mot de passe du compte de
      <b>{{ _seletUser.nom }}</b> : {{ newPass }}
      <BaseButton
        @click="copyText"
        target="_blank"
        :icon="mdiContentCopy"
        label="Copy"
        color="contrast"
        rounded-full
        small
      />
    </p>
  </CardBoxModal>
  <CardBoxModal
    v-model="isModalCreateCB"
    title="Creer un nouveau controller de bureau"
    bg="purplePink"
    button="danger"
  >
    <p>Vous allez creer un controller de bureau</p>

    <FormField
      label="Nom du controller"
      help="Please enter the controller name"
    >
      <FormControl v-model="name" :icon="mdiAccount" />
    </FormField>
    <FormField label="Login Phone" help="Please enter your phone">
      <FormControl
        v-model="phone"
        :icon="mdiAccount"
        name="login"
        autocomplete="username"
      />
    </FormField>

    <FormField label="Password" help="Please enter the password">
      <FormControl
        v-model="password"
        :icon="mdiAsterisk"
        type="password"
        name="password"
        autocomplete="current-password"
      />
    </FormField>

    <!-- <FormCheckRadio v-model="remember" name="remember" label="Remember" :input-value="true" /> -->

    <BaseButtons>
      <BaseButton
        @click="creerController"
        type="submit"
        :loading="loading"
        color="info"
        label="Creer"
      />
    </BaseButtons>
  </CardBoxModal>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiAccountSwitch"
        title="Utilisateurs"
        main
      >
        <BaseButton
          @click="setType(4)"
          target="_blank"
          label="Bikers"
          :color="typeUser == 4 ? 'bg-blue-900' : 'contrast'"
          rounded-full
          small
        />
        <BaseButton
          @click="setType(3)"
          target="_blank"
          label="Controlleurs Terrains"
          :color="typeUser == 3 ? 'bg-blue-900' : 'contrast'"
          rounded-full
          small
        />
        <BaseButton
          @click="setType(2)"
          target="_blank"
          label="Controlleurs Bureau"
          :color="typeUser == 2 ? 'bg-blue-900' : 'contrast'"
          rounded-full
          small
        />
        <BaseButton
          @click="setType(1)"
          target="_blank"
          label="Administrateur"
          :color="typeUser == 1 ? 'bg-blue-900' : 'contrast'"
          rounded-full
          small
        />

        <BaseButton
          target="_blank"
          label="Ajouter Controleur de Bureau"
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

              <th>Phone</th>
              <th>Solde</th>
              <th>Ville</th>
              <th>Status du Compte</th>
              <th>Type Utilisateur</th>
              <th>Date de Creation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in itemsPaginated" :key="user.id">
              <td data-label="nom">
                {{ user.nom }}
              </td>

              <td data-label="phone">
                {{ user.phone }}
              </td>
              <td data-label="solde">{{ user.solde }} XAF</td>
              <td data-label="Ville">
                {{ "Douala" }}
              </td>
              <td data-label="status">
                {{ user.status == true ? "Actif" : "Inactif" }}
              </td>
              <td data-label="type_user">
                {{
                  user.typeUser == 1
                    ? "Admin"
                    : user.typeUser == 2
                    ? "Controller de bureau"
                    : user.typeUser == 2
                    ? "Controller de terrain"
                    : "Biker"
                }}
              </td>
              <td data-label="date">
                {{ user.date_created }}
              </td>

              <td class="before:hidden lg:w-1 whitespace-nowrap">
                <BaseButtons type="justify-start lg:justify-end" no-wrap>
                  <BaseButton
                    color="info"
                    :icon="mdiGamepadCircle"
                    small
                    @click="setAction(user)"
                  />

                  <BaseButton
                    color="warning"
                    :icon="mdiLock"
                    v-if="user.typeUser == 4"
                    small
                    @click="setAction3(user)"
                  />
                  <BaseButton
                    color="danger"
                    :icon="mdiAccountAlertOutline"
                    small
                    @click="setAction2(user)"
                  />
                  <BaseButton
                    color="info"
                    :icon="mdiEye"
                    small
                    @click="setAction2(user)"
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
