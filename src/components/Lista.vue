<template>
    <div class="row mx-3" v-if="!show && !me.role == 'student'">
        <div class="">
            <input type="text" placeholder="Nome do aluno" class="col-12 filters" v-model="name">
        </div>
        <div class="d-flex">
            <div class="mt-2 me-2">
                <select class="filters" v-model="month">
                <option value="all">Todos os meses</option>
                <option value="1">Janeiro</option>
                <option value="2">Fevereiro</option>
                <option value="3">Março</option>
                <option value="4">Abril</option>
                <option value="5">Maio</option>
                <option value="6">Junho</option>
                <option value="7">Julho</option>
                <option value="8">Agosto</option>
                <option value="9">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
            </select>
            </div>
            <div class="mt-2 me-2">
                <select class="filters" v-model="year">
                    <option value="2024">2024</option>
                </select>
            </div>
            <div class="mt-2 ms-auto">
                <button class="btn btn-primary" @click="submit()">Filtrar</button>
            </div>
        </div>
        
    </div>
   <div class="mx-4 card-historic" style="margin-top:20px;">
        <table class="table table-dark table-hover table-rounded">
            <thead>
                <tr>
                <th scope="col" v-if="me.role == 'student'">Status</th>
                <th scope="col" v-else>Nome</th>

                <th scope="col">Data</th>
                <th scope="col" v-if="show">Ação</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(presence, index) in presences" :key="index">
                    <th scope="row" v-if="me.role == 'student'">
                        <div v-if="presence?.status == 'confirmed'">
                            <FontAwesomeIcon icon="circle-check"  class="ms-1 me-2 text-success"/>
                        </div>
                        <div v-else>
                            <FontAwesomeIcon icon="circle-xmark"  class="ms-1 me-2 text-danger"/>
                        </div>
                    </th>
                    <th scope="row" v-else>{{presence?.user?.name}} <span style="font-size:8px; color:grey">({{ presence?.user?.belt }})</span></th>

                    <td>{{ formatDate(presence?.created_at) }}</td>
                    <td v-if="show">
                        <FontAwesomeIcon icon="circle-check"  class="me-2 text-success" @click="confirm(presence.id)"/>
                        <FontAwesomeIcon icon="circle-xmark" class="text-danger" @click="refuse(presence.id)"/>
                    </td>
                    <td></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import moment from 'moment';
import axios from "axios";
import { getUser } from "../helper.js";

export default {
    data() {
        return {
            TOKEN: localStorage.getItem("token"),
            me: {},
            month: 'all',
            year:'2024',
            name:'',
            presences: [],
            show: true
        };
    },
    mounted(){
        this.me = getUser();
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        
        if(this.me.role == 'teacher'){
            this.getPresences();
        }

        if(fileName == 'Historico'){
            this.submit();
            this.show = false;
        }
    },

    methods: {
        submit(){
            axios.get('/api/historic?month='+this.month+'&name='+this.name+'&year='+this.year, {
                headers: { Authorization: "Bearer " + this.TOKEN },
            })
            .then(response => {
                if (response.status === 200) {
                    console.log(response, 'response')
                    this.presences = response.data;
                } else {
                console.log(response.error);
                }
            });
        },

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
                    console.log(this.presences)
                } else {
                console.log(response.error);
                }
            });
        },

        formatDate(date){
            return moment(date).format('DD/MM');
        },
    },
};
</script>

<script setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>