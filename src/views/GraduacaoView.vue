<template>

    <nav class="px-3 py-2 d-flex align-items-center justify-content-between">
        <UserBar />
    </nav>  

    <div class=" d-flex align-items justify-content-center">
        <div class="mt-5 mx-2 text-center">
        <h1 class=" mt-5 text-light">Regras de Gradução</h1>
        <div class="mt-5">
            <h5 class="text-light mt-3">Frequência Mínima</h5>
            <p class="text-light mt-3">Para poder partcipar da graduação é preciso que o aluno tenha um número míinimo de frequenca para estar apto a realizar o exame.</p><br>
            <p class="text-light">A graduaçao será realizada respeitando as regras da IBJJF, consulte o tempo de cada faixa de acordo com a idade em: <a class="text-yellow" target="_blank" href="https://cbjj.com.br/graduation-system">IBJJF</a></p><br>
            <p class="text-light">    
                <span class="text-light">Faixa Branca: 35 </span> Presenças<br>
                <span class="text-primary">Faixa Azul: 45 </span> Presenças<br>
                <span class="text-purple">Faixa Roxa: 50 </span> Presenças<br>
                <span class="text-bronw">Faixa Marrom: 60 </span> Presenças<br>
                <span>Faixa Preta: Consultar Com o professor</span><br>
            </p>
        </div>
    </div>
    </div>

    <Footer />
</template>
<script>
import UserBar from '../components/UserBar.vue'
import Lista from '../components/Lista.vue'
import Footer from '../components/Footer.vue'

export default {
    components:{
        UserBar, Lista, Footer
    },
  data() {
    return {
    };
  },

  mounted(){
  },
  methods: {
  },
};
</script>
<style scoped>
.mes{
    height: 150px;
    width: 150px;
}
</style>