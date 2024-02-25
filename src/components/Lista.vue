<template>
    <div class="bottom">
            <div v-if="fileName == 'Professor' || fileName == 'Historico'">
            <div class="row mx-3" v-if="!show && me.role == 'teacher'">
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
                        <button class="btn btn-yellow btn-outline-warning" @click="submit()">Filtrar</button>
                    </div>
                </div>
            </div>
            <div v-if="show && me.role == 'teacher'" class="d-flex justify-content-center mt-5">
                <h1>{{ presences.length }} Pedidos Pendentes</h1>
            </div>
            <div class="mx-4 card-historic" style="margin-top:20px;">
                <table class="table table-dark table-hover table-rounded">
                    <thead>
                        <tr>
                        <th v-if="me.role == 'teacher' && fileName != 'Historico'"></th>
                        <th scope="col" v-if="me.role == 'student'">Status</th>
                        <th scope="col" v-else>Nome</th>

                        <th scope="col">Data</th>
                        <th scope="col" v-if="show">Ação</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(presence, index) in presences" :key="index">
                            <th v-if="me.role == 'teacher' && fileName != 'Historico'">
                                <div :key="presence.id" class="checkbox-custom d-flex mt-2">
                                    <input type="checkbox" :id="presence.id"  class="checkbox-custom" @change="updateList(presence.id)"><label :for="presence.id"></label>
                                    <p class="p-form ps-4"></p>
                                </div>
                            </th>
                            <th scope="row" v-if="me.role == 'student'">
                                <div v-if="presence?.status == 'confirmed'">
                                    <FontAwesomeIcon icon="circle-check"  class="ms-1 me-2 text-success"/>
                                </div>
                                <div v-else-if="presence?.status == 'refused'">
                                    <FontAwesomeIcon icon="circle-xmark"  class="ms-1 me-2 text-danger"/>
                                </div>
                                <div v-else>
                                    <FontAwesomeIcon icon="clock"  class="ms-1 me-2 text-warning"/>
                                </div>
                            </th>
                            <th scope="row" v-else>{{presence?.user?.name}} <span style="font-size:8px; color:grey">({{ presence?.user?.belt }})</span></th>

                            <td>{{ formatDate(presence?.created_at) }} ({{ dayOfWeek(presence.created_at) }})</td>
                            <td v-if="show">
                                <FontAwesomeIcon icon="circle-check"  class="me-2 text-success" @click="confirm(presence.id)"/>
                                <FontAwesomeIcon icon="circle-xmark" class="text-danger" @click="refuse(presence.id)"/>
                            </td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-between max" v-if="list.length">
                    <button class="btn btn-warning" @click="confirm()">Confirmar {{ list.length }}</button>
                    <button class="btn btn-danger" @click="refuse()">Recusar {{ list.length }}</button>
                </div>
            </div>
        </div>
        <div v-else-if="fileName == 'Alunos'">
            <div class="mx-4 card-historic" style="margin-top:20px;">
                <table class="table table-dark table-hover table-rounded">
                    <thead>
                        <tr>
                        <th scope="col" v-if="me.role == 'student'">Status</th>
                        <th scope="col" v-else>Nome</th>

                        <th scope="col">Faixa</th>
                        <th scope="col">Presenças</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(user, index) in users" :key="index">
                            <th scope="row" >{{user?.name}}</th>
                            <td>{{ user?.belt }}</td>
                            <td>{{ user?.presences?.length }}</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
            users: [],
            show: true,
            fileName: '',
            list: [],
        };
    },
    mounted(){
        this.me = getUser();
        const path = window.location.pathname;
        const fileName = path.split('/').pop();
        this.fileName = fileName;
        
        if(this.me.role == 'teacher'){
            this.getPresences();
            this.getUsers();
        }

        if(fileName == 'Historico'){
            this.submit();
            this.show = false;
        }
    },

    methods: {
        dayOfWeek(val){
            var diasDaSemana = [
                "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
            ];

            if(!val) return '';

            var data = new Date(val);
            var diaDaSemanaIndice = data.getDay();
            var diaDaSemanaNome = diasDaSemana[diaDaSemanaIndice];

            this.dayWeek = diaDaSemanaNome;
            return diaDaSemanaNome;
        },

        updateList(id){
            var index = this.list.indexOf(id);

            if (index === -1) {
                this.list.push(id);
            } else {
                this.list.splice(index, 1);
            }   
        },

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

        confirm(id){
            if(this.list && this.list.length != 0){
                var data = {
                    ids: this.list
                }
            }else{
                var data = {
                    ids: [id]
                }
            }   
            
            axios.post('/api/confirm', data, {
                headers: { Authorization: "Bearer " + this.TOKEN },
            })
            .then(response => {
                if (response.status === 200) {
                    alert('Presença confirmada com sucesso!')
                    location.reload();
                } else {
                console.log(response.error);
                }
            });
        },

        refuse(id){
            if(this.list && this.list.length != 0){
                var data = {
                    ids: this.list
                }
            }else{
                var data = {
                    ids: [id]
                }
            } 
            axios.post('/api/refuse', data, {
                headers: { Authorization: "Bearer " + this.TOKEN },
            })
            .then(response => {
                if (response.status === 200) {
                    alert('Presença recusada com sucesso!')
                    location.reload();
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

        getUsers(){
            axios.get('/api/users', {
                headers: { Authorization: "Bearer " + this.TOKEN },
            })
            .then(response => {
                if (response.status === 200) {
                    this.users = response.data;
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

<style scoped>
.bottom{
    margin-bottom: 100px;
}
.max{
    max-width: 220px;
}
.checkbox-custom {
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
}

.checkbox-custom input {
    position: absolute;
    top: 20px;
    display: none;
}

.checkbox-custom label {
    position: relative;
    display: inline-block;
    margin-bottom: 7px;
}

.checkbox-custom label::before {
    content: "";
    display: inline-block;
    vertical-align: middle;
    height: 18px;
    width: 18px;
    background: rgb(255, 221, 51);
    border: 1px solid rgb(255, 221, 51);
    transition: all 0.2s ease;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
}

.checkbox-custom label::after {
    content: "\2714";
    position: absolute;
    top: 50%;
    left: 0.55em;
    transform: translate(-50%, -50%);
    font-size: 1.1em;
    color: #000; /**cor do icone */
    opacity: 0;
    transition: all 0.2s ease;
}

.checkbox-custom input:checked+label::before {
    background: rgb(255, 221, 51);
    border-color: #000;
}

.checkbox-custom input:checked+label::after {
    opacity: 1;
}
</style>