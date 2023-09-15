import { useState, useEffect } from "react";

function CardCashFlow({ data }) {
	const [cashFlow, setCashFlow] = useState(null)

	useEffect(() => {
		if (data){
			const flow = (data.indicador_fluxo_de_caixa * 100).toFixed(2)
			setCashFlow(flow)
		}
	}, [data])

	let textSize = ""
	let textFont = ""
	let textColor = ""

	if(cashFlow){
		textSize = "xl"
		textFont = "bold"
		if(cashFlow > 0){
			textColor = "green"
		}
		else{
			textColor = "red"
		}
	}
	
	

	return(
		<>
			<div className="col-span-1 flex flex-col justify-center">
				<p className="text-xl font-bold text-center">Indicador de fluxo de caixa</p>
				<p className={"text-" + textSize + " font-" + textFont + " text-center text-" + textColor}>
				{
					(cashFlow) ?
						cashFlow + "%":
						"Dados carregando ou indisponíveis"
				}
				</p>
			</div>
		</>
	)
}

export default CardCashFlow