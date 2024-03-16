<script setup>
import { computed, ref, watch } from "vue";
import { mdiEye, mdiTrashCan } from "@mdi/js";
import CardBoxModal from "@/components/CardBoxModal.vue";
import TableCheckboxCell from "@/components/TableCheckboxCell.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import BaseButtons from "@/components/BaseButtons.vue";
import BaseButton from "@/components/BaseButton.vue";
import UserAvatar from "@/components/UserAvatar.vue";
const props = defineProps({
  listCommandes: {
    type: Array,
    required: true,
  },
});

const isModalActive = ref(false);

const isModalDangerActive = ref(false);

const perPage = ref(5);

const currentPage = ref(0);
let items = ref(props.listCommandes);

// Watch for changes in the listCommandes prop
watch(() => props.listCommandes, () => {
  // Update the items.value when the prop value changes
  items.value.value = props.listCommandes;
});

console.log(items.value);
const itemsPaginated = computed(() =>
  items.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1)
  )
);

const numPages = computed(() => Math.ceil(items.value.length / perPage.value));

const currentPageHuman = computed(() => currentPage.value + 1);

const pagesList = computed(() => {
  const pagesList = [];

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i);
  }

  return pagesList;
});

</script>

<template>
  <CardBoxModal v-model="isModalActive" title="Sample modal">
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal v-model="isModalDangerActive" title="Please confirm" button="danger" has-cancel>
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>


  <table>
    <thead>
      <tr>

        <th />
        <th>Code de la Commande</th>
        <th>Point de livraison</th>
        <th>Jour</th>

        <th>Progress</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="commande in itemsPaginated" :key="commande.id">

        <td class="border-b-0 lg:w-6 before:hidden">
          <UserAvatar :username="commande.name" class="w-24 h-24 mx-auto lg:w-6 lg:h-6" />
        </td>
        <td data-label="codeCommande">
          {{ commande.codeCommandes }}
        </td>
        <td data-label="point_livraison">
          {{ commande.point_livraison }}
        </td>
        <td data-label="date">
          {{ commande.date }}
        </td>
        <td data-label="Progress">
          {{ commande.status }}
        </td>
        <!-- <td data-label="Progress" class="lg:w-32">
          <progress class="flex w-2/5 self-center lg:w-full" max="100" :value="commande.progress">
            {{ commande.progress }}
          </progress>
        </td> -->
        <td data-label="Created" class="lg:w-1 whitespace-nowrap">
          <small class="text-gray-500 dark:text-slate-400" :title="commande.created">{{ commande.created }}</small>
        </td>
        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton color="info" :icon="mdiEye" small @click="isModalActive = true" />
            <BaseButton color="danger" :icon="mdiTrashCan" small @click="isModalDangerActive = true" />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton v-for="page in pagesList" :key="page" :active="page === currentPage" :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'" small @click="currentPage = page" />
      </BaseButtons>
      <small>Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
