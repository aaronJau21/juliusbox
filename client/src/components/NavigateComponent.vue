<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const logout = useAuthStore()
const router = useRouter()

const salir = () => {

    logout.logout()
    router.push({ name: 'login' })

}

</script>

<template>
    <nav class="flex justify-center pt-5 gap-x-3">
        <RouterLink :to="{ name: 'links' }" class="bg-white px-3 py-1 rounded-md">My Links</RouterLink>
        <RouterLink :to="{ name: 'notas' }" class="bg-white px-3 py-1 rounded-md">Notas</RouterLink>
        <button class="bg-white px-3 py-1 rounded-md" @click="salir">Salir</button>
    </nav>
</template>