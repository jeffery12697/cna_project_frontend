import {Scatter } from 'react-chartjs-2'
import { useEffect } from 'react';

const EnterGPAChart = ({gpaData, gpaDataFail, deviceWidth}) => {
	// 102~110年轉入資料，共9年
	// tool: 調色工具 https://www.colorhexa.com/
	// 要用state 變數，不然在畫圖時prop變數還沒傳進來，會是空的圖，而chart沒用到state，也不會自動render
	// const ata = [{'x':110,'y':4.3},  {'x':110,'y':1}, {'x':110, 'y':3}, {x:109, 'y':3}, {x:108, 'y':3}]
	// const a = [[110,4.2], [110,4.1] , [110,4.05], [110,2.2], [110, 3.3]]
	useEffect(() => {
		console.log(gpaData)
	}, []);
	const data = {
		datasets: [
			{
				label: '申請成功GPA分佈',
				data: gpaData,
				// data: dataTrans,
				fill: false,
				backgroundColor: '#90EE90',
				borderColor: '#90EE90',
				pointRadius: 8,
			},
			{
				label: '申請失敗GPA分佈',
				data: gpaDataFail,
				// data: dataDouble,
				fill: false,
				backgroundColor: '#DD536C',
				borderColor: '#DD536C',
				pointRadius: 8,
			},	
		],
	};

	if(gpaDataFail.length === 0){
		data.datasets[1].label = "申請失敗無人分享"
	}
	if(gpaData.length === 0){
		data.datasets[0].label = "申請成功無人分享"
	}


	const options = {
		// doc:https://www.chartjs.org/docs/latest/axes/cartesian/linear.html#grace
		maintainAspectRatio: false,
		responsive:true,
		
		scales: {
			x: {
				ticks: {
					stepSize: 1,
					callback: function(value, index, ticks) {
                        return value + '年' ;
                    }
				},
				min: 102,
				max:111
			},
		 	y: {
		 		// beginAtZero: true,
				// min: 0,
				max: 4.3,

			}
		},
		plugins: {
            legend: {
                labels: {
					// doc: https://www.chartjs.org/docs/latest/general/fonts.html
                    font: {
                        size: 15,
						lineHeight: 15,
						family: "Abel",
						weight: "bold"
                    }
                },
            },
			// doc: https://www.chartjs.org/docs/latest/configuration/title.html
			title: {
				// doc: https://www.chartjs.org/docs/latest/general/fonts.html
				font: {
					size: 20,
					lineHeight: 15,
					family: "Abel",
					weight: "bold"
				}
			},

        },		
	};


	return (
		<div style={{margin:"auto", maxWidth:500}}>
			{/* <div className='header'>
			<h1 className='title'>申請人數比較</h1> */}
			{/* </div> */}
			{/* 必須加redraw 才能利用變數改變大小 */}
			{/* 但redraw 會無法繪圖? */}
			{/* <Line data={data} options={options} width={deviceWidth-20} height={300} redraw={true}/> */}
			{ gpaData.length + gpaDataFail.length >= 1
			?			
			<Scatter data={data} options={options} height={300}/>
			:
			<p style={{textAlign:"center", fontSize:"14px"}}> 資料太少啦</p>
			}
		</div>
		
	)

}

export default EnterGPAChart;