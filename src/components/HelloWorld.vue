<template>
  <div class="container-fluid">
    <h1 class="heading mb-4" style="margin-top:-20px;">Covid-19 Case Tracker India</h1>
    <button @click="goToReport()" class="btn btn-outline-success"><b>Report a recovery</b></button>
    <div class="row">
      <div class="col-sm-8" >
        <div class="chart">
          <canvas id="line-chart"></canvas>
          <br/>
           <span class="text-danger">Total cases: <b>{{totalConfirmedCases}}+</b></span>
        </div>
      </div>
      <div class="col-sm-4 mt-4">
        <div class="stateSelector">
          <select class="selectorClass" v-model="selectedState" @change="getSubStates(selectedState)">
            <option value="" selected disabled> Select a State</option>
            <option v-for="(state,index) in states" :key="index">{{ state }}</option>
          </select>
        </div>
        <br/>
        <div class="stateSelector">
          <select class="selectorClass" :disabled="enablesubstate==false" v-model="selectedSubState" @change="getDetails(selectedSubState)">
            <option value="" selected disabled> Select a District</option>
            <option v-for="(substate,index) in subStates" :key="index">{{ substate }}</option>
          </select>
        </div>
        <div v-if="loaderActive">
          <img class="mt-4" height="50" width="50" src="../assets/loader.gif">
        </div>
        <br/>
        <div v-if="!loaderActive && abcd!=''">
          <h4>State Wise Data</h4>
          <p class="text-primary">Confirmed: {{stateData.confirmed}}</p>
          <p class="text-danger">Death: {{stateData.deaths}}</p>
          <p class="text-success">Recovered: {{stateData.recovered}}</p>
          <p class="text-info">Active: {{stateData.active}}</p>
          <p  class="">Last Modified Date: {{stateData.lastupdatedtime}}</p>
          <h4 v-if="selectedSubState!=''">District Wise Data</h4>
          <p  v-if="selectedSubState!=''" class="text-primary">Confirmed cases: {{confirmed}}</p>
      </div>
      
    </div>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import Chart from 'chart.js';

export default {
  name: 'HelloWorld',
  components:{
    
  },
  data() {
    return{
        rawData : {},
        states : [],
        subStates:[],
        selectedState:'',
        selectedSubState:'',
        confirmed:'',
        enablesubstate:false,
        totalData:{},
        stateData:{},
        loaderActive:false,
        abcd:'',
        totalConfirmedCases:0


    }
  },
  mounted(){
    this.getRawData();
    //this.createChart('abcd');
  },
  methods:{
    goToReport(){
      this.$router.push({name: 'ReportRecovery'});
    },
    getSubStates(state){
      this.loaderActive = true;
      this.enablesubstate = true;
      this.subStates = Object.keys(this.rawData[state].districtData);
      for(let x in this.totalData){
        if(this.totalData[x].state==this.selectedState){
          this.stateData = this.totalData[x];
          this.stateData.lastupdatedtime = this.stateData.lastupdatedtime.substring(0,10);
        }
      }
      var self = this;
      setTimeout(() => {
        self.abcd = 'abcd';
        self.loaderActive = false;
      }, 3000);
     
    },
    getDetails(district){
      this.confirmed = this.rawData[this.selectedState].districtData[district].confirmed;

    },
    createChart(day,data){
      new Chart(document.getElementById("line-chart"), {
        type: 'line',
        data: {
          labels: day,
          datasets: [{ 
              data: data,
              label: "India",
              borderColor: "#3e95cd",
              fill: true,
              backgroundColor:"#80d2f2"
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Total number of positive cases'
          }
        }
      });
    },
    last (array, n) {
    if (array == null) 
      return void 0;
    if (n == null) 
      return array[array.length - 1];
    return array.slice(Math.max(array.length - n, 0));  
    },
    getRawData(){
      axios.get('https://api.covid19india.org/state_district_wise.json').then(response =>{
          this.rawData = response.data;
          this.states = Object.keys(this.rawData);
      }).catch(error=>{
          console.log(error);
      });
      axios.get('https://api.covid19india.org/data.json').then(response =>{
          this.totalData = response.data.statewise;
          // var x = response.data.tested.length;
          var confirmedDataArray = [];
          var dayArray = [];
          for(let i in response.data.cases_time_series){
            if(response.data.cases_time_series[i].totalconfirmed!=""){
              confirmedDataArray.push(response.data.cases_time_series[i].totalconfirmed);
              dayArray.push(response.data.cases_time_series[i].date);
            }
          }
          this.totalConfirmedCases = this.last(confirmedDataArray);
          this.createChart(dayArray,confirmedDataArray);
      }).catch(error=>{
          console.log(error);
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
.selectorClass{
  min-height: 30px;
  min-width: 200px;
  margin-left: 10px;
  margin-right: 10px;
}
.chart{
      max-height: 400px;
    max-width: 780px;
   
    text-align: center;
    
}
</style>
