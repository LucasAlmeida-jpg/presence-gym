<template>
  <div class="d-flex justify-content-center">
    <img src="/images/almeida_mini.png" alt="">
  </div>
  <main class="login-container">
    <div class="login-form">
      <h2>Cadastro</h2>
      <form @submit.prevent="cadastro">
        <div class="form-floating mb-3">
          <input type="text" v-model="username" class="form-control" id="floatingUsername" placeholder=" ">
          <label for="floatingUsername">Nome</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" v-model="belt" class="form-control" id="floatingUsername" placeholder=" ">
          <label for="floatingUsername">Faixa</label>
        </div>

        <div class="form-floating mb-3">
          <input type="text" v-model="email" class="form-control" id="floatingUsername" placeholder=" ">
          <label for="floatingUsername">Email</label>
        </div>

        <div class="form-floating mb-3">
          <input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder=" ">
          <label for="floatingPassword">Senha</label>
        </div>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  </main>
</template>

<script>
import axios from "axios";
import { logged } from "../helper.js";


export default {
  data() {
    return {
      username: '',
      password: '',
      email: '',
     };
  },

  mounted(){
    // logged();
  },

  methods: {
    cadastro(){
      var data = {
        email: this.email,
        password: this.password,
        name: this.username,
      }

      axios.post('/api/users', data)
      .then(response => {
        if (response.status === 201) {
            this.$router.push('/');
        } else {
          console.log(response.error);
        }
      })
    }
  },
};
</script>


<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
}

.login-form {
  background-color: #242424;
  border: none;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}

.login-form h2 {
  margin-bottom: 20px;
}

.login-form label {
  display: block;
  margin-bottom: 8px;
}

.login-form input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.login-form button {
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.welcome-message {
  text-align: center;
}

.welcome-message p {
  font-size: 18px;
  margin-bottom: 10px;
}

.welcome-message button {
  background-color: #dc3545;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
