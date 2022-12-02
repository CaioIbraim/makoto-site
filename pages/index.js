import Head from 'next/head'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Product from '../components/Product'
import data from "../data.json"

export default function Home() {
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

      <Navbar />

      <div
          class="w-full h-96 bg-[url('/b3.jpg')] bg-cover bg-center flex justify-center items-center">
          <div class="flex flex-col justify-center items-center">
             
          </div>
      </div>
      {/* <Carousel/> */}


    <div className="flex">

     
      <section className='w-10/12 container mx-auto md:p-20'>
        <h1 className='text-4xl mt-4 text-center uppercase bg-slate-100 p-10'>Nossos Produtos</h1>
        <div className='mt-4 grid grid-cols-1 md:grid-cols-4 gap-4'>

          {data.map(product => <Product product={product} />)}
         
        </div>
      </section>
    </div>

     


     

    </div>
  )
}
