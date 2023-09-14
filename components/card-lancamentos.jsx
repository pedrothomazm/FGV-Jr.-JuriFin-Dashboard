import { useState, useEffect } from "react";

function CardTransactions({ data }) {
	const [transactions, setTransactions] = useState(null)

	useEffect(() => {
		if (data){
			const transactionsData = data.lancamentos
			setTransactions(transactionsData)
		}
	}, [data])

	let colorsArray = ["dark", "dark", "dark"]

	if(transactions){
		colorsArray = []
		transactions.forEach(element => {
			if (element.Lançamento <= 0){
				colorsArray.push("red")
			}
			else {
				colorsArray.push("green")
			}
		});
	}
	

	return(
		<>
			<div className="w-full h-full col-span-2 flex flex-col justify-evenly">
				<div className="w-full px-2 h-1/5 flex justify-center items-center">
					<p className="text-xl font-bold">
						Últimas entradas e saídas
					</p>
				</div>
				<div className="w-full px-2 flex flex-row justify-between items-center">
					<p className="text-basic">
						{
							(transactions) ?
								transactions[0].Origem:
								"" 
						} 
					</p>
					<p className="text-basic">
						{
							(transactions) ?
								transactions[0].Data :
								""
						} 
					</p>
					<p className={"text-basic text-" + colorsArray[0]}>R$
						{
							(transactions) ?
								transactions[0].Lançamento.toFixed(2) :
								""
						}
					</p>
				</div>
				<div className="w-full px-2 flex flex-row justify-between items-center">
					<p className="text-basic">
						{
							(transactions) ?
								transactions[1].Origem:
								"" 
						} 
					</p>
					<p className="text-basic">
						{
							(transactions) ?
								transactions[1].Data :
								""
						} 
					</p>
					<p className={"text-basic text-" + colorsArray[1]}>R$
						{
							(transactions) ?
								transactions[1].Lançamento.toFixed(2) :
								""
						}
					</p>
				</div>
				<div className="w-full px-2 flex flex-row justify-between items-center">
					<p className="text-basic">
						{
							(transactions) ?
								transactions[2].Origem:
								"" 
						} 
					</p>
					<p className="text-basic">
						{
							(transactions) ?
								transactions[2].Data :
								""
						} 
					</p>
					<p className={"text-basic text-" + colorsArray[2]}>R$
						{
							(transactions) ?
								transactions[2].Lançamento.toFixed(2) :
								""
						}
					</p>
				</div>
			</div>
		</>
	)
}

export default CardTransactions