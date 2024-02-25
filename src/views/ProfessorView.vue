<template>
    <nav class="px-5 py-3 d-flex align-items-center justify-content-between">
        <UserBar />
    </nav>    
    <Lista /> 
    <Footer />
</template>
<script>

import UserBar from '../components/UserBar.vue';
import Lista from '../components/Lista.vue'


export default {
    components:{
        UserBar, Lista
    },
    data() {
        return {
            TOKEN: localStorage.getItem("token"),
            me: {},
            presences: []
        };
    },
    mounted(){
    },
    methods: {
    },
};
</script>

<script setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>
<style scoped>
    .card-historic{
        height: auto;
        border-radius: 10px;
    }

    .table-rounded{
        border-radius: 10px;
    }
</style>
