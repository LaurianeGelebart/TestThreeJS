<template>
  <div id="app">
    <Header3DInterface/>
    <Footer/>
     </div>
</template>

<script>
import Header3DInterface from "@/components/3DInterface.vue";
import Footer from "./components/Footer.vue";

export default {
  name: 'App',
  components: {
    Header3DInterface, 
    Footer
  },
  data() {
    return {
      scrollLocked: false,
      isLaptop: false,
      user3D: false,
    }
  },
  methods: {
    isMobileDevice() {
      this.isLaptop = window.innerWidth >= 1024
    },
  },
  watch: {
    scrollLocked: function () {
      document.body.style.overflow = this.scrollLocked ? 'hidden' : 'auto'
    }
  },
  beforeMount() {
    this.isMobileDevice()
  }
};
</script>


<style>

:root {
  --background-color-primary: rgb(250, 250, 250);
  --background-color-secondary: rgb(34, 34, 34);
  /* --accent-color: #FFDC00; */
  --accent-color-hover: #FFDC00;
  --text-primary-color: rgb(34, 34, 34);
  --text-secondary-color: rgb(250, 250, 250);
}

:root.dark-theme {
  --background-color-primary: rgb(34, 34, 34);
  --background-color-secondary: rgb(250, 250, 250);
  /* --accent-color: #FFDC00; */
  --accent-color-hover: #FFDC00;
  --text-primary-color: rgb(250, 250, 250);
  --text-secondary-color: rgb(34, 34, 34);
}

html {
  scroll-behavior: smooth;
  position: relative;
  background-color: var(--background-color-primary) !important;
  color: var(--text-primary-color);
}


body {
  overflow-x: hidden;
  position: relative;
  height: 100%;
  margin: 0;
  font-family: sans-serif;
}

ul {
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

section {
  margin: 4vh 0;
  padding: 2vh 4vw;
}

#app>* {
  display: block;
}

main {
  margin: 0;
  padding: 5% 0;
  height: 80%;
  box-sizing: border-box;
  background-color: var(--background-color-primary);
}

main>* {
  margin: 4vh 0;
  padding: 5vh 6vw;
}

.black {
  width: 100vw;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: black;
  opacity: 0.7;
  z-index: 10;
}


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media screen and (max-width: 1024px) {

}

@media screen and (max-width: 768px) {

}
</style>