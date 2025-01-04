<script setup lang="ts">
import { ref, watch } from 'vue';

// Simplifie le path de l'image pour ne récupérer que son nom et alimenter ALT
const simplifyKeys = (obj: string): string | undefined => {
  return obj.split('/').pop()?.split('.').shift();
}

// Defining the prop `expTitle`
const props = defineProps<{
  expTitle: string;
  expDates: string;
  expDescription: string;
  expFolderPath: string;
}>();

// Function to load images based on expTitle using switch case
const loadImages = () => {
  let images;
  switch (props.expTitle) {
    case 'ARLES':
      images = import.meta.glob('../assets/images/ARLES/*.{jpg,png,gif,JPG}');
      break;
    case 'LOMO':
      images = import.meta.glob('../assets/images/LOMO/*.{jpg,png,gif,JPG}');
      break;
    default:
      images = import.meta.glob(`../assets/images/ARLES/*.{jpg,png,gif,JPG}`);
  }

  imagePaths.value = [];
  for (const img in images) {
    imagePaths.value.push({
      path: new URL(img, import.meta.url).href,
      name: simplifyKeys(img),
    });
  }
};
// Tableau de path des images
const imagePaths = ref<{ path: string, name: string | undefined }[]>([]);

// Chargement initial des images
loadImages();

// Watch for changes in expTitle and reload images accordingly
watch(() => props.expTitle, () => {
  loadImages();
});

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
    expFolderPath: {
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
    <div v-for="(image, index) in imagePaths" :key="index" class="image-item">
      <img :src="image.path" :alt="image.name" class="img-thumbnail" />
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
