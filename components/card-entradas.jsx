import { useState, useEffect } from "react";

function CardIncomes({ data }) {
	const [income, setIncome] = useState(null)

	useEffect(() => {
		if (data){
			const income = data.entradas_saidas_saldo.entradas.toFixed(2)
			setIncome(income)
		}
	}, [data])

	return(
		<>
			<p className="text-xl font-bold text-green">R$ 
			{
				(income) ?
					income:
					""
			}
			</p>
		</>
	)
}

export default CardIncomes