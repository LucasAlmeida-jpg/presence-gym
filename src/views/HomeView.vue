<template>
  <div class="d-flex justify-content-center">
    <img src="/images/almeida_mini.png" alt="">
  </div>
  <main class="login-container">
    <div v-if="!isLoggedIn" class="login-form">
      <h2>Login</h2>
      <!-- <div class="d-flex justify-content-center mb-3">
        <button @click="setMode('user')" :class="{ active: loginMode === 'user' }">Email</button>
        <button @click="setMode('professor')" :class="{ active: loginMode === 'professor' }" class="ms-3">Professor</button>
      </div> -->
      <form @submit.prevent="login">
        <div class="form-floating mb-3">
          <input type="text" v-model="email" class="form-control" id="floatingUsername" placeholder=" ">
          <label for="floatingUsername" v-if="loginMode === 'user'">Email</label>
          <label for="floatingUsername" v-else-if="loginMode === 'professor'">Professor</label>
        </div>

        <div class="form-floating mb-3">
          <input type="password" v-model="password" class="form-control" id="floatingPassword" placeholder=" ">
          <label for="floatingPassword">Senha</label>
        </div>

        <button class="btn-yellow" type="submit">{{ text }}</button>

        <div class="mt-3">
          <router-link class="text-yellow" to="/cadastro" style="text-decoration:none"><small>Clique para se cadastrar</small></router-link>
        </div>
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
      email: '',
      password: '',
      isLoggedIn: false,
      loginMode: 'user',
      belt: '',
      text: "Entrar",
    };
  },

  mounted(){
    // logged(); 
  },
  
  methods: {
    login() {
      this.text = "Entrando...";
      var data = {
        email: this.email,
        password: this.password,
        belt: this.belt,
      };

      axios.post('/api/auth/login', data)
      .then(response => {

        if (!response.data.error) {
          const userJson = JSON.stringify(response.data.user);
          localStorage.setItem("token", response.data.access_token);
          localStorage.setItem("role", response.data.user.role);
          localStorage.setItem("me", userJson);

          if(response.data.user.role == 'student'){
            this.$router.push('/User');
          }else{
            this.$router.push('/Professor');
          }
        } else {
          alert('Email e/ou senha incorretos')
        }
      })

      this.text = "Entrar";

    },
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




.lds-ellipsis {
  display: inline-block;
  position: relative;
  width: 60px;
  height: 60px;
}
.lds-ellipsis div {
  position: absolute;
  top: 33px;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: rgb(255, 221, 51);
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}
.lds-ellipsis div:nth-child(1) {
  left: 8px;
  animation: lds-ellipsis1 0.6s infinite;
}
.lds-ellipsis div:nth-child(2) {
  left: 8px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(3) {
  left: 32px;
  animation: lds-ellipsis2 0.6s infinite;
}
.lds-ellipsis div:nth-child(4) {
  left: 56px;
  animation: lds-ellipsis3 0.6s infinite;
}
@keyframes lds-ellipsis1 {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}
@keyframes lds-ellipsis3 {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
}
@keyframes lds-ellipsis2 {
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(24px, 0);
  }
}

</style>
