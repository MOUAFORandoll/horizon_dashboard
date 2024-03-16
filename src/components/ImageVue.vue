<template>
  <div>
    <img :src="src" :class="{
      'bg-clip-border': true,
      'w-16': !isImageEnlarged,
      'md:w-32': !isImageEnlarged,
      'lg:w-48': !isImageEnlarged,
      'h-16': !isImageEnlarged,
      'md:h-32': !isImageEnlarged,
      'lg:h-48': !isImageEnlarged,
      'w-full': isImageEnlarged,
      'h-full': isImageEnlarged,
      'cursor-pointer': true
    }" @click="openModal" />

    <CardBoxModal v-model="showModal" title="Image agrandie">
      <img :src="src" @click="openModal" class=" max-h-96 overflow-y-auto w-full  " />
    </CardBoxModal>
  </div>
</template>

<script setup>
import { computed, ref } from "vue";
import CardBoxModal from "@/components/CardBoxModal.vue";
const props = defineProps({
  src: {
    type: String,
    default: null,
  },
});

const isImageEnlarged = ref(false);
const showModal = ref(false);

const src = computed(() =>
  props.src ? props.src : "https://srcs.dicebear.com/api/avataaars/example.svg?options[top][]=shortHair&options[accessoriesChance]=93"
);


const openModal = () => {

  showModal.value = !showModal.value;

};
</script>
