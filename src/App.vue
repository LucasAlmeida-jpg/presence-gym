<template>
       <body>        
        <router-view></router-view>
       </body>
       <!-- <DataHora></DataHora> -->
       <Footer class="mt-5"></Footer>
</template>

<script>
import DataHora from './components/DataHora.vue'
import Footer from './components/Footer.vue'


export default {
  components:{
    DataHora, Footer
  },

  data() {
    return {
      
    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>



