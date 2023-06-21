<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <h1>App Page</h1>
    <NuxtLayout> <NuxtPage /></NuxtLayout>
    <NuxtLayout :name="layout"> 自定义的内容 </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
const layout = 'custom'
</script>
