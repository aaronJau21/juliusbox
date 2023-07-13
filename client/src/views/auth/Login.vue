<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

import AuthTemplate from '../../template/AuthTemplate.vue';
import http from '../../services/http';
import { useAuthStore } from '../../stores/auth'

const user = reactive({
    email: '',
    password: ''
})

const router = useRouter()

const store = useAuthStore()

const auth = async () => {
    const { data } = await http.post('/auth/login', user)

    store.saveToken(data.token)
    store.saveUser(data.user)

    router.push({ name: 'links' })
}
</script>

<template>
    <AuthTemplate>
        <form class="p-6 border border-white" @submit.prevent="auth">
            <h1 class="text-center pb-1 text-white font-bold text-2xl">Login</h1>
            <div class="py-2">
                <label for="" class="block text-center">Emil:</label>
                <input type="email" placeholder="user" class="px-2" v-model="user.email">
            </div>
            <div class="py-2">
                <label for="" class="block text-center">Password</label>
                <input type="password" placeholder="*****" class="px-2" v-model="user.password">
            </div>
            <div class="flex justify-center py-1">
                <button class="bg-blue-400 px-3 py-1 rounded-md">Ingresar</button>
            </div>
        </form>
    </AuthTemplate>
</template>