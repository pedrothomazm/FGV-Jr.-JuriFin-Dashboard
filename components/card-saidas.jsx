import { useState, useEffect } from "react";

function CardExpenses({ data }) {
	const [expense, setExpense] = useState(null)

	useEffect(() => {
		if (data){
			const expense = data.entradas_saidas_saldo.saidas.toFixed(2)
			setExpense(expense)
		}
	}, [data])

	let textSize = "sm"
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
					"Carregando dados"
			}
			</p>
		</>
	)
}

export default CardExpenses