<script setup>
import { computed, ref, onMounted } from "vue";
import { useMainStore } from "@/stores/main";
import {
  mdiAccountMultiple,
  mdiCartOutline,
  mdiChartTimelineVariant,
  mdiMonitorCellphone,
  mdiReload,
  mdiChartPie,
} from "@mdi/js";
import * as chartConfig from "@/components/Charts/chart.config.js";
import LineChart from "@/components/Charts/LineChart.vue";
import SectionMain from "@/components/SectionMain.vue";
import CardBoxWidget from "@/components/CardBoxWidget.vue";
import CardBox from "@/components/CardBox.vue";
import TableSampleClients from "@/components/TableSampleClients.vue";
import NotificationBar from "@/components/NotificationBar.vue";
import BaseButton from "@/components/BaseButton.vue";
import CardBoxTransaction from "@/components/CardBoxTransaction.vue";
import CardBoxClient from "@/components/CardBoxClient.vue";
import LayoutAuthenticated from "@/layouts/LayoutAuthenticated.vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import { RequestApi } from "@/boot/RequestApi";
let request = new RequestApi();
import router from "@/router";

const chartData = ref(null);
const dashData = ref({ nbr_Missions: 0, nbr_commandes: 0, nbr_livraisons: 0 });

const fillChartData = () => {
  chartData.value = chartConfig.sampleChartData();
};

const mainStore = useMainStore();

const clientBarItems = computed(() => mainStore.clients.slice(0, 4));

const transactionBarItems = computed(() => mainStore.history);
onMounted(async () => {
  // await getDashBoard();
  fillChartData();
});

let loading = ref(true);
let reloading = ref(true);
async function getDashBoard() {
  await request.getListAllTransaction();
  dashData.value = {
    nbr_Missions: mainStore.listProjet.length,
    nbr_Livraisons: mainStore.listLivraisons.length,
  };
}
function projet() {
  console.log("------");
  router.push("utilisateurs");
}
function commande() {
  console.log("------");
  router.push("commandes");
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton
        :icon="mdiChartTimelineVariant"
        title="DashBoard"
        main
      >
        <BaseButton
          target="_blank"
          :icon="mdiReload"
          label="Actualise"
          color="contrast"
          rounded-full
          small
          @click="getDashBoard"
        />
      </SectionTitleLineWithButton>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <CardBoxWidget
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="dashData.nbr_Missions"
          label="Missions"
          :navigate="projet"
        />
        <CardBoxWidget
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="dashData.nbr_Livraisons"
          label="Biker"
          :navigate="boutique"
        />
        <CardBoxWidget
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="dashData.nbr_commandes"
          :navigate="commande"
          label="Controlleur disponibles"
        />
        <CardBoxWidget
          trend-type="up"
          color="text-emerald-500"
          :icon="mdiAccountMultiple"
          :number="dashData.nbr_livraisons"
          suffix=""
          :navigate="projet"
          label="Controlleur sur le terrain"
        />
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
