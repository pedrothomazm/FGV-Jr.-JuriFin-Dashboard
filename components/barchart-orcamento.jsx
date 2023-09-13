import { URL_completa } from "./url";
import { jsonData } from "./data";

import { useState, useEffect } from "react";

import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2' ;
// import faker from 'faker';

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
	plugins: {
		legend: {
			postion: 'top'
		},
		title:{
			display: true,
			text: "Orçamento de cada área"
		}
	}
};

const BarChart = () => {	
	const [planilhaData, setPlanilhaData] = useState(null)
	
	useEffect(() => {
		async function getData () {
			const response = await fetch("http://127.0.0.1:5328/Geral/1000/100000")
			const data = await response.json()
			
			setPlanilhaData(data)
		}
		getData()
	}, [])
	
	// Labels das areas
	const labels = Object.keys(planilhaData.orcado_utilizado)
	// criando arrays vazios e preenchendo com os valors utilizados e or
	// çados de cada área
	let orcamentosArray = []
	for (const area in planilhaData.orcado_utilizado) {
		if (planilhaData.orcado_utilizado.hasOwnProperty(area)) {
		  const orcamento = planilhaData.orcado_utilizado[area].Orçamento;
		  orcamentosArray.push(orcamento);
		}
	}
	let utilizadosArray = []
	for (const area in planilhaData.orcado_utilizado) {
		if (planilhaData.orcado_utilizado.hasOwnProperty(area)) {
		  const orcamento = planilhaData.orcado_utilizado[area].Utilizado;
		  utilizadosArray.push(orcamento);
		}
	}

	const chartData = {
		labels,
		datasets: [
			{
				label: "Orçamento",
				data: orcamentosArray,
				backgroundColor: 'rgba(34, 46, 102, 1)',
			},
			{
				label: "Utilizado",
				data: utilizadosArray,
				backgroundColor: 'rgba(161, 173, 168)',
			},
		]
	}
	
	return (
		<>
			<div className="w-full px-2 h-full">
				<Bar options={options} data={chartData} />
			</div>
		</>
	)
};

export default BarChart