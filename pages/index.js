import Head from 'next/head'
import Header from '@/components/header'
import BarChart from '@/components/barchart-orcamento'
import LineChart from '@/components/linechart-meta'

import { useState, useEffect } from 'react'

export default function Home({data}) {
  const[sheetData, setSheetData] = useState()
  
  
  useEffect(() => {
		async function getData () {
			const response = await fetch("http://127.0.0.1:5328/Geral/1000/100000")
			const data = await response.json()
			
			setSheetData(data)
			console.log(sheetData)
		}
		
		getData()
  }, [])
  


  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="bg-gray-200 h-screen">
        <Header />
        <div className='h-full pt-5 px-10 bg-gray-200 flex items-stretch'>
          <div className='bg-white h-full w-full rounded-3xl grid grid-rows-7 grid-cols-6 gap-2'>
            <div className='row-span-1 col-span-1 bg-gray-100 rounded-3xl grid grid-rows-2 grid-flow-col-1'>
              <div className='row-span-1 col-span-1 flex justify-center font-serif'>
                <p>
                  Saldo geral
                </p>
              </div>
              <div className='row-span-1 col-span-1 flex justify-center'>
                
              </div>
            </div>
            <div className='col-span-1 bg-gray-100 rounded-3xl grid grid-rows-2 grid-flow-col-1'>
              <div className='row-span-1 col-span-1 flex justify-center'>
                <p>
                  Entradas
                </p>
              </div>
              <div className='row-span-1 col-span-1 flex justify-center'>
                <p className='text-xl font-bold'>
                  R$ 8000
                </p>
              </div>
            </div>
            <div className='col-span-1 bg-gray-100 rounded-3xl grid grid-rows-2 grid-flow-col-1'>
              <div className='row-span-1 col-span-1 flex justify-center'>
                <p>
                  Saídas
                </p>
              </div>
              <div className='row-span-1 col-span-1 flex justify-center'>
                <p className='text-xl font-bold'>
                  R$ 3000
                </p>
              </div>
            </div>
            <div className='col-start-1 col-end-4 row-start-2 row-end-5 bg-gray-100 rounded-3xl'>
              <BarChart data={sheetData}/>
            </div>
            <div className='col-start-1 col-end-4 row-start-5 row-end-8 bg-gray-100 rounded-3xl'>
              <LineChart data={sheetData}/>
            </div>
            <div className='col-start-4 col-end-7 row-start-1 row-end-5 bg-gray-100 rounded-3xl'>

            </div>
            <div className='col-start-4 col-end-7 row-start-5 row-end-8 bg-gray-100 rounded-3xl'>

            </div>
          </div>
        </div>
      </main>
    </>
  )
}