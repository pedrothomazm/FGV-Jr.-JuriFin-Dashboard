import { useState, useEffect } from "react";

function CardTransactions({ data }) {
	const [transactions, setTransactions] = useState(null)
	const [message, setMessage] = useState("Carregando dados")

	useEffect(() => {
		if (data){
			if(!data.lancamentos || data.lancamentos.length == 0){
				setMessage("Dados indisponíveis")
				setTransactions([])
			}
			else{
				const transactionsData = data.lancamentos
				setTransactions(transactionsData)
			}
		}
	}, [data])

	let transactionsRow1 = false
	let transactionsRow2 = false
	let transactionsRow3 = false

	if(transactions){
		if(transactions.length >= 1){
			transactionsRow1 = true
		}
		if(transactions.length >= 2){
			transactionsRow2 = true
		}
		if(transactions.length >= 3){
			transactionsRow3 = true
		}
	}

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
			<div className="w-full h-full col-span-3 row-start-2 row-end-5 flex flex-col justify-evenly">
				<div className="w-full px-2 h-1/5 flex justify-center items-center">
					<p className="text-xl font-bold">
						Últimas entradas e saídas
					</p>
				</div>
				<div className="w-full px-2 flex flex-row justify-between items-center">
					<p className="text-basic">
						{
							(transactionsRow1) ?
								transactions[0].Origem:
								""
						} 
					</p>
					<p className="text-basic">
						{
							(transactionsRow1) ?
								transactions[0].Data :
								message
						} 
					</p>
					<p className={"text-basic text-" + colorsArray[0]}>
						{
							(transactionsRow1) ?
								"R$" + transactions[0].Lançamento.toFixed(2) :
								""
						}
					</p>
				</div>
				<div className="w-full px-2 flex flex-row justify-between items-center">
					<p className="text-basic">
						{
							(transactionsRow2) ?
								transactions[1].Origem:
								"" 
						} 
					</p>
					<p className="text-basic">
						{
							(transactionsRow2) ?
								transactions[1].Data :
								""
						} 
					</p>
					<p className={"text-basic text-" + colorsArray[1]}>
						{
							(transactionsRow2) ?
								"R$" + transactions[1].Lançamento.toFixed(2) :
								""
						}
					</p>
				</div>
				<div className="w-full px-2 flex flex-row justify-between items-center">
					<p className="text-basic">
						{
							(transactionsRow3) ?
								transactions[2].Origem:
								"" 
						} 
					</p>
					<p className="text-basic">
						{
							(transactionsRow3) ?
								transactions[2].Data :
								""
						} 
					</p>
					<p className={"text-basic text-" + colorsArray[2]}>
						{
							(transactionsRow3) ?
								"R$" + transactions[2].Lançamento.toFixed(2) :
								""
						}
					</p>
				</div>
			</div>
		</>
	)
}

export default CardTransactions