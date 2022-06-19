<template>
  <h1 class="text-6xl font-bold">
    {{isi}}
  </h1>
</template>
<script>
import axios from 'axios'
export default {
    components: {
        axios
    },
    data() {
        return {
            port: import.meta.env.VITE_BACKEND_URL,
            isi: "Halo Dunia"
        }
    },
    methods: {
      
    },
    async mounted(){
        axios
        .get(this.port+`/`)
        .then(({data}) => {
            this.isi = data.msg
        })
    },
}
</script>
<style>

</style>
