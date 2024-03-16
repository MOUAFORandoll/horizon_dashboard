<script setup>
import {
  mdiMonitorCellphone,
  mdiTableBorder,
  mdiTableOff,
  mdiGithub,
} from "@mdi/js";
import SectionMain from "@/components/SectionMain.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import CardBox from "@/components/CardBox.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxComponentEmpty from "@/components/CardBoxComponentEmpty.vue";

import { onMounted, ref } from "vue";
import { RequestApi } from "@/boot/RequestApi";

let listCommandes = ref([]);
let loading = ref(true);
let loadingUpdate = ref(false);
let isInfo = ref(false);
let isCommandes = ref(false);
let commande = ref({ nom: "MOuafo" });
let produits = ref([]);

onMounted(async () => {
  await getCommandesList();
});

async function getCommandesList() {
  const response = await request.getCommandesListAction();
  if (response.status) {
    loading.value = false;
    listCommandes.value = response.data;
  } else {
    loading.value = false;
    // toast.error(`Erreur lors de la recuperation de vos clients`, {
    //   // override the global option
    //   position: "bottom", maxToasts: true
    // });
  }
  console.log(listCommandes.value);
}

async function selectCommande(commandeSeclect) {
  commande.value = commandeSeclect;
}

const getCommandeproduits = async () => {
  isInfo.value = true;
  produits.value = commande.value.produits;
  console.log(produits.value);
};
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiTableBorder" title="Commandes" main>
        <!-- <BaseButton
          href="https://github.com/justboil/admin-one-vue-tailwind"
          target="_blank"
          :icon="mdiGithub"
          label="Star on GitHub"
          color="contrast"
          rounded-full
          small
        /> -->
      </SectionTitleLineWithButton>

      <CardBox class="mb-6" has-table>
        <TableSampleClients checkable />
      </CardBox>
    </SectionMain>
  </LayoutAuthenticated>
</template>
