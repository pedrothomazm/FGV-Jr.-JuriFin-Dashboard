import { useState, useEffect } from "react";

function CardBalance({ data }) {
	const [balance, setBalance] = useState(null)

	useEffect(() => {
		if (data){
			const balance = data.entradas_saidas_saldo.saldo.toFixed(2)
			setBalance(balance)
		}
	}, [data])

	return(
		<>
			<p className="text-xl font-bold">
			{
				(balance) ?
					balance:
					""
			}
			</p>
		</>
	)
}

export default CardBalance