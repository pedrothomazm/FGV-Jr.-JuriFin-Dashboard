import React from 'react'
import Image from 'next/image'

const Header = () => {
  return (
	<div className='flex justify-between px-10 pt-4'>
    <div>
      <p className='text-xl font-bold text-[#222E66]'>Dashboard - Jurídico/Financero - FGV Jr.</p>
    </div>
    <div>
      <Image 
      src="/logotipo.png"
      alt="Logo FGV Jr."
      style={{
        width: '100%',
        height: 'auto',
      }}
      height={300}
      width={500}
      />  
    </div> 
  </div>
  )
}

export default Header