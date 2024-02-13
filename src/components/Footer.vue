<template>
    <footer class="d-flex py-3 px-4">
            <div class="ps-4">
                <a class="link">Histórico <span class="ps-1"><FontAwesomeIcon icon="clock" /></span></a>
            </div>
            <div class="ps-5">
                <a class="link">Graduação <span class="ps-1"><FontAwesomeIcon icon="up-long" /></span></a>
            </div>
            <div class="ps-5">
                <a class="link" @click="logOut()">Sair <span class="ps-1"><FontAwesomeIcon icon="arrow-right-from-bracket" /></span></a>
            </div>
        </footer>
</template>
<script setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>