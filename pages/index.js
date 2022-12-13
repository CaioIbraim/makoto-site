import Head from 'next/head'
import Navbar from '../components/Navbar'
import Carousel from '../components/Carousel'
import Product from '../components/Product'
import data from "../data.json"
import Slider from '../components/Slider';
import { SliderData } from '../components/SliderData';

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
      <Slider slides={SliderData} />
    
      {/* <Carousel/> */}


    <div className="flex">
      <section className='w-10/12  mx-auto md:p-10'>
        <div className="pt-3 pb-5">
          <span className="text-slate-400">#Pacotes e Promoções</span>
          <h1 className='text-1xl md:text-4xl mt-2 text-left uppercase  text-slate-800'>Nossos Produtos</h1>
        </div>
      
        <div className='mt-2 grid grid-cols-2 md:grid-cols-4 gap-4'>

          {data.map(product => <Product product={product} />)}
         
        </div>
      </section>
    </div>

     


     

    </div>
  )
}
