<template>
<div class="row">
  <div class="col-sm-2 admin-sidebar">
    <div class="nav flex-column nav-pills text-center text-uppercase admin-nav" id="sidebar-admin" role="tablist" aria-orientation="vertical">
      <a class="nav-link active show admin-nav-item admin-sidebar-item"  data-toggle="pill" href="http://localhost:8080/panel" role="tab" aria-controls="admin-communicate" aria-selected="true">Boletos</a>
      <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill" href="http://localhost:8080/listabuses" role="tab" aria-controls="admin-requests" aria-selected="false">altas y bajas buses</a>
      <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill" href="http://localhost:8080/destinobuses" role="tab" aria-controls="admin-users" aria-selected="false">programar destinos</a>
      <a class="nav-link admin-nav-item admin-sidebar-item" data-toggle="pill" href="http://localhost:8080/historialventas" role="tab" aria-controls="admin-users" aria-selected="false">historial de ventas</a> 
    </div>
  </div>

<div class="container">
  <h6 class="nav-link admin-header-block"><a  class="text-center">altas y bajas </a></h6>
    <div class="row col-md-12 col-md-offset-0 custyle">
        <div class="panel panel-primary">
          
            <table class="table table-striped custab">
                <thead>
                    <tr>
                     <th class="text-center">nombre</th>
                     <th class="text-center">clase</th>
                     <th class="text-center">satus</th>
                     <th class="tex-center">lugar de partida</th>
                     <th class="text-center">fecha de salida</th>
                     <th class="tex-center">hora de salida</th>
                     <th class="text-center">destino</th>
                      <th class="text-center">precio</th>
                     <th class="text-center">editar</th>
                     </tr>
                </thead>
                <tr v-for="(bus,index) in  listaBus" v-bind:key="index" >
                    <td class="text-center" >
                        <span  class="label label-success">{{bus.nameBus}}</span>
                    </td>    
                     <td class="text-center" >
                        <span  class="label label-success">{{bus.class}}</span>
                    </td>    
                     <td class="text-center" >
                        <span  class="badge badge-success"  v-if="bus.status=='activo'">{{bus.status}}</span>
                        <span  class="badge badge-danger"   v-else-if="bus.status=='inactivo'">{{bus.status}}</span>
                    </td> 
                     <td class="text-center" >
                        <span  class="label label-success">{{bus.departure}}</span>
                    </td>    
                     <td class="text-center" >
                        <span  class="label label-success">{{bus.date.substring(0,10)}}</span>
                    </td>    
                     <td class="text-center" >
                        <span  class="label label-success">{{bus.time}}</span>
                    </td>  
                    <td class="text-center" >
                        <span  class="label label-success">{{bus.destination}}</span>
                    </td>  
                    <td class="text-center" >
                        <span  class="label label-success">{{"$ "+bus.totalPrice}}</span>
                    </td>  
                    <td  class="text-center"><a class='btn btn-warning btn-xs'  @click="showModal(bus)" id="show-btn"  href="#">
                      <span class="glyphicon glyphicon-edit" ></span>editar</a> 
                    </td>
                </tr>
            </table>
            <nav aria-label="pagination">
              <ul class="pagination">
                <li class="page-item disabled">
                  <a class="page-link" href="#" tabindex="-1" aria-disabled="true">Previous</a>
                </li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                  <li class="page-item active" aria-current="page">
                  <a class="page-link" href="#">2 <span class="sr-only">(current)</span></a>
                </li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                  <li class="page-item">
                  <a class="page-link" href="#">Next</a>
                </li>
              </ul>
          </nav>
        </div>
    </div>
</div>
   <div>
      <b-modal ref="my-modal" hide-footer title="cambia el rol del usuario">
        <div class="d-block text-center" >
          <h3>
            <select name="select" class="form-control" v-model="select">
              <option value="inactivo">baja por mantenimiento</option> 
              <option value="activo" >alta al autobus</option>
            </select>
          </h3>
        </div>
        <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">cambiar</b-button>
        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">cancelar</b-button>
      </b-modal>
    </div>

</div>  
  
</template>

<script>
import axios from 'axios';
export default {
  data(){
    return{
      token:'',
      listaBus:[],
      ulr:'https://aexajkl.herokuapp.com/api/v1/',
      select:'',
      bus:'',
    }
  },
  mounted(){
    this.listaBuses();
  },
  methods:{
    listaBuses:function() {
      this.token=JSON.parse(localStorage.getItem('token'));
      this.header={
        headers:{
          Authorization:"Bearer "+this.token
          }
      }
      axios.get(this.ulr+"user/bus/all",this.header)
      .then(response=>{
        this.listaBus=response.data.bus;
      })
      .catch(error=>{
      })
    },
    showModal(bus) {
      this.$refs['my-modal'].show()
      this.bus=bus;
    },
    hideModal() {
      this.$refs['my-modal'].hide()
    },
    toggleModal() {
      this.$refs['my-modal'].toggle('#toggle-btn')
      this.cambiarStatus();
    },
    cambiarStatus(){
      this.header={
        headers:{
          Authorization:"Bearer "+this.token
          }
      }
      var valor=this.select;
      var status={
        status:valor,
      }
      axios.put(this.ulr+"user/bus/update/status/"+this.bus.id,status,this.header)
      .then(response=>{
        this.listaBuses();
      })
      .catch(error=>{
        alert(error.response);
      });
    
    }


  }


}
</script>


<style>
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

.custab{
    border: 1px solid #ccc;
    padding: 5px;
    margin: 5% 0;
    box-shadow: 3px 3px 2px #ccc;
    transition: 0.5s;
    }
.custab:hover{
    box-shadow: 3px 3px 0px transparent;
    transition: 0.5s;
    }
    
</style>


