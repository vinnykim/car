$(document).ready(function(){
    fetchFunction("/api/models/admin/main/getDetail",function(datas){
        console.log(datas)
        const orders = datas.orders
        
    })
})