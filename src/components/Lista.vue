<template>
    <div class="row mx-3">
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
</template>
<script>
import moment from 'moment';
import axios from "axios";

export default {
    props: ['presences'],
    
    data() {
        return {
            TOKEN: localStorage.getItem("token"),
            me: {},
            month: 'all',
            year:'2024',
            name:'',
            presences: []
        };
    },
    mounted(){
        this.getPresences();
    },

    methods: {
        submit(){
            axios.get('/api/historic?month='+this.month+'&name='+this.name+'&year='+this.year, {
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
            return moment(date).format('DD/MM/YYYY');
        },
    },
};
</script>

<script setup>
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
</script>