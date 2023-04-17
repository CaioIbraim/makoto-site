import Head from 'next/head'
import { supabase } from '../supabase'
import { useEffect, useState } from 'react'
import Image from 'next/image';

export default function Home() {

  const [loading, setLoading] = useState(true)
  const [produtos, setProdutos] = useState([])
  const [banners, setBanners] = useState([])
  
  const [statusPage, setStatusPage] = useState(false)
  const [produtosLoaded, setProdutosLoaded] = useState(true)
  const [bannersLoaded, setBannersLoaded] = useState(true)
  const [openModal, setOpenModal] = useState(false)

 
  return (
    <div>
      <Head>
        <title>Makoto Patches</title>
        <meta name="description" content="A makoto Sportswears é uma empresa
                    que está no mercado desde 2016
                    comprometida em garantir produtos de
                    qualidade, que conferem conforto e
                    exclusividade para as equipes e atletas
                    de todo o mundo.
                    Os patches, nosso produto destaque,
                    são feitos de poliprene, material exclusivo
                    da Makoto. Ele foi criado visando a
                    comodidade e nos movimentos realizados
                    pelos atletas.
                    Eles são maleáveis, resistentes,
                    não desfiam e nem desbotam." />
        <link rel="icon" href="/logo.jpeg" />
      </Head>
      <div className='w-screen h-screen relative'>
                <div className='absolute top-0 left-0 w-full h-screen md:bg-black/70  z-10' />
                <Image
                className='absolute z-1'
                layout='fill'
                objectFit='cover'
                src='/kits.jpg'
                alt='/'
                />
                <div className='absolute  flex flex-col items-center text-center justify-center top-[50%] md:top-[40%] max-w-[1240px] w-full left-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] text-white z-10 p-2'>
                
                <h1 className="text-6xl md:text-8xl font-extrabold  md:text-white mb-6">
                 Bem-Vindo!
                </h1>

                <h1 className="text-5xl font-extrabold  md:text-white mb-6">
                 você deseja
                </h1>

                <div className="w-full flex space-x-4 p-6 items-center justify-center">
                <div className="w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl  font-extrabold">
                 PERSONALIZAR SEU KIMONO
                 <p className="p-2 bg-red-600 cursor-pointer" onClick={() => {window.location ='/varejo'}}>
                  <h1> Varejo </h1>
                  (A partir de uma unidade)
                 </p>
                </div>
                <div className="w-2xl mb-6 font-light text-white lg:mb-8 md:text-lg lg:text-xl font-extrabold">
                  PADRONIZAR A EQUIPE
                  <p className="p-2 bg-red-600 cursor-pointer" onClick={() => {window.location ='/atacado'}}>
                    <h1>Atacado</h1>
                  (A partir de 20 unidades)
                  </p>
                </div>
                
                </div>

              
                </div>
        </div>
   

    </div>
  )
}
