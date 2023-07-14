<script setup lang="ts">
interface Categories {
    _id: string,
    title: string
}

import { onMounted, ref } from 'vue';
import ButtonsComponents from '../../../components/ButtonsComponents.vue';
import DashboardTemplate from '../../../template/DashboardTemplate.vue';
import AddCategory from './modal/AddCategory.vue';
import AddLinks from './modal/AddLink.vue';
import http from '../../../services/http';

const isOpenCategory = ref(false);
const isOpenLink = ref(false);
const categories = ref<Categories[]>([]);
const selectedCategoryId = ref<string | undefined>(undefined);

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

const getCategory = async () => {
    const { data } = await http.get('/category/list');
    console.log(data);
    categories.value = data.categories;
};
onMounted(() => {
    getCategory();
});
</script>

<template>
    <DashboardTemplate>
        <div class="pb-9 flex justify-end">
            <ButtonsComponents name="Add Category" @click="openModalCategory" />
        </div>
        <AddCategory :isOpenCategory="isOpenCategory" :closeModalCategory="closeModalCategory" />
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
