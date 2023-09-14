import { useState, useEffect } from "react";

function CardExpenses({ data }) {
	const [expense, setExpense] = useState(null)

	useEffect(() => {
		if (data){
			const expense = data.entradas_saidas_saldo.saidas.toFixed(2)
			setExpense(expense)
		}
	}, [data])

	return(
		<>
			<p className="text-xl font-bold">
			{
				(expense) ?
					expense:
					""
			}
			</p>
		</>
	)
}

export default CardExpenses