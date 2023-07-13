import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {

    const token = ref(localStorage.getItem('token'))
    const userJson = localStorage.getItem('user')
    const user = ref(userJson ? JSON.parse(userJson) : null)

    const saveToken = (tokenValue: string) => {
        localStorage.setItem('token', tokenValue)
        token.value = tokenValue
    }

    const saveUser = (userValue: string) => {
        localStorage.setItem('user', JSON.stringify(userValue))
        user.value = userValue
    }

    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        token.value = ''
        user.value = ''
    }

    return {
        token,
        saveToken,
        saveUser,
        logout
    }

})