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
            <h6 class="nav-link admin-header-block"><a  class="text-center">programar destinos </a></h6>
            <div class="row col-md-12 col-md-offset-0 custyle">
                <div class="panel panel-primary">
                    <table class="table table-striped custab">
                        <thead>
                            <tr>
                                <th class="text-center">nombre</th>
                                <th class="text-center">clase</th>
                                <th class="text-center">satus</th>
                                <th class="text-center">lugar de salida</th>
                                <th class="text-center">hora</th>
                                <th class="text-center">fecha</th>
                                <th class="text-center">destino</th>
                                <th class="text-center">precio</th>
                                <th class="text-center">precio base</th>
                                <th class="text-center">editar destino</th>
                            </tr>
                        </thead>
                        <tr v-for="(bus,index) in  listabuses" v-bind:key="index" >
                            <td class="text-center" >
                                <span  class="label label-success" v-if="bus.status=='activo'">{{bus.nameBus}}</span>
                            </td>  
                            <td class="text-center" >
                                <span  class="label label-success" v-if="bus.status=='activo'">{{bus.class}}</span>
                            </td>  
                            <td class="text-center" >
                                <span  class="badge badge-success" v-if="bus.status=='activo'">{{bus.status}}</span>
                            </td>   
                            <td class="text-center" >
                                <span  class="label label-success" v-if="bus.status=='activo'">{{bus.departure}}</span>
                            </td>  
                            <td class="text-center" >
                                <span  class="label label-success" v-if="bus.status=='activo'">{{bus.date.substring(0,10)}}</span>
                            </td>
                            <td class="text-center" >
                                <span  class="label label-success" v-if="bus.status=='activo'">{{bus.time}}</span>
                            </td> 
                            <td class="text-center" >
                                <span  class="label label-success" v-if="bus.status=='activo'">{{bus.destination}}</span>
                            </td>  
                            <td class="text-center" >
                                <span  class="label label-success" v-if="bus.status=='activo'">{{"$ "+bus.totalPrice}}</span>
                            </td>    
                            <td class="text-center" >
                                    <span  class="label label-success" v-if="bus.status=='activo'">{{"$ "+bus.priceBase}}</span>
                                </td>                              
                            </td>  
                            <td  class="text-center"><a class='btn btn-warning btn-xs' v-if="bus.status=='activo'"  @click="showModal(bus)" id="show-btn"  href="#">
                              <span  class="glyphicon glyphicon-edit" ></span>editar</a> 
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
            <b-modal ref="my-modal" hide-footer title="edite el destino hora o fecha">
                <div class="d-block text-center" >
                    <h3>
                        <p class="text-sm-left" >fecha</p>
                            <input type="date" v-model="date" class="form-control"  min="2018-01-01" max="2019-12-31" required>
                        </h3>
                            <h3>
                                <p class="text-sm-left" >hora</p>
                                <input type="time" v-model="time" class="form-control" min="05:00" max="22:00" required>
                            </h3>
                            <h3>
                                <p class="text-sm-left" >destino</p>
                                <input type="tex" v-model="destination" class="form-control" required>
                            </h3>
                </div>
                <b-button class="mt-2" variant="outline-warning" block @click="toggleModal()">editar</b-button>
                <b-button class="mt-3" variant="outline-danger" block @click="hideModal">cancelar</b-button>
            </b-modal>

        </div>
        

    </div>   

</template>

<script>
import axios from 'axios';
export default{
    data(){
        return{
            token:'',
            listabuses:[],
            ulr:'https://aexajkl.herokuapp.com/api/v1/',
            bus:'',
            time:'',
            date:'',
            destination:'',
        }
    },
    mounted(){
        this.getAllBuses();
    },
    methods:{
        getAllBuses(){
            this.token=JSON.parse(localStorage.getItem('token'));
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token
                }
            }
            axios.get(this.ulr+"user/bus/all",this.header)
            .then(response=>{
                this.listabuses=response.data.bus;
            })
            .catch(error=>{

            })
        }, 
        showModal(bus) {
            this.$refs['my-modal'].show()
            this.bus=bus;
            this.time=this.bus.time;
            this.date=this.bus.date.substring(0,10);
            this.destination=this.bus.destination;
        },
        hideModal() {
            this.$refs['my-modal'].hide()
        },
        toggleModal() {
            this.$refs['my-modal'].toggle('#toggle-btn')
            this.editbuses();
        },  
        editbuses:function(){
            this.header={
                headers:{
                    Authorization:"Bearer "+this.token
                }
            }
            var data={
                time:this.time,
                date:this.date,
                destination:this.destination,
            }
            axios.put(this.ulr+"user/bus/update/"+this.bus.id,data,this.header)
            .then(response=>{
                this.getAllBuses();
            })
            .catch(error=>{
            })

        }       
         
    }
}

</script>



<style>


</style>