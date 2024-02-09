<template>
    <section class="container-0">
        <nav class="px-5 py-3 d-flex align-items-center justify-content-between">
            <div>
                <h5>Nome: Lucas</h5>
                <h5>Faixa: Preta</h5>
            </div>
            <div>
                <button class="btn" @click="logOut()">Sair</button>
            </div>
        </nav>
        <article class="row article py-3  mt-3 justify-content-center d-flex">
            <h3 class="text-center">Área de Presença do Aluno</h3>
        </article>

        <article class="row article px-5 py-3 text-center mt-3">
            <div class="col-md-6 mb-3">
                <div class="card">
                    <h3>Presença</h3>
                    <h4>5</h4>
                </div>
            </div>
            <div class="col-md-6">
                <div class="card">
                    <h3>Faltas</h3>
                    <h4>2</h4>
                </div>
            </div>
        </article>

        <footer class="row px-5 py-3">
            <div class="col-md-12 text-center">
                <button class="btn">Histórico</button>
            </div>
        </footer>
    </section>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      email: '',
      password: '',
      isLoggedIn: false,
      loginMode: 'user',
    };
  },
  methods: {
    logOut() {
      axios.post('http://127.0.0.1:8000/api/auth/logout')
      .then(response => {
        if (response.status === 200) {
          this.$router.push('/');
        } else {
          console.log(response.error);
        }
      })
    },
  },
};
</script>

