<script setup>
</script>
<style scoped>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 2vh;
  width: auto;
  /* Ajustez la valeur selon vos besoins */
}

.loader {
  display: inline-block;
  height: 20px;
  width: 20px;
  border: 4px solid currentColor;
  border-radius: 50%;
  border-right-color: transparent;
  animation: spin 1.2s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader-text {
  position: absolute;
  margin: -1px;
  height: 1px;
  width: 1px;
  overflow: hidden;
  white-space: nowrap;
  border: 0;
  padding: 0;
  clip: rect(0, 0, 0, 0);
}
</style>

<template>
  <div class="loader-container">
    <div class="loader" role="status">
      <span class="loader-text">Loading...</span>
    </div>
  </div>
</template>
