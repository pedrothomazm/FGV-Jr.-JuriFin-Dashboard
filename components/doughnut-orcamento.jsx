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
	const [orcamentoGrafico, setOrcamentoGrafico] = useState(null)
	const [chartData, setChartData] = useState(null)
	const [message, setMessage] = useState("Carregando os dados")

	useEffect(() => {
		if(data){
			if(!(data.porcentagem_utilizado)){
				setMessage("Dados indisponíveis")
			}
			else{
				let porcUtilizado = data.porcentagem_utilizado.toFixed(2) * 100
				let orcGrafico = 0
				setPorcentagemOrcamentoUtilizado(porcUtilizado)
				if(porcUtilizado >= 100){
					setOrcamentoGrafico(100)
					orcGrafico = 100
				}
				else{
					setOrcamentoGrafico(porcUtilizado)
					orcGrafico = porcUtilizado
				}
				const porcentagemRestante = 100 - orcGrafico
				
				setChartData({
					labels: ['Utilizado', 'Restante'],
					datasets: [
						{
							label: 'Orçamento utilizado',
							data: [orcGrafico, porcentagemRestante],
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
			}
	}, [data]);

	return(
		<>
			<div className="w-full h-auto flex flex-col align-middle col-span-1 justify-center py-2">
				<p className="self-center text-lg font-bold">
					Orçamento da área
				</p>
				<p className="self-center text-">
					{
						(chartData) ?
							porcentagemOrcamentoUtilizado + "% utilizado":
							message
					}	
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