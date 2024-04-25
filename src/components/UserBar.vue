<template>
    <div class="d-flex align-items-center justify-content-between">
        <div>
            <h5>Nome: {{me.name}}</h5>
            <h5 v-if="me.belt">Faixa: {{me.belt}}</h5>
        </div>
    </div>
    <div class="me-3">
        <img class="thumb-user" src="/images/almeida_mini.png" alt="">
    </div>
</template>
<script>
import { getUser } from "../helper.js";
import axios from "axios";

export default {
    data() {
        return {
            TOKEN: localStorage.getItem("token"),
            me: {},
        };
    },

  mounted(){
    this.me = getUser();

    axios.get('/api/users/' + this.me.id, {
        headers: { Authorization: "Bearer " + this.TOKEN },
    })
    .then(response => {
        if (response.status === 200) {
            this.me.name = response.data.name
        } else {
        console.log(response.error);
        }
    })
  },

  methods: {
   
  },
};
</script>
