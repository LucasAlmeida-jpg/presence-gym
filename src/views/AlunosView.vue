<template>
    <nav class="px-3 py-2 d-flex align-items-center justify-content-between">
        <UserBar />
    </nav>  

    <div class="mt-3">
        <h5 class="ms-4">Alunos</h5>
        <Lista />
  </div>
</template>
<script>
import UserBar from '../components/UserBar.vue'
import Lista from '../components/Lista.vue'

export default {
    components:{
        UserBar, Lista
    },
  data() {
    return {
    };
  },

  mounted(){
  },
  methods: {
  },
};
</script>
<style scoped>
.mes{
    height: 150px;
    width: 150px;
}
</style>