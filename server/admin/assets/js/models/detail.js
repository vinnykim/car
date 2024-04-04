$(document).ready(function(){
    let vehicle = "6b"
    if(location.search.includes("?vehicle")){
        vehicle = location.search.split("&")[0]
        vehicle = vehicle.replace("?vehicle=","")
    }else{
        location.href="all_property.html"
    }
    $("#vehicle_id").text(vehicle)
    fetchFunction("/api/models/admin/getDetail/"+vehicle,{},"post",function(datas){
        setTimeout(function(){
            fetchFunction("/api/models/admin/vehicleBookings/"+vehicle,{},"post",function(data){
                const list = document.getElementById("vehicleBookings")
                for(var booking of data.bookings){
                    list.innerHTML += `
                        
                    `
                }
            })
        },499)
        const vehicle = datas.vehicle
        const books = datas.books
        document.getElementById("vehicleDetail").innerHTML = `
        <div class="row">
            <div class="col-xl-3 col-xxl-4">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card bg-primary text-center">
                            <div class="card-body">
                                <h2 class="fs-30 text-white">SALE</h2>
                                <span class="text-white font-w300">$${vehicle.description.vehiclePrice}</span>
                            </div>
                        </div>
                    </div>
                    
                    
                    
                </div>
            </div>
            <div class="col-xl-9 col-xxl-8">
                <div class="row">
                    <div class="col-xl-12">
                        <div class="card">
                            <div class="card-body">
                                <div id="lightgallery" class="front-view-slider mb-sm-5 mb-3 owl-carousel owl-loaded owl-drag">	
                                    <div class="front-view">
                                        <img src="/assets/arrivals/01.jpg" alt="/">
                                        <div class="info">
                                            <h3 class="mb-2 text-white">>${vehicle.description.vehicleModel}</h3>
                                            <p class="mb-0"></p>
                                        </div>
                                        <div class="buttons">
                                            <a href="javascript:void(0);" class="me-4">
                                                <svg width="25" height="27" viewBox="0 0 25 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.7501 17.125C18.9899 17.1268 18.2409 17.3083 17.5643 17.6548C16.8877 18.0013 16.3026 18.503 15.8569 19.1188L9.79706 15.0793C10.1789 14.0611 10.1789 12.939 9.79706 11.9207L15.8569 7.88126C16.537 8.80338 17.5237 9.45273 18.6397 9.71264C19.7556 9.97256 20.9277 9.826 21.9453 9.29931C22.9629 8.77261 23.7594 7.9003 24.1915 6.8391C24.6237 5.77789 24.6633 4.59736 24.3032 3.50959C23.943 2.42182 23.2068 1.49812 22.2268 0.904453C21.2467 0.310781 20.0871 0.0860493 18.9562 0.270634C17.8254 0.455218 16.7974 1.03702 16.057 1.91151C15.3166 2.786 14.9123 3.89586 14.9168 5.04168C14.9246 5.21774 14.9424 5.39323 14.9699 5.5673L8.45581 9.91005C7.76161 9.28424 6.90085 8.87314 5.97778 8.72652C5.0547 8.5799 4.10892 8.70406 3.25497 9.08396C2.40102 9.46386 1.67554 10.0832 1.16638 10.867C0.657219 11.6508 0.38623 12.5654 0.38623 13.5C0.38623 14.4347 0.657219 15.3492 1.16638 16.133C1.67554 16.9168 2.40102 17.5362 3.25497 17.9161C4.10892 18.296 5.0547 18.4201 5.97778 18.2735C6.90085 18.1269 7.76161 17.7158 8.45581 17.09L14.9699 21.4327C14.9424 21.6068 14.9246 21.7823 14.9168 21.9583C14.9168 22.9143 15.2002 23.8488 15.7313 24.6436C16.2624 25.4384 17.0173 26.0579 17.9005 26.4238C18.7836 26.7896 19.7555 26.8853 20.693 26.6988C21.6306 26.5123 22.4918 26.052 23.1678 25.376C23.8437 24.7001 24.3041 23.8389 24.4906 22.9013C24.6771 21.9637 24.5813 20.9919 24.2155 20.1087C23.8497 19.2255 23.2302 18.4707 22.4354 17.9396C21.6405 17.4085 20.706 17.125 19.7501 17.125Z" fill="white"></path>
                                                </svg>
                                            </a>
                                            
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <a href="javascript:void(0);" class="btn btn-primary rounded mb-4">${vehicle.description.vehicleStatus}</a>
                                    <div class="d-md-flex d-block mb-sm-5 mb-3">
                                        <div class="me-auto mb-md-0 mb-4">
                                            <h3>${vehicle.name}</h3>
                                            <span class="fs-16">
                                                ${vehicle.description.vehicleModel}   
                                            </span>
                                        </div>
                                        <div class="ms-md-4 text-md-right">
                                            <p class="text-black mb-1 me-1">Price range</p>
                                            <h3 class="text-primary">$${vehicle.description.vehiclePrice} - $${vehicle.description.vehicleMarketvalue}</h3>
                                        </div>
                                    </div>
                                    <div class="mb-sm-5 mb-2">
                                        <a href="javascript:void(0);" class="btn btn-primary light rounded me-2 mb-sm-0 mb-2">
                                            ${vehicle.description.vehicleFuel}
                                        </a>
                                        <a href="javascript:void(0);" class="btn btn-primary light rounded mb-sm-0 mb-2">
                                        ${vehicle.description.vehiclePassengers ? vehicle.description.vehiclePassengers : "4"} Passengers
                                        </a>
                                        <a href="javascript:void(0);" class="btn btn-primary light rounded me-2 mb-sm-0 mb-2">
                                        ${vehicle.description.vehicleWheels} Wheels
                                        </a>
                                    
                                    </div>
                                    <h4>Description</h4>
                                    
                                    <p>${vehicle.description.vehicleDescription ? vehicle.description.vehicleDescription : "Vehicle"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="image-gallery owl-carousel owl-loaded owl-drag">
                                    
                                <div class="owl-stage-outer"><div class="owl-stage" style="transform: translate3d(-1834px, 0px, 0px); transition: all 3s ease 0s; width: 3669px;"><div class="owl-item" style="width: 581.5px; margin-right: 30px;"><div class="items">
                                        <img src="/assets/arrivals/01.jpg" alt="/">
                                    </div></div><div class="owl-item" style="width: 581.5px; margin-right: 30px;"><div class="items">
                                        <img src="/assets/arrivals/02.jpg" alt="/">
                                    </div></div><div class="owl-item" style="width: 581.5px; margin-right: 30px;"><div class="items">
                                        <img src="/assets/arrivals/03.jpg" alt="/">
                                    </div></div><div class="owl-item active" style="width: 581.5px; margin-right: 30px;"><div class="items">
                                        <img src="/assets/arrivals/04.jpg" alt="/">
                                    </div></div><div class="owl-item" style="width: 581.5px; margin-right: 30px;"><div class="items">
                                        <img src="/assets/arrivals/05.jpg" alt="/">
                                    </div></div><div class="owl-item" style="width: 581.5px; margin-right: 30px;"><div class="items">
                                        <img src="/assets/arrivals/06.jpg" alt="/">
                                    </div></div></div></div><div class="owl-nav"><div class="owl-prev"><i class="fas fa-caret-left"></i></div><div class="owl-next"><i class="fas fa-caret-right"></i></div></div><div class="owl-dots"><div class="owl-dot"><span></span></div><div class="owl-dot"><span></span></div><div class="owl-dot"><span></span></div><div class="owl-dot active"><span></span></div><div class="owl-dot"><span></span></div><div class="owl-dot"><span></span></div></div></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="card property-features">
                            <div class="card-header border-0 pb-0">	
                                <h3 class="fs-20 text-black mb-0">Vehicle Features</h3>
                            </div>
                            <div class="card-body">
                                <ul>
                                    ${vehicle.description.vehicleFeatures ? vehicle.description.vehicleFeatures : ""}
                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-12">
                        <div class="card property-features">
                            <div class="card-header border-0 pb-0">	
                                <h3 class="fs-20 text-black mb-0">Vehicle Bookings</h3>
                            </div>
                            <div class="card-body" id="vehicleBookings">
                               
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    })
})