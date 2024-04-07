$(document).ready(function(){
    let vehicle = "null"
    if(location.search.includes("?vehicle")){
        vehicle = location.search.split("&")[0]
        vehicle = vehicle.replace("?vehicle=","")
    }else{
        location.href="all_property.html?vehilce"+vehicle
    }
    $("#live_vehicle").text(vehicle)
    fetchFunction("/api/models/admin/getDetail/"+vehicle,{},"post",function(datas){
        $("#live_vehicle").text(datas.vehicle.name)
    })
})