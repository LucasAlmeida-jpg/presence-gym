<template>
    <nav class="px-3 py-2 d-flex align-items-center justify-content-between">
        <UserBar />
    </nav>  

    <div class="row mt-3">
        <h5 class="ms-4">Histórico</h5>
        <div class=" col col-md-3 col-sm " v-for="(mes, index) in meses" :key="index">
            <div class="ms-4 my-3 mes d-flex align-items-center justify-content-center border rounded rounded-4">
                {{ mes }}
            </div>
        </div>
  </div>
</template>
<script>
import UserBar from '../components/userBar.vue'


export default {
     components:{
        UserBar
    },
  data() {
    return {
        meses: 12
    };
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