//用重量绘图
var datalist_w=[];
var data_w={weight: 0}
var now_w = new Date();
function getinfo_w(){
    $.post("/getinfo",(data,status)=>{
        //默认data数据为json对象
        console.log(data)
        //获取到之后设置绘图数据
        
    }).fail((xhr,status,info)=>{
        
        console.log("失败")
    })
}