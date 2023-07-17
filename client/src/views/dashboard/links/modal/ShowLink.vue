<script setup lang="ts">
// import http from '../../../../services/http'

const props = defineProps({
    isOpenShow:{
        type:Boolean
    },
    closeShow:{
        type:Function
    },
    id:{
        type:String
    }
})

console.log(props.id)

</script>

<template>
    <div v-if="props.isOpenShow" class="modal">
        <div class="modal-content">
            <div>
                hola
            </div>
            <button @click="props.closeShow">Cerrar</button>
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