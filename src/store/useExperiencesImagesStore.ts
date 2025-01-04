import { defineStore } from "pinia";

interface Images { 
  path: string; 
  altName: string | undefined; 
}

export const useExperiencesImagesStore = defineStore('experiencesImagesStore', {
  state: () => ({
    imagesPaths:[] as Images[]
  }),
  actions: {
    simplifyKeys(obj: string): string | undefined {
      return obj.split('/').pop()?.split('.').shift();
    },
    loadImages(experience: string) {
      let images;
      switch (experience) {
        case 'LOMO':
          images = import.meta.glob('../assets/images/LOMO/*.{jpg,png,gif,JPG}');
          break;
        case 'JELLY':
          images = import.meta.glob('../assets/images/JELLY/*.{jpg,png,gif,JPG}');
          break;
        default:
          images = import.meta.glob(`../assets/images/ARLES/*.{jpg,png,gif,JPG}`);
      }
    
      this.imagesPaths = [];
      
      for (const img in images) {
        this.imagesPaths.push({
          //        const resolvedPath = await images[img]();
          path: new URL(img, import.meta.url).href,
          altName: this.simplifyKeys(img),
        });
      }
    },
  }
})