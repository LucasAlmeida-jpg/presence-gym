<template>
    <footer class="d-flex py-3 px-3 justify-content-between">
        <div class="">
            <router-link v-if="me.role == 'student' " to="/User" class="link">Inicio <span class="ps-1"><FontAwesomeIcon icon="house" /></span></router-link>
            <router-link v-else to="/Professor" class="link">Inicio <span class="ps-1"><FontAwesomeIcon icon="house" /></span></router-link>
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
<script>

import { getUser } from "../helper.js";
import axios from "axios";

export default {
    data() {
        return {
            me: {},
            TOKEN: localStorage.getItem("token"),
        };
    },

  mounted(){
    this.me = getUser();
  },

  methods:{
    logOut() {
      axios.get('/api/auth/logout', {
        headers: { Authorization: "Bearer " + this.TOKEN },
      })
      .then(response => {
        if (response.status === 200) {
          this.$router.push('/');
        } else {
          console.log(response.error);
        }
      });
    },
  }
};
</script>

<script setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>