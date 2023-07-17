<script setup lang="ts">
import { reactive } from 'vue';


const title = reactive({
    title: ''
})

const props = defineProps({
    isOpenCategory: {
        type: Boolean,
    },
    closeModalCategory: {
        type: Function
    },
    addCategory:{
        type: Function
    }
})


</script>

<template>
    <div class="modal" v-if="props.isOpenCategory" @submit.prevent="props.addCategory!(title)">
        <div class="modal-content">
            <h1 class="text-center py-5 text-3xl">Add Category</h1>
            <form action="">
                <div class="p-5 bg-slate-300 rounded-md">
                    <label for="title" class="block text-center">Tile</label>
                    <input type="text" placeholder="Title" id="title" class="px-3 rounded-md" v-model="title.title">
                </div>

                <div class="mt-3 flex justify-between">
                    <button type="submit" class="bg-green-400 px-3 py-1 rounded-md">Save</button>
                    <button @click="props.closeModalCategory" class="bg-red-400 px-3 py-1 rounded-md">close</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style>
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: white;
    padding: 1rem;
}
</style>