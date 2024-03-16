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
<style></style>
<template>
  <div class="bg-gray-100 p-8 rounded-lg px-auto max-w-10xl">
    <h1 class="text-3xl font-bold border-b-2 border-gray-300 pb-2 mb-6">
      Politique de Confidentialité de l'Application Camerounaise Horizon
    </h1>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Informations que nous collectons</h2>

      <li class="font-bold">Informations personnelles</li>
      <p class="mb-4">
        Lorsque vous utilisez l'Application, nous pouvons collecter des
        informations personnelles telles que votre nom, adresse, numéro de
        téléphone, adresse e-mail, et d'autres informations similaires
        nécessaires pour la livraison des colis.
      </p>
      <p class="mt-4">
        Ces informations peuvent être collectées lors de la création d'un compte
        ou lors de l'utilisation des fonctionnalités de l'Application.
      </p>
      <li>Informations de localisation</li>
      <p class="mt-4">
        Afin de faciliter la livraison des colis, nous pouvons collecter des
        informations de localisation en temps réel à partir de votre appareil
        mobile ou de votre navigateur. Vous avez la possibilité de désactiver le
        suivi de la localisation à tout moment via les paramètres de votre
        appareil.
      </p>

      <li>Informations sur l'appareil</li>
      <p class="mt-4">
        Nous pouvons également collecter des informations sur votre appareil,
        telles que le modèle, la version du système d'exploitation,
        l'identifiant unique de l'appareil, et d'autres données similaires pour
        améliorer votre expérience utilisateur.
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">
        Comment nous utilisons vos informations
      </h2>
      <p class="mb-4">
        Nous utilisons les informations que nous collectons pour:
      </p>

      <li>Faciliter la livraison des colis.</li>
      <li>Personnaliser et améliorer votre expérience utilisateur.</li>
      <li>
        Communiquer avec vous au sujet des mises à jour, promotions et offres
        spéciales.
      </li>
      <li>Assurer la sécurité de nos services et de nos utilisateurs.</li>
      <li>Enregistrer les factures</li>
      <li>Répondre à vos questions et demandes d'assistance.</li>
    </section>

    <section class="mb-8">
      <h2 class="text-2xl font-bold mb-4">Partage d'informations</h2>
      <p class="mt-4">
        Nous pouvons partager vos informations personnelles avec:
      </p>

      <li>
        Les prestataires de services tiers qui facilitent la livraison des
        colis.
      </li>
      <li>Les autorités gouvernementales en cas d'obligation légale.</li>

      <p class="mt-4">
        Nous ne vendons pas, louons ou échangeons vos informations personnelles
        à des tiers à des fins de marketing.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-4">Sécurité des données</h2>
      <p class="mt-4">
        Nous prenons des mesures raisonnables pour protéger vos informations
        personnelles contre tout accès non autorisé, utilisation, altération ou
        destruction.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-4">Vos choix</h2>
      <p class="mt-4">
        Vous pouvez choisir de ne pas fournir certaines informations
        personnelles, mais cela peut affecter votre utilisation de l'Application
        et la livraison des colis.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-4">
        Modifications de la politique de confidentialité
      </h2>
      <p class="mt-4">
        Nous nous réservons le droit de mettre à jour cette politique de
        confidentialité à tout moment. Toute modification sera publiée sur cette
        page et prendra effet immédiatement.
      </p>
    </section>

    <section>
      <h2 class="text-2xl font-bold mb-4">Nous contacter</h2>
      <p class="mt-4">
        Si vous avez des questions ou des préoccupations concernant notre
        politique de confidentialité, veuillez nous contacter à 237 690-863-838.
      </p>
    </section>
  </div>
</template>
