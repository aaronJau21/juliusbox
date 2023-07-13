<script setup lang="ts">
interface Categories {
    _id: string,
    title: string
}

import { onMounted, ref } from 'vue';
import ButtonsComponents from '../../../components/ButtonsComponents.vue';
import DashboardTemplate from '../../../template/DashboardTemplate.vue';
import AddCategory from './modal/AddCategory.vue';
import http from '../../../services/http';

const isOpen = ref(false)
const categories = ref<Categories[]>([])

const openModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
}

const getCategory = async () => {
    const { data } = await http.get('/category/list')
    console.log(data)
    categories.value = data.categories
}
onMounted(() => {
    getCategory();
})
</script>

<template>
    <DashboardTemplate>
        <div class="pb-9 flex justify-end">
            <ButtonsComponents name="Add Category" @click="openModal" />
        </div>
        <AddCategory :isOpen="isOpen" :closeModal="closeModal" />
        <div class="grid grid-cols-4 gap-y-9">
            <div class="bg-white w-64 p-5" v-for="category in categories" :key="category._id">
                <h3 class="text-center border-b border-black">{{ category.title }}</h3>
                <div class="mt-3">
                    <ul class="flex flex-col gap-y-3">
                        <li>nota1</li>
                        <li>nota2</li>
                        <li>nota3</li>
                    </ul>
                </div>
            </div>
        </div>
    </DashboardTemplate>
</template>