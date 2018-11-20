import React , {Component} from 'react'
import echarts from 'echarts'
window.er = echarts;

const echartStyle = {
    width:'400px',height:'300px'
}
class MyEcharts extends Component{
    option = {
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            areaStyle: {}
        }]
    }
    render(){
        return <div ref="echart" style={echartStyle}></div>
    }
    componentDidMount(){
        let myChart = echarts.init(this.refs.echart);
        myChart.setOption(this.option);
    }
}

class Home extends Component{
    render(){
        return <div>Home

            <MyEcharts />
        </div>

    }
}
export default Home;