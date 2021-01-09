<template>
   <div class="login-form">
    <form v-on:submit.prevent="resetPassword">
        <h2 class="text-center">reset password</h2>       
        <div class="form-group">
             <input type="password" v-model="password" class="form-control" placeholder="contraseña nueva" required="required">
        </div>

        <div class="form-group">
             <input type="password" v-model="confirmPassword" class="form-control" placeholder="confirmar contraseña" required="required">
        </div>

        <div class="form-group">
            <button type="submit"  class="btn btn-primary btn-block">cambiar contraseña</button>
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
            confirmPassword:'',
            password:'',
            id:'',
            url:'http://127.0.0.1:3333/api/v1/'
        }
    },
    mounted(){
        this.start();
    },
    methods:{
        start:function() {
            this.id=this.$route.params.id;
        },
        resetPassword:function() { 
            if(this.password===this.confirmPassword){
               var data={
                   id:this.id,
                   newPassword:this.confirmPassword,
               }
               axios.post(this.url+"user/resetPassword",data)
               .then(response=>{
                   this.password="";
                   this.confirmPassword="";
                   alert("contraseña restablecida");
                   this.$router.push("/login");
               })
               .catch(error=>{
                    var err="404 not found";
                    this.password="";
                    this.confirmPassword="";
               });
            }  
            else{
                alert("no coinciden las contraseñas");
            }
        }
    }
    
    
}
</script>
