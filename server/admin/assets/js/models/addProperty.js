$("#addVehicle-btn").click(function(e){
    addVehicle()
})

function addVehicle(e){
    $(e).prop('disabled', true);
    var vehicle = $("#vehicleForm").serialize({ hash: true })
    var vehicle_details =  $("#vehicledetailsForm").serialize({ hash: true })
    vehicle = new URLSearchParams(vehicle)
    const vehicleData = {}
    vehicle_details = new URLSearchParams(vehicle_details)
    for (const [key, value] of vehicle) {
        vehicleData[key] = value;
    }
    for (const [key, value] of vehicle_details) {
        vehicleData[key] = value;
    }
    var payload = vehicleData
    if(location.search.includes("id=") && location.includes("edit=true")){
        var loc_id = location.search.replace("edit=true","")
        loc_id = location.search.replace("?id=","")
        var id = loc_id
        payload._id = id
        payload.update = true
    }
    //email,password
    
    $(e).prop('disabled', false);
    fetchFunction("/api/models/admin/newVehicle",payload,"post",function(data){
        console.log(data)
        createAlert(data)
    })
    return false
}

$(document).ready(function(){
    const features = ['entertainment','navigation','security']
    var ek = ""
    features.map(function(ft){
        console.log(ft)
       ek += `
       <div class="form-check form-check-inline">
            <input type="checkbox" name="vehicleFeatures" class="form-check-input" value="${ft}" id="flexRadioDefault${ft}">
            <label class="form-check-label" for="flexRadioDefault${ft}">${ft}</label>
        </div>
       `
    })
    $("#vehicleFeatures").html(ek)
    if(location.search.includes("id=") && location.includes("edit=true")){
        var loc_id = location.search.replace("edit=true","")
        loc_id = location.search.replace("?id=","")
        var id = loc_id
        if(id.length > 5){
            fetchFunction("/api/models/admin/getDetails/"+id,{},"post",function(data){
                for (const [key, value] of vehicle) {
                    $(`input[name="${key}"]`).val(value);
                }
            })
        }
    }
})