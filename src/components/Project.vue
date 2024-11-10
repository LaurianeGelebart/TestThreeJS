<template>
  <div class="Project" @click="closePanel">
    <div v-if="!isLaptop" class="infos">
      <h3>{{ name }}</h3>
      <p class="date">{{ date }}</p>
      <Images class="img" :img="img"></Images>
      <div class="text">
        <p class="description" v-html="description"></p>
        <LinksProject v-if="links" :links="links"></LinksProject>
      </div>
    </div>

    <div v-if="isLaptop" class="infos">
      <div class="text">
        <h3>{{ name }}</h3>
        <p class="date">{{ date }}</p>
        <p class="description" v-html="description"></p>
        <LinksProject v-if="links" :links="links"></LinksProject>
      </div>
      <Images class="img" :img="img"></Images>
    </div>

    <div class="close" @click="() => this.$emit('update:panelIsOpen', false)">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-x"
      >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </div>
  </div>
</template>

<script>
import LinksProject from "@/components/LinksProject.vue";
import Images from "@/components/Images.vue";

export default {
  name: "ProjectPage",
  components: {
    LinksProject,
    Images,
  },
  props: {
    panelIsOpen: { type: Boolean, required: true },
    name: { type: String, required: true },
    img: { type: Array, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    links: { type: Object, required: true },
    isLaptop: { type: Boolean, required: true },
  },
  emits: ["update:panelIsOpen"],
  data() {
    return {};
  },
  methods: {
    closePanel(event) {
      // console.log("is not on the panel ? "+!this.$el.contains(event.target))
      // console.log("is panel open ? "+this.panelIsOpen)
      if (this.panelIsOpen && !this.$el.contains(event.target)) {
        this.$emit("update:panelIsOpen", false);
        // console.log("cloooose")
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.closePanel);
  },
};
</script>


<style scoped>
.Project {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 65vw;
  height: 60vh;
  background-color: var(--background-color-primary);
  z-index: 30;
  padding: 8vh 5vw;
  /* position: relative; */
}

.close {
  position: absolute;
  top: 1vh;
  right: 1vh;
  cursor: pointer;
}

h3 {
  font-family: "PRIMETIME", sans-serif;
  color: var(--accent-color-hover);
  /* color: var(--text-primary-color); */
  font-size: 3.2rem;
  margin: 0;
}

.date {
  font-size: 1rem;
  font-weight: bold;
}

.description {
  font-size: 1.2rem;
}

.infos {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.text {
  display: flex;
  flex-direction: column;
  width: 50%;
  padding-right: 5%;
}

.img {
  width: 50%;
}

.feather {
  stroke: var(--text-primary-color);
  transition: 0.3s cubic-bezier(0.77, 0.2, 0.05, 1);
}

.feather:hover {
  stroke: var(--accent-color-hover);
}

@media screen and (max-width: 1024px) {
  .Project {
    z-index: 130;
    height: auto;
    overflow-y: auto;
  }

  .description {
    margin-top: 0 ;
    font-size: 1.2rem;
  }

  .infos {
    flex-direction: column;
    align-items: left;
  }

  .text {
    width: 100%;
  }

  .img {
    margin: 0;
    width: 100%;
  }

  .date {
    width: 100%;
  }
}

@media screen and (max-width: 768px) {
  .Project {
    width: 80vw;
    margin-top: 3vh;
  }

  .description {
    font-size: 0.8rem;
  }

  .date {
    font-size: 0.7rem;
  }

  h3 {
    font-size: 1.7rem;
    width: 100%;
  }
}
</style>
  