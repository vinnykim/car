$(document).ready(function(){
    const vehicles = []
    fetchFunction("/api/models/admin/getVehicles",{},"post",function(datas){
        let data = datas.vehicles
        console.log(data)
        let html = ''
        if(data.length === 0){}
        for(var vehicle of data){
            html += `
                <div class="col-xl-3 col-xxl-4 col-md-6 col-sm-6 col-lg-4 m-b30">
                    <div class="property-card style-1">
                    <div class="dz-media post-swiper swiper swiper-container-initialized swiper-container-horizontal swiper-container-pointer-events">
                        <ul>
                            <li class="badge badge-sm badge-primary light">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-map-pin"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg> Paris
                            </li>
                            <li class="rent badge badge-sm badge-primary">For ${vehicle.description.vehicleStatus ? vehicle.description.vehicleStatus :  "Rent"}</li>
                        </ul>
                        <div class="swiper-wrapper" id="swiper-wrapper-86093a9613d9f692" aria-live="off" style="transform: translate3d(-610px, 0px, 0px); transition-duration: 0ms;"><div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-next" data-swiper-slide-index="2" role="group" aria-label="1 / 5" style="width: 305px;">
                        <img src="assets/arrivals/01.jpg" alt="/"></div>
                            <div class="swiper-slide swiper-slide-prev" data-swiper-slide-index="0" role="group" aria-label="2 / 5" style="width: 305px;"><img src="assets/arrivals/01.jpg" alt="/"></div>
                            <div class="swiper-slide swiper-slide-active" data-swiper-slide-index="1" role="group" aria-label="3 / 5" style="width: 305px;"><img src="assets/arrivals/02.jpg" alt="/"></div>
                            <div class="swiper-slide swiper-slide-next" data-swiper-slide-index="2" role="group" aria-label="4 / 5" style="width: 305px;"><img src="assets/arrivals/03.jpg" alt="/"></div>
                        <div class="swiper-slide swiper-slide-duplicate swiper-slide-duplicate-prev" data-swiper-slide-index="0" role="group" aria-label="5 / 5" style="width: 305px;"><img src="assets/arrivals/04.jpg" alt="/"></div></div>
                        <div class="menu-button-prev btn-prev" tabindex="0" role="button" aria-label="Previous slide" aria-controls="swiper-wrapper-86093a9613d9f692"><i class="icon-arrow-left"></i></div>
                        <div class="menu-button-next btn-next" tabindex="0" role="button" aria-label="Next slide" aria-controls="swiper-wrapper-86093a9613d9f692"><i class="icon-arrow-right"></i></div>
                    <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span></div>
                    <div class="dz-content">
                        <h3 class="title">$${vehicle.description.vehiclePrice}</h3>
                        <div class="dz-meta">
                            <ul>
                                <li><a href="javascript:void(0);">
                                ${vehicle.description.vehicleWeight} </a></li>
                            </ul>
                        </div>
                        <p>There are many variations of passages of Lorem Ipsum available, but the majority have. There are many variations of passages of Lorem Ipsum available, but the majority have.</p>
                        <hr>
                        <div class="dz-footer">
                            <div class="property-card">
                                <div class="property-media">
                                    <img src="assets/arrivals/01.jpg" alt="/">
                                </div>
                                <h6 class="title mb-0">${vehicle.description.vehicleName}</h6>
                            </div>
                            <ul>
                                <li><a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-heart"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg></a></li>
                                <li><a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-share-2"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg></a></li>
                                <li><a href="javascript:void(0);"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-plus"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>`
        }
        
        document.getElementById('vehicleList').innerHTML = html
    })  
})