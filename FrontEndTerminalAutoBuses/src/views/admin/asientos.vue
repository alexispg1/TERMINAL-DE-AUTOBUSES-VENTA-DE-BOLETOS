<template>
<div class="container">
  <nav>
    <form class="form-inline col-sm-12 " v-on:submit.prevent>
      <div class="col-sm-3">
          <p class="text-primary">nombre del comprador</p>
          <input class="form-control" v-model="comprador" type="text" placeholder="nombre del comprador " required >
      </div>
      <div class="col-sm-3">
          <p class="text-primary">metodo de pago</p>
          <select class="form-control mr-sm-2"  v-model="pago"   required>
              <option value="efectivo" >efectivo</option> 
              <option value="debito">tarjeta decredito</option>
          </select>
      </div>
      <div class="col-sm-3">
        <p class="text-primary">asiento normal libres</p>
        <select class="form-control mr-sm-2" v-model="selectNormal" >
            <option v-for="buses in  asientoNormal" :value="buses.asiento" >
              <a>{{buses.asiento}}</a>
            </option>
        </select>
      </div>
      <div class="col-sm-3">
         <p class="text-primary">asiento especiales libres</p>
          <select class="form-control mr-sm-2" v-model="selectEspecial">
            <option v-for="buses in asientosEspeciales" :value="buses.asiento" >
              <a>{{buses.asiento}}</a>
            </option>
          </select>
      </div>
      <br/>
       <div class="col-sm-3">
         <br/>
         <p class="text-success">añadir compra</p>
          <input type="submit" @click="sendData" class="btn btn-success" value="Añadir Compra">
        </div>
        <div class="col-sm-3">
          <br/>
          <p class="text-success">generar ventas</p>
            <input type="submit" @click="generarPago" class="btn btn-success" value="Generar Ventas">
        </div>
    </form>
  </nav>
  <br/>
  <div class="row">
    <div class=".col-3">
      <button class="btn btn-primary">asientos normales</button>
    </div>
    <div class=".col-3">
      <button class="btn btn-warning">especiales</button>
    </div>
  </div>
  <br/>
  <div class="row" >
    <div class=".col-3">
      <button class="btn btn-primary">01</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-primary">02</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-primary">03</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-primary">04</button>
    </div>
  </div>

  <div class="row" >
    <div class=".col-3">
      <button class="btn btn-primary">05</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-primary">06</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-primary">07</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-primary">08</button>
    </div>
  </div>

  <div class="row" >
    <div class=".col-3">
      <button class="btn btn-primary">09</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-primary">10</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-primary">11</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-primary">12</button>
    </div>
  </div>

  <div class="row" >
    <div class=".col-3">
      <button class="btn btn-primary">13</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-primary">14</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-primary">15</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-primary">20</button>
    </div>
  </div>

  <div class="row" >
    <div class=".col-3">
      <button class="btn btn-warning">21</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-warning">22</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-warning">23</button>
    </div>
    <div class=".col-3 aling-self-center">
      <button class="btn btn-warning">24</button>
    </div>
  </div>

</div>




</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            boleto:[],
            id:'',
            ulr:'https://aexajkl.herokuapp.com/api/v1/',
            ticket:{
              id:'',
              nombre:'',
              salida:'',
              destino:'',
              hora:'',
              fecha:'',
              clase:'',
              precio:'',
              precioBase:'',
            },
            autobus:[],
            token:'',
            compra:[],
            asientoNormal:[
              {asiento:1},{asiento:2},{asiento:3},{asiento:4},
              {asiento:5},{asiento:6},{asiento:7},{asiento:8},
              {asiento:9},{asiento:10},{asiento:11},{asiento:12},
              {asiento:13},{asiento:14},{asiento:15},{asiento:16},
              {asiento:17},{asiento:18},{asiento:19},{asiento:20}
            ],
            asientosEspeciales:[
            {asiento:21},{asiento:22},{asiento:23},{asiento:24}],
            selectEspecial:'',
            selectNormal:'',
            asientos:'',
            TipoDeBoleto:'',
            comprador:'',
            pago:'',
            DataUser:[],
            stripe_token: {},
            price: 0,
            stripe_instance: {},
            order_status:'READY',
            valorTotal:'',
        }
    },
    mounted(){
      this.stripe_instance = StripeCheckout.configure({
            key: 'pk_test_Xqu20VghJJ8itXNzxj7lGcIw00ICbxvRQo',
            locale: 'auto',
            token: (token) => {
              console.log('got a token. sending data to localhost');
              this.stripe_token = token.id;
              console.log('token ---> ', this.stripe_token);
              console.log("ordes status ",this.order_status)
              this.sendData2Server(this.stripe_token,this.order_status);
            }
        });
      this.start();
    },
    methods:{
        start:function(){
          this.boleto=JSON.parse(localStorage.getItem('boleto'))
          this.ticket.id=this.boleto[0].id;
          this.ticket.nombre=this.boleto[0].nombre;
          this.ticket.salida=this.boleto[0].salida;
          this.ticket.destino=this.boleto[0].destino;
          this.ticket.hora=this.boleto[0].hora;
          this.ticket.fecha=this.boleto[0].fecha;
          this.ticket.clase=this.boleto[0].clase;
          this.ticket.precio=this.boleto[0].precio;
          this.ticket.precioBase=this.boleto[0].precioBase;
          this.TipoDeBoleto=this.boleto[0].TipoDeBoleto;
          this.token=JSON.parse(localStorage.getItem('token'));
        },
        getBusId:function(){
          this.header={
            headers:{
              Authorization:"Bearer "+this.token
            }
          }
          var data={
            nameBus:this.ticket.nombre,
          }
          axios.post(this.ulr+"user/ventas/bus",data,this.header)
          .then(response=>{
            this.autobus=response.data.solds;
          })
          .catch(error=>{
          })
        },
        sendData:function(){
          if(this.selectNormal>0){
            this.compra.push(this.selectNormal)
            for(var i=0; i<this.asientoNormal.length;i++){
              if(this.selectNormal==this.asientoNormal[i].asiento){
                  //this.addSold("normal",this.selectNormal);
                  this.asientoNormal.splice(i,1);
                  alert("asiento agregado")
              }
            }

          }
          if(this.selectEspecial>0){
            this.compra.push(this.selectEspecial);
            for(var i=0; i<this.asientosEspeciales.length;i++){
              if(this.selectEspecial==this.asientosEspeciales[i].asiento){
                  //this.addSold("especial",this.selectEspecial);
                  this.asientosEspeciales.splice(i,1);
                  alert("asiento agregado")
              }
            }
          }
      
        },
        generarPago:function(){
          var totalBoletos=this.compra.length;
          var TotalPrecioBoleto=totalBoletos*this.ticket.precio;
          var TotalPrecioBase=totalBoletos*this.ticket.precioBase
          var totalSinIva=TotalPrecioBoleto+TotalPrecioBase;
          var Iva=totalSinIva*0.16;
          var TotalConIva=totalSinIva+Iva;
          this.addHistory(totalBoletos,TotalConIva);
        },
        addSold:function(tipoAsiento,asientoOcupado){
          this.header={
            headers:{
              Authorization:"Bearer "+this.token
            }
          }
          var data={
            nameBus:this.ticket.nombre,
            occupiedSeats:asientoOcupado,
            totalSeatsSold:1,
            typeSeat:tipoAsiento,
            bus_id:this.ticket.id,
          }
          axios.post(this.ulr+"user/venta",data,this.header)
          .then(response=>{
            console.log(response.data);
          })
          .catch(error=>{
          })

        },
        addHistory:function(TotalBoletosVendidos,total) {
          
          this.header={
            headers:{
              Authorization:"Bearer "+this.token
            }
          }
          var data={
            nameBus:this.ticket.nombre,
            class:this.ticket.clase,
            ticketsSolds:TotalBoletosVendidos,
            destino:this.ticket.destino,
            total:total,
            bus_id:this.ticket.id,
          }
          console.log("NOMBRE DEL COMPRADOR"+this.comprador);
          this.DataUser.push({
            nombreComprador:this.comprador,
            metodoDePago:this.pago,
            TotalApagar:total,
            bus:data.nameBus,
            TipoDeBoleto:this.TipoDeBoleto,
            clase:data.class,
            horaSalida:this.ticket.hora,
            fechaSalida:this.ticket.fecha,
            lugarSalida:'tuxtla gutierrez',
            LugarDestino:this.ticket.destino,
            fechaRegreso:'2019-15-12',
          })
          localStorage.setItem('DataUser',JSON.stringify(this.DataUser)); 
          console.log("agregar historial XXXXXX")
          console.log("el valor total es zzzzz ",this.valorTotal);
          //this.$router.push("/metodopago"); <total> el precio a pagar
          
          this.purchaseStuff(total);
          /*axios.post(this.ulr+"user/history",data,this.header)
          .then(response=>{
            console.log(response.data);
            localStorage.setItem('DataUser',JSON.stringify(DataUser)); 
            this.$router.push("/metododepago");
          })
          .catch(error=>{

          })*/

        },
        purchaseStuff(total){
            this.stripe_instance.open({
              name: 'INFINITE INDUSTRIES',
              description: 'stuff and stuff',
              amount: total
            })
        console.log('attempting to get a token ',total);
        localStorage.setItem('total',JSON.stringify(total));
        },
        sendData2Server: (stripe_token,order_status) => {
          console.log("impirmiendo el order status ",order_status)
          console.log("token ",stripe_token);
          order_status="PENDING";
          console.log("order status ",order_status)
          var total=JSON.parse(localStorage.getItem('total'));
          console.log("el total es ",total);
          var email=JSON.parse(localStorage.getItem('email'));
          console.log("email ",email)
          axios.post('http://localhost:8000/process_payment',{
            token_id:stripe_token,
            price:total,
            email:email,
          })
          .then((response) => {
              console.log("respuesta perro ");
              console.log(response);
              console.log("respuesta del body ");
              console.log(response.body);
              order_status= "SUCCESSFULLY COMPLETED";
            },(response) => {
              console.log("RESPUESES DESPUES DEL THEN");
              console.log(response.body);
              order_status= "FAILED";
            });
        }
    }   
    
}
</script>


<style>


</style>

