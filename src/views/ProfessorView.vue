<template>
    <nav class="px-5 py-3 d-flex align-items-center justify-content-between">
        <div class="d-flex align-items-center justify-content-between">

            <div class="people" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions">
                <img src="../assets/menu.svg" alt="">
            </div>
            <!-- <div>
                <h5>Nome: Lucas</h5>
            <h5>Faixa: Preta</h5>
            <h5>Turno: Matutino</h5>
            </div> -->
        </div>
        <div>
            <button class="btn" @click="logOut()">Sair</button>
        </div>
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
    <div class="mx-4 card-historic" style="margin-top:20px;">
        <table class="table table-dark table-hover table-rounded">
            <thead>
                <tr>
                <th scope="col">Nome</th>
                <th scope="col">Data</th>
                <th scope="col">Ação</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(presence, index) in presences" :key="index">
                    <th scope="row">{{presence?.user?.name}}</th>
                    <td>{{ formatDate(presence?.created_at) }}</td>
                    <td>
                        <FontAwesomeIcon icon="circle-check"  class="me-3" @click="confirm(presence.id)"/>
                        <FontAwesomeIcon icon="circle-xmark" @click="refuse(presence.id)"/>
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>

    <footer class="row px-5 py-3 position-fixed">
        <div class="col-md-12 text-center">
            <button class="btn">Histórico <span><img class="time" src="../assets/history.svg" alt=""></span></button>
        </div>
    </footer>
</template>
<script>
import axios from "axios";
import moment from 'moment';

    export default {
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
</script><style scoped>
    .card-historic{
        height: auto;
        border-radius: 10px;
    }

    .table-rounded{
        border-radius: 10px;
    }
</style>
