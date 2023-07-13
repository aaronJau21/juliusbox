<script setup lang="ts">
const props = defineProps({
    name: {
        type: String,
        required: true
    }
})

</script>

<template>
    <button class="bg-white px-3 py-1 rounded-md">{{ props.name }}</button>
</template>