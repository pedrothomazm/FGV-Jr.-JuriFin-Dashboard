import { useState, useEffect } from "react";
import { Bar } from 'react-chartjs-2' ;

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	borderRadius: 4,
	plugins: {
		legend: {
			postion: 'top'
		},
		title:{
			display: false,
			text: "Orçamento de cada área"
		}
	}
};

function BarChart({ data }) {	
	const [chartData, setChartData] = useState(null)

	useEffect(()=>{
		if (data) {
			// Labels das areas
			const labels = Object.keys(data.orcado_utilizado)
			// criando arrays vazios e preenchendo com os valors utilizados e or
			// çados de cada área
			let budgetsArray = []
			for (const area in data.orcado_utilizado) {
				if (data.orcado_utilizado.hasOwnProperty(area)) {
				  const budget = data.orcado_utilizado[area].Orçamento;
				  budgetsArray.push(budget);
				}
			}
			let utilizedArray = []
			for (const area in data.orcado_utilizado) {
				if (data.orcado_utilizado.hasOwnProperty(area)) {
				  const utilized = data.orcado_utilizado[area].Utilizado;
				  utilizedArray.push(utilized);
				}
			}
		
			setChartData({
				labels,
				datasets: [
					{
						label: "Orçamento",
						data: budgetsArray,
						backgroundColor: 'rgba(34, 46, 102, 1)',
					},
					{
						label: "Utilizado",
						data: utilizedArray,
						backgroundColor: 'rgba(161, 173, 168)',
					},
				]
			})
		}
	}, [data])
	
	console.log(chartData)
	
	return (
		<>
			<div className="w-full px-2 h-full flex flex-col justify-items-center">
				<p className="text-lg self-center font-bold">Orçado x Utilizado</p>
				<div className="p-2 w-full h-full flex justify-items-center">
					{
						(chartData) ? 	
							<Bar options={options} data={chartData} />:
							"Carregando dados"
					}
				</div>
			</div>
		</>
	)
};

export default BarChart