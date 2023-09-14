import { useState, useEffect } from "react";

function CardBalance({ data }) {
	const [balance, setBalance] = useState(null)

	useEffect(() => {
		if (data){
			const balance = data.entradas_saidas_saldo.saldo.toFixed(2)
			setBalance(balance)
		}
	}, [data])

	let color = "dark"

	if(balance > 0){
		color = "green"
	}
	else{
		color = "red"
	}

	return(
		<>
			<p className={"text-xl font-bold text-" + color}>R$ 
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