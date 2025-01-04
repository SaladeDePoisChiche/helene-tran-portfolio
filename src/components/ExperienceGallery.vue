<script setup lang="ts">
import { useExperiencesImagesStore } from '@/store/useExperiencesImagesStore';

// Defining the prop `expTitle`
const props = defineProps<{
  expTitle: string;
  expDates: string;
  expDescription: string;
}>();

const experiencesImagesStore = useExperiencesImagesStore();
experiencesImagesStore.loadImages(props.expTitle);
// On est obligé de redéfinir le type de l'array imagesPaths sinon erreur de type
const imagesPaths = experiencesImagesStore.imagesPaths as { path: string; altName: string | undefined }[];

</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ExperienceGallery",
  
  props: {
    expTitle: {
      type: String,
      required: true
    },
    expDates: {
      type: String,
      required: true
    },
    expDescription: {
      type: String,
      required: true
    },
  }
});
</script>

<template>
  <h1>{{ expTitle }}</h1>
  <h2>{{ expDates }}</h2>
  <p>{{ expDescription }}</p>
  <div class="image-gallery container">
    <div v-for="image in imagesPaths" :key="image.altName" class="image-item">
      <img :src="image.path" :alt="image.altName" class="img-thumbnail" />
    </div>
  </div>
</template>

<style>
.image-gallery {
  display: grid; 
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr)); 
  grid-auto-flow: column;
  gap: 10px;
  overflow-x: auto; 
  white-space: nowrap;
}
.image-item img { 
  width: 100%; 
  height: auto; 
  display: block;
}
</style>
