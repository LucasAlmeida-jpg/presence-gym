<template>
    <footer class="d-flex py-3 px-3 justify-content-between">
        <div class="">
            <router-link to="/Professor" class="link">Inicio <span class="ps-1"><FontAwesomeIcon icon="house" /></span></router-link>
        </div>

        <div class="">
            <router-link to="/Historico" class="link">Histórico <span class="ps-1"><FontAwesomeIcon icon="clock" /></span></router-link>
        </div>
        <div class="">
            <router-link to="/Graduacao" class="link">Graduação <span class="ps-1"><FontAwesomeIcon icon="up-long" /></span></router-link>
        </div>
        <div class="">
            <a class="link" @click="logOut()">Sair <span class="ps-1"><FontAwesomeIcon icon="arrow-right-from-bracket" /></span></a>
        </div>
    </footer>
</template>
<script setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>