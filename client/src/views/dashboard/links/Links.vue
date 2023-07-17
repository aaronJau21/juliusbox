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
import ShowLink from './modal/ShowLink.vue'
import http from '../../../services/http';


// Variables reactivos
const isOpenCategory = ref(false);
const isOpenLink = ref(false);
const isOpenShow = ref(false)
const selectedCategoryId = ref<string | undefined>(undefined);
const categories = ref<Categories[]>([]);
const links = ref<Links[]>([])
const idLink = ref<string | undefined>(undefined)


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

const addLinks = async (id: string | undefined, addlinks: Links) => {
    try {
        const url = `/link/create/${id}`;
        const { data } = await http.post(url, addlinks);
        links.value.push(data.link)
        closeModalLink()
    } catch (error) {
        // Maneja el error de alguna manera, como mostrando un mensaje de error al usuario
        console.error(error);
    }
}

const show = async (linkId: string) => {
    isOpenShow.value = true
    idLink.value = linkId
}

const closeShow = () => {
    isOpenShow.value = false
}

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
                    <AddLinks :addLinks="addLinks" :isOpenLink="isOpenLink" :closeModalLink="closeModalLink"
                        :id="selectedCategoryId" />
                </div>
                <div class="mt-3">
                    <ul class="flex flex-col gap-y-3">
                        <li v-for="link in filteredLinks(category._id)" :key="link._id">
                            <div class="flex justify-around">
                                <p>{{ link.name }}</p>
                                <button @click="show(link._id)">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                                        <path stroke-linecap="round" stroke-linejoin="round"
                                            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                    </svg>
                                </button>
                            </div>
                            <div v-if="idLink">
                                <ShowLink  :isOpenShow="isOpenShow" :closeShow="closeShow" :id="idLink"/>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </DashboardTemplate>
</template>
