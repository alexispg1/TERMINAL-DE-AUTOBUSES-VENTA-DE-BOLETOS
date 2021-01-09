<template>
   <div class="login-form">
    <form v-on:submit.prevent="sendEmail">
        <h2 class="text-center">enviar correo</h2>       
        <div class="form-group">
             <input type="email" v-model="email" class="form-control" placeholder="correo" required="required">
        </div>
        <div class="form-group">
            <button type="submit"  class="btn btn-primary btn-block">enviar correo</button>
        </div>
        <div class="clearfix">
            <label class="pull-left checkbox-inline"></label><br/>
            <a href="/login" class="pull-right">regresar</a>
        </div>        
    </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
    data(){
        return{
            email:'',
            url:'http://127.0.0.1:3333/api/v1/'
        }
    },
    mounted(){
    },   
    methods:{
        sendEmail(){
            console.log(this.email);
            var data={
                email:this.email,
            }
            axios.post(this.url+"user/sendEmail",data)
            .then(response=>{
                console.log("lolograste perro")
                console.log(response.data);
                this.email="";
            })
            .catch(error=>{
                console.log("error al entras perro")
                console.log(error.response)
            })
        }
    } 
}
</script>