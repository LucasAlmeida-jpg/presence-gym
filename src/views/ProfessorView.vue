<template>
    <nav class="px-5 py-3 d-flex align-items-center justify-content-between">
        <UserBar />
        <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions"
            aria-labelledby="offcanvasWithBothOptionsLabel">
            <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">Backdrop with scrolling</h5>
                <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
                <p>Try scrolling the rest of the page to see this option in action.</p>
            </div>
        </div>
    </nav>
    <div class="d-flex justify-content-center mt-5">
        <h1>{{ presences.length }} Pedidos Pendentes</h1>
    </div>
    
    <Lista :presences="presences" /> 

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
        this.getPresences();
        const userJson = localStorage.getItem('me');
        let user = JSON.parse(userJson);
        this.me = user;
    },
    methods: {
        confirm(id){
            axios.get('/api/confirm/'+id, {
                headers: { Authorization: "Bearer " + this.TOKEN },
            })
            .then(response => {
                if (response.status === 200) {
                    alert('Presença confirmada com sucesso!')
                    var presence = response.data;
                    this.presences.splice(presence, 1);
                } else {
                console.log(response.error);
                }
            });
        },

        refuse(id){
            axios.get('/api/refuse/'+ id, {
                headers: { Authorization: "Bearer " + this.TOKEN },
            })
            .then(response => {
                if (response.status === 200) {
                    alert('Presença recusada com sucesso!')
                    var presence = response.data;
                    this.presences.splice(presence, 1);
                } else {
                console.log(response.error);
                }
            });
        },

        getPresences(){
            axios.get('/api/pending', {
                headers: { Authorization: "Bearer " + this.TOKEN },
            })
            .then(response => {
                if (response.status === 200) {
                    this.presences = response.data;
                } else {
                console.log(response.error);
                }
            });
        },

        formatDate(date){
            return moment(date).format('DD/MM/YYYY');
        }

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
