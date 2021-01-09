<template>
<div class="row">
  <div class="col-sm-2 admin-sidebar">
    <div class="nav flex-column nav-pills text-center text-uppercase admin-nav" id="sidebar-admin" role="tablist" aria-orientation="vertical">
      <a class="nav-link active show admin-nav-item admin-sidebar-item"  data-toggle="pill" role="tab" aria-controls="admin-communicate" aria-selected="true">Boletos</a>
      <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill" href="http://localhost:8080/listabuses" role="tab" aria-controls="admin-requests" aria-selected="false">altas y bajas buses</a>
      <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill" href="http://localhost:8080/destinobuses" role="tab" aria-controls="admin-users" aria-selected="false">programar destinos</a>
      <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill" href="http://localhost:8080/historialventas" role="tab" aria-controls="admin-users" aria-selected="false">historial de ventas</a> 
    </div>
  </div>
  <div class="col-sm-12 admin-tabs">
    <ul class="nav nav-tabs admin-nav text-uppercase" role="tablist">
      <li class="nav-item">
        <a class="nav-link admin-nav-item active" data-toggle="tab" role="tab" aria-controls="admin-communicate" aria-selected="true">Communicate</a>
      </li>
    </ul>
  </div>
  <div class="col-sm-10">
    <div class="tab-content">
      <div class="tab-pane fade active show" id="admin-communicate" role="tabpanel" aria-labelledby="admin-communicate-tab">
        <ul class="nav nav-pills nav-fill">
          <li class="nav-item">
            <h4><a class="nav-link admin-header-block">compra de boletos- online</a></h4>
          </li>
        </ul>
        <nav class="navbar">
          <form class="form-inline col-sm-12" v-on:submit.prevent="FiltrarDatos">
            <div class="col-sm-3">
              <p class="text-primary">lugar de salida</p>
              <input class="form-control mr-sm-2" type="search" disabled placeholder="tuxtla gutierrez" aria-label="first" style="width: 100%;"></div>
            <div class="col-sm-3">
              <p class="text-primary" >destino</p>
              <select class="form-control mr-sm-2" v-model="select" required>
              <option v-for="buses in listaBuses" :value="buses.destination" >
                <a v-if="buses.status=='activo'">{{buses.destination}}</a>
              </option>
              </select>
            </div>
            <div class="col-sm-3">
              <p class="text-primary">filtar datos</p>
              <input type="submit" class="btn btn-success" value="Filtrar Los datos">
            </div>
            <div class="col-sm-3">
              <p class="text-primary">hora</p>
               <input class="form-control" v-model="hora" type="time" disabled>
            </div>
          </form>
        </nav>

        <nav class="navbar">
          <form class="form-inline col-sm-12" v-on:submit.prevent>
            <div class="col-sm-3">
              <p class="text-primary">fecha</p>
              <input type="date" v-model="fecha" class="form-control" disabled>
            </div>
            <div class="col-sm-3">
              <p class="text-primary">destino</p>
              <input type="text" v-model="destino" class="form-control" placeholder="destino"   disabled>
            </div>
            <div class="col-sm-3">
              <p class="text-primary">clase</p>
              <input type="text" v-model="clase" class="form-control" placeholder="clase"   disabled>
            </div>
            <div class="col-sm-3">
              <p class="text-primary">precio base</p>
              <input type="text" v-model="precioBase" class="form-control" placeholder="precio base"   disabled>
            </div>
          </form>
        </nav>

        <nav class="navbar">
          <form class="form-inline col-sm-12" v-on:submit.prevent>
            <div class="col-sm-3">
              <p class="text-primary">precio </p>
              <input type="text" v-model="precio" class="form-control" placeholder="precio"   disabled>
            </div>
             <div class="col-sm-3">
               <p class="text-primary">tipo de boleto</p>
               <select class="form-control mr-sm-2"  v-model="selectBoleto">
                  <option value="sencillo">sencillo</option>
                  <option value="saab">doble</option>
              </select>
            </div>
            <div class="col-sm-3">
               <p class="text-primary">elegir acientos</p>
                <input type="submit" v-on:click="siguiente" class="btn btn-success" value="siguiente">
            </div>

          </form>
        </nav>


      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {  
  data(){
    return{
      listaBuses:[],
      token:'',
      ulr:'https://aexajkl.herokuapp.com/api/v1/',
      select:'',
      salida:'',
      destino:'',
      hora:'',
      fecha:'',
      clase:'',
      precio:'',
      precioBase:'',
      boleto:[],
      nombre:'',
      id:'',
      selectBoleto:'',
    }
  },
  mounted(){
    //this.getAllBuses();
  },
  methods:{
    getAllBuses:function(){
      this.token=JSON.parse(localStorage.getItem('token'));
      this.header={
        headers:{
          Authorization:"Bearer "+this.token
          }
      }
      axios.get(this.ulr+"user/bus/all",this.header)
      .then(response=>{
        this.listaBuses=response.data.bus;
      })
      .catch(error=>{
      })
    },
    FiltrarDatos:function() {
      this.token=JSON.parse(localStorage.getItem('token'));
      this.header={
        headers:{
          Authorization:"Bearer "+this.token
          }
      }
      var data={
        destination:this.select,
      }
      
      axios.post(this.ulr+"user/bus/name",data,this.header)
      .then(response=>{
        this.id=response.data.bus.id,
        this.nombre=response.data.bus.nameBus
        this.salida=response.data.bus.departure;
        this.destino=response.data.bus.destination;
        this.hora=response.data.bus.time;
        this.fecha=response.data.bus.date.substring(0,10);
        this.clase=response.data.bus.class;
        this.precio=response.data.bus.totalPrice;
        this.precioBase=response.data.bus.priceBase;
        this.boleto.push({
          id:this.id,
          nombre:this.nombre,
          salida:this.salida,
          destino:this.destino,
          hora:this.hora,
          fecha:this.fecha,
          clase:this.clase,
          precio:this.precio,
          precioBase:this.precioBase,                    
          TipoDeBoleto:this.selectBoleto,
        })

      })
      .catch(error=>{
      })
      
    },
    siguiente:function(){
      if(this.salida==''){
        alert("elija el destino porfavor");
      }
      else{
       this.$router.push("/asientos"); 
       localStorage.setItem('boleto',JSON.stringify(this.boleto)); 
       localStorage.setItem('user',JSON.stringify(this.userData));
      }
    }

  }


}
</script>



<style >
@media screen and (max-width: 480px) {
    .admin-sidebar{
        display: none;
    }
}

@media screen and (min-width: 480px) {
    .admin-tabs{
        display: none;
    }
}

.admin-sidebar{
    max-width: 13%;
}

#sidebar-admin{
    position: fixed;
}

.admin-sidebar-item{
    padding: 1em;
    border-bottom: 1px solid white;
}

.admin-nav{
    background: #49C2B3;
}

.admin-nav-item{
    color: white;
    font-weight:bold;
}

.admin-nav-item:hover{
    color: white;
    background: #41aea1;
}

.admin-nav-item.active{
    background: #53FFE7 !important;
    color: white !important;
}

.admin-header-block{
   background: #434449;
   color: white !important;
   text-align: left;
    padding: 20px;
    margin-top: 10px;
    margin-bottom: 20px;
    border-color: #ddd;
    border-radius: 4px;
    font-weight: bold;
}

.admin-filter-button{
    background: #78B404;
    color: white !important;
    font-weight: bold;
}

.admin-user-card{
    margin-bottom: 10px;
}

</style>