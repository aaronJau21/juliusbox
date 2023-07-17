<script setup lang="ts">
interface Categories {
    _id: string,
    title: string
}

interface Links {
    _id: string,
    name: string,
    url: string,
    description: string,
    category: string
}

import { onMounted, ref } from 'vue';
import ButtonsComponents from '../../../components/ButtonsComponents.vue';
import DashboardTemplate from '../../../template/DashboardTemplate.vue';
import AddCategory from './modal/AddCategory.vue';
import AddLinks from './modal/AddLink.vue';
import http from '../../../services/http';


// Variables reactivos
const isOpenCategory = ref(false);
const isOpenLink = ref(false);
const selectedCategoryId = ref<string | undefined>(undefined);
const categories = ref<Categories[]>([]);
const links = ref<Links[]>([])


// Funciones
const openModalCategory = () => {
    isOpenCategory.value = true;
};

const openModalLink = (categoryId: string) => {
    isOpenLink.value = true;
    selectedCategoryId.value = categoryId;
};

const closeModalCategory = () => {
    isOpenCategory.value = false;
};

const closeModalLink = () => {
    isOpenLink.value = false;
    selectedCategoryId.value = undefined;
};

const addCategory = async (title: string) => {
    const { data } = await http.post('/category/create', title)
    categories.value.push(data.category)
    closeModalCategory()
}

const getCategory = async () => {
    const { data } = await http.get('/category/list');
    categories.value = data.categories;
};

const getLinks = async () => {
    const { data } = await http.get(`/link/list`);
    console.log(data)
    links.value = data.links
}

const filteredLinks = (categoryId: string) => {
    return links.value.filter((link: Links) => link.category == categoryId);
};

// OnMounteds
onMounted(() => {
    getCategory();
    getLinks();
});

</script>

<template>
    <DashboardTemplate>
        <div class="pb-9 flex justify-end">
            <ButtonsComponents name="Add Category" @click="openModalCategory" />
        </div>
        <AddCategory :addCategory="addCategory" :isOpenCategory="isOpenCategory" :closeModalCategory="closeModalCategory" />
        <div class="grid grid-cols-3 gap-y-9">
            <div class="bg-white w-96 p-5" v-for="category in categories" :key="category._id">
                <div class="flex justify-between border-b border-black">
                    <h3 class="text-xl">{{ category.title }}</h3>
                    <button @click="() => openModalLink(category._id)">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" class="w-6 h-6">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
                <div v-if="selectedCategoryId">
                    <AddLinks :isOpenLink="isOpenLink" :closeModalLink="closeModalLink" :id="selectedCategoryId" />
                </div>
                <div class="mt-3">
                    <ul class="flex flex-col gap-y-3" v-for="link in filteredLinks(category._id)" :key="link._id">
                        <li>{{ link.name }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </DashboardTemplate>
</template>
