<script setup lang="ts">
import { reactive } from 'vue';
import http from '../../../../services/http';


const links = reactive({
    name: '',
    url: '',
    description: ''
})
const props = defineProps({
    isOpenLink: {
        type: Boolean,
    },
    closeModalLink: {
        type: Function
    },
    id:{
        type:String
    }
})

console.log(props.id)
const addLinks = async (id: string | undefined) => {
    try {
        const url = `/link/create/${id}`;
        const { data } = await http.post(url, links);
        console.log(data)
    } catch (error) {
        // Maneja el error de alguna manera, como mostrando un mensaje de error al usuario
        console.error(error);
    }
}
</script>

<template>
    <div class="modal" v-if="props.isOpenLink">
        <div class="modal-content">
            <h1 class="text-center py-5 text-3xl">Add Links</h1>
            <form @submit.prevent="addLinks(props.id)">
                <div class="p-5 bg-slate-300 rounded-md my-3">
                    <label for="title" class="block text-center">Name:</label>
                    <input type="text" placeholder="Name" id="title" class="px-3 rounded-md" v-model="links.name">
                </div>
                <div class="p-5 bg-slate-300 rounded-md my-3">
                    <label for="title" class="block text-center">URL:</label>
                    <input type="text" placeholder="URL" id="title" class="px-3 rounded-md" v-model="links.url">
                </div>
                <div class="p-5 bg-slate-300 rounded-md my-3">
                    <label for="title" class="block text-center">Description:</label>
                    <input type="text" placeholder="Description" id="title" class="px-3 rounded-md"
                        v-model="links.description">
                </div>

                <div class="mt-3 flex justify-between">
                    <button type="submit" class="bg-green-400 px-3 py-1 rounded-md">Save</button>
                    <button @click="props.closeModalLink" class="bg-red-400 px-3 py-1 rounded-md">close</button>
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