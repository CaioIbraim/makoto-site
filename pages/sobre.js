import React from 'react'
import Head from 'next/head'

const Sobre = () => {

    return (

        <>
      
      <Head>
        <title>Sobre Makoto</title>
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



      <div className="flex m-3">
              <section className='w-10/12  mx-auto md:p-10'>
                
                <div className="pt-3 pb-5">
                  <span className="text-slate-400">#Sobre a Makoto Patches</span>
                  <h1 className='text-1xl md:text-4xl mt-2 text-left uppercase  text-slate-800'>MAKOTO</h1>
                </div> 

              
                <div className='mt-2'>
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

                    O prazo de produção após o pagamento é de
                    5 a 10 dias utéis.
                    O frete não está incluso nos valores, para saber
                    basta solicitar pelo nosso chat, realizamos o envio
                    através dos correios ou da DHL.
                    Trabalhamos com outros tamanhos, caso esteja
                    interessado basta pedir o orçamento no chat.
                </div>
              </section>
            </div>
      
        {/* <div class="container h-screen">

      
     
                
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
   */}
       
        </>
    )
}

export default Sobre