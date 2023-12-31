import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend,
} from 'chart.js';

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Filler,
	Legend
);

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			position: "top"
		},
		title:{
			display: false,
			text: "Meta"
		}
	}
};

function AreaChart ({data}) {	
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
			let incomesArray = []
			for (const month in data.atual_meta.entradas) {
				if (data.atual_meta.entradas.hasOwnProperty(month)) {
					const meta = data.atual_meta.entradas[month];
					incomesArray.push(meta);
				}
			}

			setChartData({
				labels,
				datasets: [
					{
						fill: false,
						label: "Meta",
						data: goalsArray,
						borderColor: 'rgba(34, 46, 102, 1)',
						backgroundColor: 'rgba(34, 46, 102, 1)',
					},
					{
						fill: true,
						label: "Faturamento",
						data: incomesArray,
						borderColor: 'rgba(161, 173, 168)',
						backgroundColor: 'rgba(161, 173, 168, 0.4)',
					}

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

export default AreaChart