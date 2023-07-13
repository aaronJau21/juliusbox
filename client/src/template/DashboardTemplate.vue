<script setup lang="ts">
import NavigateComponent from '../components/NavigateComponent.vue';
</script>

<template>
    <NavigateComponent />

    <div class="container mx-auto w-11/12 pt-9">
        <slot></slot>
    </div>
</template>