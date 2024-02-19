<template>
    <nav class="px-5 py-3 d-flex align-items-center justify-content-between">
        <UserBar />
    </nav>    
    <Lista /> 
    <Footer />
</template>
<script>

import axios from "axios";
import moment from 'moment';
import UserBar from '../components/UserBar.vue';
import Footer from '../components/Footer.vue';
import Lista from '../components/Lista.vue'


export default {
    components:{
        UserBar, Footer, Lista
    },
    data() {
        return {
            TOKEN: localStorage.getItem("token"),
            me: {},
            presences: []
        };
    },
    mounted(){
        // this.getPresences();
        // const userJson = localStorage.getItem('me');
        // let user = JSON.parse(userJson);
        // this.me = user;
    },
    methods: {
        // getPresences(){
        //     axios.get('/api/pending', {
        //         headers: { Authorization: "Bearer " + this.TOKEN },
        //     })
        //     .then(response => {
        //         if (response.status === 200) {
        //             this.presences = response.data;
        //         } else {
        //         console.log(response.error);
        //         }
        //     });
        // },

        // formatDate(date){
        //     return moment(date).format('DD/MM/YYYY');
        // }

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
