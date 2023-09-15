import { useState, useEffect } from "react";

function CardIncomes({ data }) {
	const [income, setIncome] = useState(null)

	useEffect(() => {
		if (data){
			const income = data.entradas_saidas_saldo.entradas.toFixed(2)
			setIncome(income)
		}
	}, [data])

	let textSize = ""
	let textFont = ""
	let textColor = ""

	if(income){
		textSize = "xl"
		textFont = "bold"
		textColor = "green"
	}

	return(
		<>
			<p className={"text-" + textSize + " font-" + textFont + " text-" + textColor}>
			{
				(income) ?
					"R$" + income:
					"Dados carregando ou indisponíveis"
			}
			</p>
		</>
	)
}

export default CardIncomes