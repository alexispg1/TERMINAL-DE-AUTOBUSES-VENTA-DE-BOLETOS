<template>
 <div class="login-form">
    <form v-on:submit.prevent="codeVerification">
        <h2 class="text-center">verificacion de usuario</h2>       
        <div class="form-group">
            <input type="text" class="form-control" v-model="numero"   placeholder="ingese su codigo de verificacion " required="required">
        </div>    
        <div class="form-group">
            <button type="submit"  class="btn btn-primary btn-block">enviar datos</button>
        </div> 
    </form>
    <p class="text-center"><a href="/login">regresar</a></p>
</div>
</template>   

<script>
import axios from 'axios'
export default{
    data(){
        return{
            numero:'',
            userDataLogin:[],
            rol:'',
            token:'',
            id:'',
            email:'',
            url:'http://127.0.0.1:3333/api/v1/',
      }
    },
    mounted(){
        this.start();
    },
    methods:{
        start(){
        },
        codeVerification:function(){
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token
                }
            }
            var data=({
                id_doner:this.id,
                numero:this.numero,
            })
            axios.post(this.url+"user/numberverification",data,this.header)
            .then(response=>{
                var messages=response.data.message;
                if(messages=="no autorizado"){
                    alert("verifique que el codigo sea correcto");
                }
                else{
                    this.$router.push("/panel");
                }
            })
            .catch(error=>{
               alert("error");
            })
        }

    }
}


</script>
