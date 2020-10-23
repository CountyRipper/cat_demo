//循环发送请求，每5秒
window.onload = function () {
    getinfo()
}
function getinfo() {
    //1000*5=5s
    setTimeout(getinfo, 5 * 1000)
    $.post("/getinfo", (data, status) => {
        //默认data数据为json对象
        console.log(data)
        //获取到之后调用绘图函数
        //weight() odor()
    })
}


echarts.init(document.getElementById('weight_chart')).setOption({
    title: {
        left: 'center',
        text: '重量感应',
    },
    xAxis: {
        type: 'category',
        data: ['17:40', '17:45', '17:50', '17:55', '18:00', '18:55', '18:10']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [0.02, 0.02,3.25, 5.26, 5.36, 5.87,0.02 ],
        type: 'line',
        smooth: true
    }]
});
echarts.init(document.getElementById('odor_chart')).setOption({
    title: {
        left: 'center',
        text: '气体感应',
    },
    xAxis: {
        type: 'category',
        data: ['17:40', '17:45', '17:50', '17:55', '18:00', '18:55', '18:10']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [15, 16, 18, 25, 27, 22, 19],
        type: 'line',
        smooth: true
    }]
});