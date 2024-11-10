<template>
  <div class="card"  @click="closePanel">
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
    <p>Chargement en cours...</p>
  </div>
</template>

<script>
export default {
    name: "CardPage",
    props: {
      panelIsOpen: { type: Boolean, required: true },
    },
    emits: ["update:panelIsOpen"],
    methods: {
      closePanel(event) {
      if (this.panelIsOpen && !this.$el.contains(event.target)) {
        this.$emit("update:panelIsOpen", false);
      } else {
        event.stopPropagation(); 
      }
    },
  },
  mounted() {
    document.addEventListener("click", this.closePanel);
  },
}
</script>


<style scoped>
.card{
  width: 80vw;
  height: 80vh;
  margin: 10vh 10vw;
  background-color: white;
  opacity: 0.95;
}
p {
  margin-top: 10px;
  font-weight: bold;
  color: #FFDC00;
}
.close {
  position: absolute;
  top: 1vh;
  right: 1vh;
  cursor: pointer;
}

.feather {
  stroke:  #FFDC00;
  transition: 0.3s cubic-bezier(0.77, 0.2, 0.05, 1);
}

.feather:hover {
  stroke: black;
}

</style>
