$(document).ready(function(){
    fetchFunction("/api/models/admin/getOrders",{},"post",function(datas){
        console.log(datas)
        const orders = datas.orders
        orders.map(function(order){
            document.getElementById("orderList").html += `
            `
        })
    })
})