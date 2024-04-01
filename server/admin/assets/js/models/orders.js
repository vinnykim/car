$(document).ready(function(){
    fetchFunction("/api/models/admin/main/getOrders",function(datas){
        console.log(datas)
        const orders = datas.orders
        orders.map(function(order){
            document.getElementById("orderList").html += `
            `
        })
    })
})