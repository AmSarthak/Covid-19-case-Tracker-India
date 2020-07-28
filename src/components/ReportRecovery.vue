<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-12">
                <h1 class="heading mb-4 text-info" style="margin-top:-20px;">Covid-19 Report Recovery India</h1>
                <div class="row">
                    <div class="col-sm-3">
                        <input class="selectorClass" type="text" placeholder="Enter name of patient">
                    </div>
                    <div class="col-sm-3">
                        <input class="selectorClass" type="text" placeholder="Enter age of patient">
                    </div>
                    <div class="col-sm-3">
                        <input class="selectorClass" type="text" placeholder="Date reported(dd/mm/yyyy)">
                    </div>
                    <div class="col-sm-3">
                         <input class="selectorClass" type="text" placeholder="Date discharged(d/mm/yyyy)">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-3">
                        <input class="selectorClass" type="text" placeholder="Gender">
                    </div>
                    <div class="col-sm-3">
                         <input class="selectorClass" type="text" placeholder="Travel History (Yes/No)">
                    </div>
                     <div class="col-sm-3">
                        <input class="selectorClass" type="text" placeholder="State">
                    </div>
                    <div class="col-sm-3">
                         <input class="selectorClass" type="text" placeholder="District">
                    </div>
                </div>
                <div class="row">
                    <div class="col-sm-6">
                       <textarea cols="30" rows="10" class="text-center" placeholder="Medications"/>
                    </div>
                    <div class="col-sm-6">
                         <textarea cols="30" rows="10" class="text-center" placeholder="Other Details"/>
                    </div>
                </div>
                <button @click="submitReport()" class="customBtn btn btn-outline-success">Submit Report</button>
                <button @click="goBack()" class="btn btn-outline-danger">Cancel</button>   
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ReportRecovery',
    methods:{
        submitReport(){
            this.reportSubmitted  = true;
            alert('Report Submitted');
        },
        goBack(){
            this.$router.push({name : 'HelloWorld'})
        }
    },
    data(){
        return{
            reportSubmitted : false
        }
    }
}

</script>

<style>
.selectorClass{
   margin-left: 10px;
    margin-right: 10px;
    min-width: 300px;
    min-height: 50px;
    text-align: center;
    margin-bottom: 20px;
}
.alertClass{
   text-align: center;
   height: 50px;
   width: 700px;
}
.customBtn{
    margin-right: 25px;
    margin-left: 25px;
}
</style>