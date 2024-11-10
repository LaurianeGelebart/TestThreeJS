<template>
  <div class="loader-container">
    <div class="loader"></div>
    <p>Chargement en cours...</p>
  </div>
</template>

<script>
export default {
    name: "LoaderPage"
}
</script>


<style scoped>
.loader-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.8);
}

.loader {
  border: 20px solid #f3f3f3;
  border-top: 20px solid #FFDC00;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

p {
  margin-top: 10px;
  font-weight: bold;
  color: #FFDC00;
}
</style>
