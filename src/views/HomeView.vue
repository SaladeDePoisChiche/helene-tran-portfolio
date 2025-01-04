<script setup lang="ts">
import ExpericeGallery from '../components/ExperienceGallery.vue';
</script>

<template>
  <main class='title'>
    Helene TRAN
    <ExpericeGallery expTitle="ARLES" expDates="08-2024" 
      expDescription="Arles c'est une belle ville quand même !"
      />

    <ExpericeGallery expTitle="LOMO" expDates="08-2024" 
    expDescription="Arles c'est une belle ville quand même !" 
    />
  </main>
</template>

<style scoped>
.title {
    font-family: 'LeagueGothicSatoshi', Arial, sans-serif;
  /* font-family: 'Times New Roman', Times, serif; */
  color: blue;
}
</style>
