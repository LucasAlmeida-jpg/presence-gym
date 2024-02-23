<template>
    <p> {{ day }}, {{ currentTime }}</p>
</template>
<script>

export default {
    data() {
        return {
            currentTime: '',
            day: ''
        };
    },

    created() {
        this.updateCurrentTime();
        setInterval(this.updateCurrentTime, 1000);
    },

    mounted(){
        this.datenow()
    },

    methods: {
        updateCurrentTime() {
            var now = new Date();
            var hours = String(now.getHours()).padStart(2, '0');
            var minutes = String(now.getMinutes()).padStart(2, '0');
            var seconds = String(now.getSeconds()).padStart(2, '0');
            this.currentTime = hours + ':' + minutes + ':' + seconds;
        },

        datenow() {
            var diasDaSemana = [
                "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"
            ];

            var mesesDoAno = [
                "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho",
                "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
            ];

            var dataAtual = new Date();

            var dia = dataAtual.getDate();
            var mes = dataAtual.getMonth() + 1;
            var ano = dataAtual.getFullYear();

            var diaDaSemanaIndice = dataAtual.getDay();

            var diaDaSemanaNome = diasDaSemana[diaDaSemanaIndice];
            var nomeDoMes = mesesDoAno[mes - 1];
            this.day = dia + '('+ diaDaSemanaNome +')' + ' de ' + nomeDoMes + ' de '+ ano;
        }
    },
};
</script>