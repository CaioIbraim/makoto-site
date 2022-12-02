import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

const Success = () => {
  return (
    <div className='h-screen grid place-items-center'>

      <div className='text-center'>



        <Link href="/">
            <Image src="/logo.jpeg" className="cursor-pointer" width="150" height="150"/>
        </Link>


        <h1 className='text-8xl font-bold uppercase mt-5  '>Obrigado!</h1>
        <p className='text-center text-2xl mt-3'>Seu pedido foi registrado</p>

        <Link href="/">
          <p className='bg-red-600 text-white py-4 px-12 mt-4 hover:bg-red-800 cursor-pointer'>Voltar a loja</p>
        </Link>

      </div>

    </div>
  )
}

export default Success