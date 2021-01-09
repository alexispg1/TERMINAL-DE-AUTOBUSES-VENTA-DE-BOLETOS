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
  <h6 class="nav-link admin-header-block"><a  class="text-center">historial de ventas</a></h6>
    <div class="row col-md-12 col-md-offset-0 custyle">
        <div class="panel panel-primary">
          
            <table class="table table-striped custab">
                <thead>
                    <tr>
                     <th class="text-center">nombre del bus </th>
                     <th class="text-center">clase</th>
                     <th class="text-center">boletos vendidos</th>
                     <th class="tex-center">destino</th>
                     <th class="text-center">total</th>
                     <th class="tex-center">fecha de la trasaccion</th>
                     </tr>
                </thead>
                <tr v-for="(bus,index) in  historialVentas" v-bind:key="index" >
                    <td class="text-center" >
                        <span  class="label label-success">{{bus.nameBus}}</span>
                    </td>    
                     <td class="text-center" >
                        <span  class="label label-success">{{bus.class}}</span>
                    </td>    
                     <td class="text-center" >
                        <span  class="badge badge-success">{{bus.ticketsSolds}}</span>
                    </td> 
                    <td class="text-center">
                          <span  class="badge badge-success" >{{bus.destino}}</span>
                    </td>    

                     <td class="text-center" >
                        <span  class="badge badge-success">{{bus.total}}</span>
                    </td>    
                     <td class="text-center" >
                        <span  class="label label-success">{{bus.created_at}}</span>
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


</div>        
</template>

<script>
import axios from 'axios';
export default {

    data(){
        return{
            url:'https://aexajkl.herokuapp.com/api/v1/',
            token:'',
            historialVentas:[],
        }
    },
    mounted(){
        this.getAllSold();
    },
    methods:{
        getAllSold:function(){
            this.token=this.token=JSON.parse(localStorage.getItem('token'));
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token
                }
            }
            axios.get(this.url+"user/history",this.header)
            .then(response=>{
                this.historialVentas=response.data.history;

            })
            .catch(error=>{
            })
        }
    }
    
}
</script>

<style >

</style>