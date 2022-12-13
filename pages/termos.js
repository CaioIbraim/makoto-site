import React from 'react'
import Navbar from '../components/Navbar'
import Head from 'next/head'

const Termos = () => {

    return (

        <>
      
      <Head>
        <title>Política de privacidade</title>
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

      <Navbar />

   
        <div className='h-screen grid place-items-center'>

        <div className='text-center  p-20 bg-gray-100 rounded-md'>

                <h1 className="text-5xl text-red-900">MAKOTO</h1>
                <p className="text-2xl p-10">
                    A makoto Sportswears é uma empresa
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
                    não desfiam e nem desbotam.
                </p>

                <h1 className="text-4xl text-bold pb-2">Informações Adicionais</h1>
                <p className="text-2xl p-10">
                    O prazo de produção após o pagamento é de
                    5 a 10 dias utéis.
                    O frete não está incluso nos valores, para saber
                    basta solicitar pelo nosso chat, realizamos o envio
                    através dos correios ou da DHL.
                    Trabalhamos com outros tamanhos, caso esteja
                    interessado basta pedir o orçamento no chat.
                </p>
        </div>
  
      </div>


        </>
    )
}

export default Termos