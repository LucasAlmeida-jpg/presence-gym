<template>
    <div class="d-flex align-items-center justify-content-between">
        <div>
            <h5>Nome: {{me.name}}</h5>
            <h5>Faixa: {{me.belt}}</h5>
        </div>
    </div>
    <div class="me-3">
        <img class="thumb-user" src="/images/almeida_mini.png" alt="">
    </div>
</template>
<script>
import { getUser } from "../helper.js";

export default {
    data() {
        return {
            TOKEN: localStorage.getItem("token"),
            me: {},
        };
    },

  mounted(){
    this.me = getUser();
  },

  methods: {
   
  },
};
</script>
