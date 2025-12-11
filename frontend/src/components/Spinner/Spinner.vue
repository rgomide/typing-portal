<template>
  <div
    class="spinner"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      borderWidth: `${Math.max(2, Math.floor(size / 8))}px`,
      borderColor: color,
      borderTopColor: 'transparent'
    }"
  ></div>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: '#3b82f6' // default blue color
  },
  size: {
    type: Number,
    default: 24
  }
})
</script>

<style scoped>
.spinner {
  border-style: solid;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  display: inline-block;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
