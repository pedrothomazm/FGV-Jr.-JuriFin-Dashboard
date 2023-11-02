import { useState, useEffect } from "react";

function CardBalance({ data }) {
	const [balance, setBalance] = useState(null)

	useEffect(() => {
		if (data){
			const balance = data.entradas_saidas_saldo.saldo.toFixed(2)
			setBalance(balance)
		}
	}, [data])
	
	let color = ""
	let textSize = "sm"
	let textFont = ""

	if(balance){
		textSize = "xl"
		textFont = "bold"
		if(balance > 0){
			color = "green"
		}
		else if(balance <= 0){
			color = "red"
		}
	}

	return(
		<>
			<p className={"text-" + textSize + " font-" + textFont + " text-" + color}>
			{
				(balance) ?
					"R$" + balance:
					"Carregando dados"
			}
			</p>
		</>
	)
}

export default CardBalance