import { useState, useEffect } from "react";

import { 
	Chart as ChartJS,
	ArcElement,
	Tooltip,
	Legend,
} from 'chart.js';
import { Doughnut } from "react-chartjs-2";

ChartJS.register(
	ArcElement,
	Tooltip,
	Legend,
)

export const options = {
	responsive: true,
	maintainAspectRatio: false,
	plugins: {
		legend: {
			display: false
		},
	}
};

function DoughnutOrcamento({ data }) {
	const [porcentagemOrcamentoUtilizado, setPorcentagemOrcamentoUtilizado] = useState(null)
	const [chartData, setChartData] = useState(null)

	useEffect(() => {
		if(data){
			setPorcentagemOrcamentoUtilizado(data.porcentagem_utilizado.toFixed(2) * 100)
			const porcentagemRestante = 100 - porcentagemOrcamentoUtilizado

			setChartData({
				labels: ['Utilizado', 'Restante'],
				datasets: [
					{
						label: 'Orçamento utilizado',
						data: [porcentagemOrcamentoUtilizado, porcentagemRestante],
						backgroundColor: [
							'rgba(161, 173, 168)',
							'rgba(34, 46, 102)'
						],
						borderColor: [
							'rgba(161, 173, 168)',
							'rgba(34, 46, 102)'
						],
						borderWidth: 1
					},
				],
			})
		}
	}, [data]);

	// useEffect(() => {
	// 	if(data){
			
	// 	}
	// }, [data])

	return(
		<>
			<div className="w-full h-full pt-1 flex flex-col justify-center col-span-1">
				<p className="self-center text-lg font-bold">
					Orçamento da área
				</p>
				<p className="self-center">
					{
						(chartData) ?
							porcentagemOrcamentoUtilizado:
							""
					}	
					% utilizado
				</p>
				<div className=" w-full h-1/2 p-2 flex justify-center">
					{
						(chartData) ?
							<Doughnut options={options} data={chartData} />:
							""
					}
				</div>
			</div>
		</>
	)
}

export default DoughnutOrcamento