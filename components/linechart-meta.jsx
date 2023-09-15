import { useState, useEffect } from "react";
import { Line } from 'react-chartjs-2' ;

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			postion: 'bottom'
		},
		title:{
			display: false,
			text: "Meta"
		}
	}
};

function LineChart ({data}) {	
	const [chartData, setChartData] = useState(null)

	useEffect(() => {
		if(data){
			const labels = Object.keys(data.atual_meta.metas_mensais)
			let goalsArray = []
			for (const month in data.atual_meta.metas_mensais) {
				if (data.atual_meta.metas_mensais.hasOwnProperty(month)) {
				const meta = data.atual_meta.metas_mensais[month];
				goalsArray.push(meta);
				}
			}

			setChartData({
				labels,
				datasets: [
					{
						label: "Meta",
						data: goalsArray,
						borderColor: 'rgba(34, 46, 102, 1)',
						backgroundColor: 'rgba(34, 46, 102, 1)',
					},
				]
			})
		}
	}, [data])

	console.log(chartData)
	
	return (
		<>
			<div className="w-full px-2 h-full flex flex-col justify-center">
				<p className="text-lg self-center font-bold">Meta atingida</p>
				<div className="p-2 w-full h-full flex justify-items-center">
					{
						(chartData) ?
							<Line options={options} data={chartData} />:
							"Carregando dados"
					}
				</div>
			</div>
		</>
	)
};

export default LineChart