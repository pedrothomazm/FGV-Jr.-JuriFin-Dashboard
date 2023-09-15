import Head from 'next/head'
import Header from '@/components/header'
import BarChart from '@/components/barchart-orcamento'
import LineChart from '@/components/linechart-meta'

import { useState, useEffect } from 'react'
import CardBalance from '@/components/card-saldo'
import CardIncomes from '@/components/card-entradas'
import CardExpenses from '@/components/card-saidas'
import DoughnutInadimplencia from '@/components/doughnut-inadimplencia'
import DoughnutOrcamento from '@/components/doughnut-orcamento'
import CardTransactions from '@/components/card-lancamentos'
import CardCashFlow from '@/components/card-fluxo-caixa'
import RangeSlider from '@/components/range-slider'
import DropDownMenu from '@/components/dropdown-menu'

const areas = [
  "Geral",
  "Jurídico Financeiro",
  "Projetos",
  "Comercial",
  "Gestão",
  "Presidência",
  "Marketing",
  "Digital"
]

const meses = [
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
]

export default function Home({data}) {
  const[sheetData, setSheetData] = useState()
  const[dataInicial, setDataInicial] = useState(1000)
  const[dataFinal, setDataFinal] = useState(100000)
  const[area, setArea] = useState("Geral")
  
  useEffect(() => {
		async function getData (area, dataInicial, dataFinal) {
      const areaEscaped = area.replace(" ", "%20")
      const url = `http://127.0.0.1:5328/${areaEscaped}/${dataInicial}/${dataFinal}`
      const response = await fetch(url)
			//const response = await fetch("http://127.0.0.1:5328/Geral/1000/100000")
			const data = await response.json()
			
			setSheetData(data)
			console.log(sheetData)
		}
		
		getData(area, dataInicial, dataFinal)
  }, [area, dataInicial, dataFinal])

  const dateToSerial = (date) => {
    const converted = 25569.0 + ((date.getTime() - (date.getTimezoneOffset() * 60 * 1000)) / (1000 * 60 * 60 * 24));
    return converted
  }
  
  const setMesInicial = (mes) => {
    const date = new Date(0);
    date.setFullYear((new Date()).getFullYear());
    date.setMonth(mes);
    date.setDate(1);
    const serial = dateToSerial(date)
    setDataInicial(Math.trunc(serial))
  }

  const setMesFinal = (mes) => {
    const date = new Date(0);
    date.setFullYear((new Date()).getFullYear());
    date.setMonth(mes + 1);
    date.setDate(1);
    const serial = dateToSerial(date)
    setDataFinal(Math.trunc(serial))
  }

  return (
    <>
      <Head>
        <title>Dashboard Jurídico/Financeiro</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-200 h-screen">
        <Header />
        <div className='h-9/10 pt-5 px-10 bg-gray-200 flex items-stretch'>
          <div className='bg-gray-200 h-full w-full rounded-3xl grid grid-rows-7 grid-cols-6 gap-2'>
            <div className='row-span-1 col-span-1 bg-gray-100 rounded-3xl grid grid-rows-2 grid-flow-col-1'>
              <div className='row-span-1 col-span-1 flex justify-center font-serif items-center'>
                <p>
                  Saldo geral
                </p>
              </div>
              <div className='row-span-1 col-span-1 flex justify-center items-bottom'>
                <CardBalance data={sheetData} />
              </div>
            </div>
            <div className='col-span-1 bg-gray-100 rounded-3xl grid grid-rows-2 grid-flow-col-1'>
              <div className='row-span-1 col-span-1 flex justify-center items-center'>
                <p>
                  Entradas
                </p>
              </div>
              <div className='row-span-1 col-span-1 flex justify-center items-bottom'>
                <CardIncomes data={sheetData} />
              </div>
            </div>
            <div className='col-span-1 bg-gray-100 rounded-3xl grid grid-rows-2 grid-flow-col-1'>
              <div className='row-span-1 col-span-1 flex justify-center items-center'>
                <p>
                  Saídas
                </p>
              </div>
              <div className='row-span-1 col-span-1 flex justify-center items-bottom'>
                <CardExpenses data={sheetData} />
              </div>
            </div>
            <div className='col-start-1 col-end-4 row-start-2 row-end-5 bg-gray-100 rounded-3xl'>
              <BarChart data={sheetData} />
            </div>
            <div className='col-start-1 col-end-4 row-start-5 row-end-8 bg-gray-100 rounded-3xl'>
              <LineChart data={sheetData} />
            </div>
            <div className='col-start-4 col-end-7 row-start-1 row-end-5 bg-gray-100 rounded-3xl grid grid-cols-3'>
              <div className='relative w-25%'>
                <DropDownMenu buttonLabel={area} items={areas} onChange={setArea} className="w-[25%] relative"/>
              </div>
              <RangeSlider items={meses} onSet={(values, handle) => {
                if (handle === 0) {
                  setMesInicial(values[handle])
                } else {
                  setMesFinal(values[handle])
                }
              }} />
              <DoughnutOrcamento data={sheetData} />
              <CardTransactions data={sheetData} />
            </div>
            <div className='col-start-4 col-end-7 row-start-5 row-end-8 bg-gray-100 rounded-3xl grid grid-cols-2'>
              <CardCashFlow data={sheetData} />
              <DoughnutInadimplencia data={sheetData} />
            </div>
          </div>
        </div>
      </main>
    </>
  )
}