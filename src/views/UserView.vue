<template>
    <section class="container-0">
        <nav class="px-3 py-2 d-flex align-items-center justify-content-between">
            
            <UserBar />            
        </nav>  

       <div class="container" style="margin-top:80px;" v-if="data?.pending?.length == 0">
            <div class="row d-flex justify-content-center">
                <div class="col-md-6 col-sm-12 d-flex justify-content-center">
                    <div class="btn btn-success py-3 w-100">
                        <div class="text-center" @click="requestPresence()">Marcar Presença</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container" style="margin-top:80px;" v-if="data?.pending?.status == 'pending'">
            <div class="row d-flex justify-content-center">
                <div class="col-md-6 col-sm-12 d-flex justify-content-center">
                    <div class="btn btn-warning py-3 w-100">
                        <div class="text-center">Aguardando Confirmação</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- <div class="container" style="margin-top:80px;" v-if="data?.refused?.status == 'refused'">
            <div class="row d-flex justify-content-center">
                <div class="col-md-6 col-sm-12">
                    <div class="btn btn-danger py-3 w-100">
                        <div class="text-center">Recusado</div>
                    </div>
                </div>
            </div>
        </div> -->

        <article class="row article px-5 py-3 text-center" style="margin-top:100px;">
            <div class="col-md-12 mb-3">
                <div>
                    <h3>Presenças </h3>
                    <h4>{{data.countPresence}}</h4>
                </div>
            </div>
            <!-- <div class="col-md-6">
                <div>
                    <h3>Faltas</h3>
                    <h4>{{ data.countFouls }}</h4>
                </div>
            </div> -->
        </article>
    </section>
    <footer>
        <Footer class="mt-5"></Footer>
    </footer>
</template>
<script>

import axios from "axios";
import UserBar from '../components/UserBar.vue'
import Footer from '../components/Footer.vue'

export default {
    components:{
        UserBar, Footer
    },

    data() {
        return {
            TOKEN: localStorage.getItem("token"),
            me: {},
            data:[],
            pending: [],
            refused: [],
            email: '',
            password: '',
        };
    },

  mounted(){
    this.getPresences();
    const userJson = localStorage.getItem('me');
    let user = JSON.parse(userJson);
    this.me = user;
  },

  methods: {
    requestPresence(){
        axios.get('/api/presence-request', {
            headers: { Authorization: "Bearer " + this.TOKEN },
        })
        .then(response => {
            if (response.status === 201) {
                this.data.pending = response.data;
            } else {
                alert(response.data)
            }
        });
    },

    getPresences(){
        axios.get('/api/data-user', {
            headers: { Authorization: "Bearer " + this.TOKEN },
        })
        .then(response => {
            if (response.status === 200) {
                this.data = response.data;
                this.pending = response.data.pending;
                this.refused = response.data.refused;
            } else {
            console.log(response.error);
            }
        });
    }
  },
};
</script>


