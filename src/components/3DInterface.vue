<template>
  <div class="canvas3D">
    <Loader v-if="state.isLoading" />
    <div v-show="!state.isLoading"  class="interface3D">
      <Card 
        class="infos"
        v-show="state.panelIsOpen" 
        :panelIsOpen="state.panelIsOpen"
        @update:panelIsOpen="(value) => (state.panelIsOpen = value)"
      />
      <div class="scene" ref="scene"></div>
    </div>
  </div>
</template>

<script>
import * as THREE from "three";
import { createRenderer, createScene, createCamera } from "@/three/sceneSetup";
import { retrieveData } from "@/three/dataRetrieval";
import { onMouseMove, onCanvasClick , throttle} from "@/three/eventHandlers";
import { animate } from '@/three/animation.js';
import Loader from "@/components/Loader.vue";
import Card from "@/components/Card.vue";

export default {
  name: "Header3DInterface",
  components: { 
    Loader, 
    Card 
  },
  data() {
    return {
      scene: null,
      camera: null,
      renderer: null,
      raycaster: new THREE.Raycaster(), 
      width: window.innerWidth,
      height: window.innerHeight,
      interactableObjects: new Set(),
      state: { 
        time: 0,
        lightIsOn: true,
        panelIsOpen: true,
        isLoading: true,
      },
    };
  },
  async mounted() {
    this.renderer = createRenderer(this.width, this.height, this.$refs.scene);
    this.scene = createScene();
    this.camera = createCamera(this.width, this.height);
    await retrieveData(this.scene, this.interactableObjects);


    animate(this.scene, this.camera, this.renderer, this.state);


  const throttledMouseMove = throttle((event) => {
    onMouseMove(event, this.scene, this.interactableObjects, this.camera, this.raycaster, this.state, this.$refs.scene);
  }, 60); 

    this.$refs.scene.addEventListener("mousemove", throttledMouseMove, false);

    this.$refs.scene.addEventListener("click", (event) => {
      onCanvasClick(event, this.scene, this.camera, this.raycaster, this.state, this.$refs.scene);
    }, false);

    setTimeout(() => {
      this.state.isLoading = false;
    }, 4000);
  },  

  beforeDestroy() {
    this.$refs.scene.removeEventListener("mousemove", onMouseMove);
    this.$refs.scene.removeEventListener("click", onCanvasClick);
  }
};

</script>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}

.canvas3D {
  height: 100vh;
  width: 100vw;
}

.interface3D{
  display: flex ;
  position: relative;
}

.scene{
  position: absolute;
  z-index: 1;
}

.infos{
  position: absolute;
  z-index: 2;
}

</style>