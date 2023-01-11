import Head from 'next/head'
import Navbar from '../components/Navbar'
import Product from '../components/Product'
import Slider from '../components/Slider';
import { SliderData } from '../components/SliderData';
import { supabase } from '../supabase'
import { useEffect, useState } from 'react'
import { Oval } from  'react-loader-spinner'

export default function Home() {

  const [loading, setLoading] = useState(true)
  const [produtos, setProdutos] = useState([])
  const [statusPage, setStatusPage] = useState(false)
  const [produtosLoaded, setProdutosLoaded] = useState(false)
  
  useEffect(() => {
      getProdutos()
  }, [loading])


  const vrfStatusPage = () => {
    if(produtosLoaded == true){
      setStatusPage(true)
    }
  }

  const handleFiltrarProduto = (value) => {
    
    if(value == ""){
      getProdutos()
      return false
    }else if(value.length > 3){      
          const regexp = new RegExp(value, 'i');      
          let find = produtos.filter(x => x.title.toLowerCase().includes(value.toLowerCase()))
          if (find.length == 0) {
              getProdutos()
              return false
          }
          setProdutos(find)
    }
  }

  const getProdutos = async () => {
    try {
      setStatusPage(false)    
      let { data, error, status } = await supabase
        .from('produto')
        .select(`*`)       
      if (error && status !== 406) {
        throw error
      }
      setProdutos(data) 
      setProdutosLoaded(true)
          
    } catch (error) {
      alert(error.message)
    } finally {
      vrfStatusPage() 
    }
  }
  
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

{statusPage == true ?
        <>
            <Slider slides={SliderData} />
            <div className="flex">
              <section className='w-10/12  mx-auto md:p-10'>
                
                <div className="pt-3 pb-5">
                  <span className="text-slate-400">#Pacotes e Promoções</span>
                  <h1 className='text-1xl md:text-4xl mt-2 text-left uppercase  text-slate-800'>Nossos Produtos</h1>
                </div> 

                <div className="pt-3 pb-5">
                  <span className="text-slate-400">#Pesquisar</span>
                  <input type="text" placeholder="Pesquise seu produto aqui" onChange={(e) => {handleFiltrarProduto(e.target.value)} } className="w-full mt-2 uppercase text-slate-600 border-slate-400 border-2 p-1 rounded-md " />
                </div> 

                <div className='mt-2 grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {produtos.map(product => <Product product={product} />)}
                </div>
              </section>
            </div>
        </>

: 
<>

  <div className="flex justify-center h-screen items-center">
    <Oval
      height={80}
      width={80}
      color="red"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel='oval-loading'
      secondaryColor="#f00"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  </div>

</>


}


    </div>
  )
}
