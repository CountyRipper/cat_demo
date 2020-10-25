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


var mychart = echarts.init(document.getElementById('weight_chart'));
var option = {
    title: {
        left: 'center',
        text: '传感器',
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#283b56'
            }
        }
    },
    toolbox: {
        show: true,
        feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
        }
    },
    xAxis: [{
        type: 'category',
        boundaryGap: true,
        data: (function () {
            var now = new Date();
            var res = [];
            var len = 10;
            while (len--) {
                res.unshift(now.toLocaleTimeString().replace(/^\D*/, ''));
                now = new Date(now - 2000);
            }
            return res;
        })()
    }

    ],
    yAxis: [
        {
            type: 'value',
            scale: true,
            name: '重量值',
            max: 10,
            min: 0,
            boundaryGap: [0.2, 0.2]
        },
        {
            type: 'value',
            scale: true,
            name: '气味值',
            max: 150,
            min: 0,
            boundaryGap: [0.2, 0.2]
        }
    ],
    series: [{
        name: "重量",
        data: (function (){
            var res = [];
            var len = 10;
            while (len--) {
                res.push(0);
            }
            return res;
        })()
        ,
        type: 'bar',
        smooth: true
    },
    {
        name: "气味值",
        data: (function (){
            var res = [];
            var len = 0;
            while (len < 10) {
                res.push(0);
                len++;
            }
            return res;
        })(),
        type: 'line',
        smooth: true
    }
    ]
}

mychart.setOption(option)
//app.count = 11;
setInterval(function () {

    $.post("/getinfo", (data_sum, status) => {

        //默认data_sum数据为json对象
        console.log(data_sum)

        //动态数据表
        var axisData = (new Date()).toLocaleTimeString().replace(/^\D*/, '');
        var data0 = option.series[0].data;
        var data1 = option.series[1].data;
        //设置重量
        data0.shift()
        data0.push(data_sum.weight)
        //设置气味
        data1.shift()
        data1.push(data_sum.odor)
        option.xAxis[0].data.shift()
        option.xAxis[0].data.push(axisData)
        mychart.setOption(option);
    })

    // option.xAxis[1].data.shift();
    // option.xAxis[1].data.push(app.count++);

}, 2100);