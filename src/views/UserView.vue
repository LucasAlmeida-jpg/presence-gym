<template>
    <section class="container-0">
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
       
       <div class="container" style="margin-top:80px;" v-if="data?.pending == 0">
            <div class="row d-flex justify-content-center">
                <div class="col-md-6 col-sm-12">
                    <div class="btn btn-success py-3 w-100">
                        <div class="text-center" @click="requestPresence()">Marcar Presença</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container" style="margin-top:80px;" v-if="data?.pending?.status == 'pending'">
            <div class="row d-flex justify-content-center">
                <div class="col-md-6 col-sm-12">
                    <div class="btn btn-warning py-3 w-100">
                        <div class="text-center">Aguardando Confirmação</div>
                    </div>
                </div>
            </div>
        </div>

        <div class="container" style="margin-top:80px;" v-if="data?.refused?.status == 'refused'">
            <div class="row d-flex justify-content-center">
                <div class="col-md-6 col-sm-12">
                    <div class="btn btn-danger py-3 w-100">
                        <div class="text-center">Recusado</div>
                    </div>
                </div>
            </div>
        </div>

        <article class="row article px-5 py-3 text-center" style="margin-top:100px;">
            <div class="col-md-6 mb-3">
                <div>
                    <h3>Presença </h3>
                    <h4>{{data.countPresence}}</h4>
                </div>
            </div>
            <div class="col-md-6">
                <div>
                    <h3>Faltas</h3>
                    <h4>{{ data.countFouls }}</h4>
                </div>
            </div>
        </article>

        <footer class="row px-5 py-3">
            <div class="col-md-12 text-center">
                <button class="btn">Histórico <span><img class="time" src="../assets/history.svg" alt=""></span></button>
            </div>
        </footer>
    </section>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
        TOKEN: localStorage.getItem("token"),
        data:[],
        pending: [],
        refused: [],
        email: '',
        password: '',
        isLoggedIn: false,
        loginMode: 'user',
    };
  },

  mounted(){
    this.getPresences();
  },

  methods: {
    logOut() {
      axios.get('/api/auth/logout', {
        headers: { Authorization: "Bearer " + this.TOKEN },
      })
      .then(response => {
        if (response.status === 200) {
          this.$router.push('/');
        } else {
          console.log(response.error);
        }
      });
    },

    requestPresence(){
        axios.get('/api/presence-request', {
            headers: { Authorization: "Bearer " + this.TOKEN },
        })
        .then(response => {
            if (response.status === 201) {
                this.data.pending = response.data;
            } else {
            console.log(response.error);
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

