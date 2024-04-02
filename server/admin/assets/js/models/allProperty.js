$(document).ready(function(){
    
    fetchFunction("/api/models/admin/getVehicles",{},"post",function(datas){
        
        let html = ''
        if(datas.vehicles.length === 0){}
        for(var vehicle of datas.vehicles){
            console.log(vehicle)
            html += `
            <div class="col-xl-3 col-xxl-4 col-md-6 col-sm-6 col-lg-4 m-b30" style="max-height: ;" onclick="location.href='detail.html?vehicle=${vehicle._id}'">
            <div class="property-card style-1">
            <div class="dz-media post-swiper swiper swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                <ul>
                    
                    <li class="rent badge badge-sm badge-primary">For ${vehicle.description.vehicleStatus ? vehicle.description.vehicleStatus :  "Rent"}</li>
                </ul>
                
            
            <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
            <div class="dz-content">
                <img src="assets/arrivals/02.jpg" height="198px" width="100%" style="object-fit:cover;"></img>
                <h3 class="title">${vehicle.description.vehiclePrice}</h3>
                <div class="dz-meta">
                    <ul>
                        <li><a href="javascript:void(0);">
                        ${vehicle.description.vehicleWeight} </a></li>
                    </ul>
                </div>
                <p>${vehicle.description.vehicleDescription ? vehicle.description.vehicleDescription : "Vehicle Description"}.</p>
                <hr>
                <div class="dz-footer">
                    <div class="property-card">
                        <div class="property-media">
                            <img src="assets/arrivals/01.jpg" alt="/">
                        </div>
                        <h6 class="title mb-0">${vehicle.name}</h6>
                    </div>
                    <ul>
                        <li><a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></a></li>
                        <li><a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></a></li>
                        <li><a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></a></li>
                    </ul>
                </div>
            </div>
        </div>
        </div>
        `
        }
        
        document.getElementById('vehicleList').innerHTML = html
    })  
})