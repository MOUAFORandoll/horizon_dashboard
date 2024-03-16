<script setup>
import { mdiCog } from "@mdi/js";
import CardBox from "@/components/CardBox.vue";
import NumberDynamic from "@/components/NumberDynamic.vue";
import BaseIcon from "@/components/BaseIcon.vue";
import BaseLevel from "@/components/BaseLevel.vue";
import PillTagTrend from "@/components/PillTagTrend.vue";
import BaseButton from "@/components/BaseButton.vue";

defineProps({
  isModalProjetActive: {
    type: Boolean,
       default: false,


  },
});
</script>

<template>
  <CardBoxModal  :modelValue="isModalProjetActive"
      @update:modelValue="isModalProjetActive = $event"  >
    

        <CardBox  >
        

      <Loader  />
       

        </CardBox>
     
      </CardBoxModal>
</template>
