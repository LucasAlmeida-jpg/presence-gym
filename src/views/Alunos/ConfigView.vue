<template>
    <section class="container-0">
        <nav class="px-3 py-2 d-flex align-items-center justify-content-between">
            <UserBar />            
        </nav>  
        <article class="mt-5 px-5">
            <div class="d-flex justify-content-center mb-4">
                <h2>Dados Pessoais</h2>
            </div>
                <div class="form-floating mb-3">
                    <input type="text" v-model="user.name" class="form-control" id="floatingUsername" placeholder=" ">
                    <label for="floatingUsername">Nome completo</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="email" v-model="user.email" class="form-control" id="floatingEmail" placeholder=" ">
                    <label for="floatingEmail">Email</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="password" v-model="user.password" class="form-control" id="floatingPassword" placeholder=" ">
                    <label for="floatingPassword">Senha</label>
                </div>

                <div class="d-flex justify-content-center mb-4 mt-5">
                    <h2>Endereço</h2>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="address.street" class="form-control" id="floatingStreet" placeholder=" ">
                    <label for="floatingStreet">Rua</label>
                </div>

                <div class="form-floating mb-3">
                    <input type="text" v-model="address.neighborhood" class="form-control" id="floatingBairro" placeholder=" ">
                    <label for="floatingBairro">Bairro</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="number" v-model="address.number" class="form-control" id="floatingNumber" placeholder=" ">
                    <label for="floatingNumber">Número</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" v-model="address.city" class="form-control" id="floatingCity" placeholder=" ">
                    <label for="floatingCity">Cidade</label>
                </div>
                <div class="form-floating mb-3">
                    <input type="text" v-model="address.state" class="form-control" id="floatingState" placeholder=" ">
                    <label for="floatingState">Estado</label>
                </div>

                <div class="d-flex justify-content-center">
                    <button class="btn btn-yellow" type="submit" @click="save()">Salvar</button>
                </div>
        </article>
    </section>
    <footer>
        <Footer class="mt-5"></Footer>
    </footer>
</template>
<script>
    import axios from "axios";
    import UserBar from '../../components/UserBar.vue'
    import Footer from '../../components/Footer.vue'
    export default {
        components:{
            UserBar, Footer
        },

        data() {
            return {
                TOKEN: localStorage.getItem("token"),
                me: {},
                isLoggedIn: false,
                loginMode: 'user',
                user:{},
                address: {
                    street: '',
                    number: '',
                    neighborhood: '',
                    city:'',
                    state:''
                }
            };
        },

    mounted(){
        const userJson = localStorage.getItem('me');
        let user = JSON.parse(userJson);
        this.me = user;

        axios.get('/api/users/' + user.id, {
            headers: { Authorization: "Bearer " + this.TOKEN },
        })
        .then(response => {
            if (response.status === 200) {
                this.user = response.data;
                this.user.password = this.user.password.substring(0,10);
                this.address.street = this.user.address?.street;
                this.address.number = this.user.address?.number;
                this.address.neighborhood = this.user.address?.neighborhood;
                this.address.city = this.user.address?.city;
                this.address.state = this.user.address?.state;
            } else {
            console.log(response.error);
            }
        })
    },

    methods: {
        save(){
            const data = {
                name: this.user.name,
                email: this.user.email,
                password: this.user.password,
                street: this.address.street,
                neighborhood: this.address.neighborhood,
                city: this.address.city,
                state: this.address.state,
                number: this.address.number,
            };

            axios.put('/api/users/'+this.me.id, data)
            .then(response => {
                if (response.status === 200) {
                    alert('dados atualizados com sucesso!')
                } else {
                console.log(response.error);
                }
            })
        },

    },
    };
</script>

<style scoped>
    .container-0{
        padding-bottom: 100px;
    }
</style>