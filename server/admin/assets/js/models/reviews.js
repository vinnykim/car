$(document).ready(function(){
    fetchFunction("/api/models/admin/main/getReviews",function(datas){
        console.log(datas)
        const reviews = datas.reviews
        reviews.map(function(reviews){
            document.getElementById("reviewList").html += `
            `
        })
    })
})