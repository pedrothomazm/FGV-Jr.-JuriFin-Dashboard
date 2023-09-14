import { useState, useEffect } from "react";

function CardCashFlow({ data }) {
	const [cashFlow, setCashFlow] = useState(null)

	useEffect(() => {
		if (data){
			const flow = (data.indicador_fluxo_de_caixa * 100).toFixed(2)
			setCashFlow(flow)
		}
	}, [data])

	let color = "dark"

	if(cashFlow){
		if(cashFlow > 0){
			color = "green"
		}
		else{
			color = "red"
		}
	}
	
	

	return(
		<>
			<div className="col-span-1 flex flex-col justify-center">
				<p className="text-xl font-bold text-center">Indicador de fluxo de caixa</p>
				<p className={"text-xl font-bold text-center text-" + color}>
				{
					(cashFlow) ?
						cashFlow:
						""
				}%
				</p>
			</div>
		</>
	)
}

export default CardCashFlow