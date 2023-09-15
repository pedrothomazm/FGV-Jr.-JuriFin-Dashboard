import { useState, useEffect } from "react";

function CardExpenses({ data }) {
	const [expense, setExpense] = useState(null)

	useEffect(() => {
		if (data){
			const expense = data.entradas_saidas_saldo.saidas.toFixed(2)
			setExpense(expense)
		}
	}, [data])

	let textSize = ""
	let textFont = ""
	let textColor = ""

	if(expense){
		textSize = "xl"
		textFont = "bold"
		textColor = "red"
	}

	return(
		<>
			<p className={"text-" + textSize + " font-" + textFont + " text-" + textColor}>
			{
				(expense) ?
					"R$" + expense:
					"Dados carregando ou indisponíveis"
			}
			</p>
		</>
	)
}

export default CardExpenses