$(document).ready(function(){
    fetchFunction("/api/models/admin/getReviews",{},"post",function(datas){
        console.log(datas)
        const reviews = datas.reviews
        reviews.map(function(reviews){
            document.getElementById("reviewList").html += `
            <div id="navpills-" class="tab-pane active show" role="tabpanel">
                <div class="card review-table">
                    <div class="media align-items-center">
                        <img class="me-3 img-fluid rounded" width="90" src="https://omah.dexignzone.com/codeigniter/demo/public/assets/images/customers/3.jpg" alt="DexignZone">
                        <div class="media-body d-lg-flex d-block row align-items-center">
                            <div class="col-xl-4 col-xxl-5 col-lg-12 review-bx">
                                <span class="text-primary d-block">#C01234</span>
                                <h3 class="fs-18 text-black font-w600 mb-1">Peter Parkur</h3>
                                <span class="d-block mb-xl-0 mb-3">Join on 26/04/2020, 12:42 AM</span>
                            </div>
                            <div class="col-xl-7 col-xxl-7 col-lg-12 text-dark mb-xl-0 mb-2">
                                <p>Dealing with Syamsudin and Bakri was a joy. I got in touch with Just Property after seeing a couple of properties that caught my eye. Both Syamsudin and Bakri strive to deliver a professional service and surpassed my expectations - they were not only help.</p> 
                            </div>
                        </div>
                        <div class="media-footer d-sm-flex d-block align-items-center">
                            <div class="me-5 text-xl-center text-start  ms-xl-3 mb-sm-0 mb-3 ms-0">
                                <span class="bgl-primary text-primary rounded p-1 ps-2 pe-2 font-w600 fs-12 d-inline-block mb-2 mb-sm-3">EXCELENT</span>
                                <span class="star-review d-block">
                                    <i class="fas fa-star text-primary"></i>
                                    <i class="fas fa-star text-primary"></i>
                                    <i class="fas fa-star text-primary"></i>
                                    <i class="fas fa-star text-primary"></i>
                                    <i class="fas fa-star text-gray"></i>
                                </span>
                            </div>
                            <div class="edit ms-auto">
                                <a href="javascript:void(0);" class="btn btn-outline-success rounded  me-2">Approve</a>
                                <a href="javascript:void(0);" class="btn btn-outline-danger rounded">Reject</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </div>
            `
        })
    })
})