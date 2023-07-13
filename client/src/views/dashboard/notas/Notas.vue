<script setup lang="ts">
import { onMounted, ref } from 'vue';
import ButtonsComponents from '../../../components/ButtonsComponents.vue';
import DashboardTemplate from '../../../template/DashboardTemplate.vue';
import AddNote from './AddNote.vue'
import http from '../../../services/http';

interface Note{
    _id:string,
    nota:string
}

const isOpen = ref(false)
const notes = ref<Note[]>([])

const openModal = () => {
    isOpen.value = true
}

const closeModal = () => {
    isOpen.value = false
}

const getNotes = async () => {
    const { data } = await http.get('notas/list')
    console.log(data)
    notes.value = data.notes
}

onMounted(() => {
    getNotes()
})

</script>
<template>
    <DashboardTemplate>
        <div class="pb-9 flex justify-end">
            <ButtonsComponents name="Add Notes" @click="openModal" />
        </div>
        <AddNote :isOpen="isOpen" :closeModal="closeModal" />
        <div class="grid grid-cols-3 ">
            <div v-for="note in notes"  :key="note._id">
                <textarea class="w-96 h-96 rounded-md">{{ note.nota }}</textarea>
            </div>
        </div>
    </DashboardTemplate>
</template>