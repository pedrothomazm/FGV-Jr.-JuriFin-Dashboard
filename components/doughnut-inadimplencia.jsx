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

function DoughnutInadimplencia({ data }) {
	const [valorInadimplencia, setValorInadimplencia] = useState(null)
	const [porcentagemInadimplencia, setPorcentagemInadimplencia] = useState(null)
	const [chartData, setChartData] = useState(null)

	useEffect(() => {
		if(data){
			setPorcentagemInadimplencia(data.inadimplencia.porcentagem * 100)
			const porcentagemAdimplencia = 100 - porcentagemInadimplencia

			const inadimplentes = data.inadimplencia.inadimplencia
			setValorInadimplencia(inadimplentes)

			setChartData({
				labels: ['Inadimplentes', 'Adimplentes'],
				datasets: [
					{
						label: 'porcentagem de inadimplencia',
						data: [porcentagemInadimplencia, porcentagemAdimplencia],
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

	return(
		<>
			<div className="w-full h-full pt-1 flex flex-col align-middle col-span-1 justify-center pt-5">
				<p className="self-center text-lg font-bold">
					Inadimplência	
				</p>
				<p className="self-center border-spacing-2">
					{
						(chartData) ?
							porcentagemInadimplencia + "% de inadimplência":
							""
					}	
				</p>
				<div className=" w-full h-1/2 p-2 flex justify-center">
					{
						(chartData) ?
							<Doughnut options={options} data={chartData} />:
							""
					}
				</div>
				<p className="self-center">
					{
						(chartData) ?
							"R$" + valorInadimplencia:
							"Carregando dados"
					}	
				</p>
			</div>
		</>
	)
}

export default DoughnutInadimplencia