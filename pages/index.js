import Head from 'next/head'
import Product from '../components/Product'
import Slider from '../components/Slider';
import { SliderData } from '../components/SliderData';
import { supabase } from '../supabase'
import { useEffect, useState } from 'react'
import { Oval } from  'react-loader-spinner'
import ReactModal from 'react-modal';

export default function Home() {

  const [loading, setLoading] = useState(true)
  const [produtos, setProdutos] = useState([])
  const [banners, setBanners] = useState([])
  
  const [statusPage, setStatusPage] = useState(false)
  const [produtosLoaded, setProdutosLoaded] = useState(true)
  const [bannersLoaded, setBannersLoaded] = useState(true)
  const [openModal, setOpenModal] = useState(false)


  useEffect(() => {
      getProdutos()
      getBanners()
  }, [loading])


  const vrfStatusPage = () => {
    if(produtosLoaded == true && bannersLoaded == true){
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


  const getBanners = async () => {
    try {
      setStatusPage(false)    
      let { data, error, status } = await supabase
        .from('banner')
        .select(`*`)       
      if (error && status !== 406) {
        throw error
      }
     

      setBanners(data) 
      setBannersLoaded(true)
          
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

   
{( (statusPage == true) && (banners.length > 0) )?
        <>
            <Slider slides={banners} />
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











            
<ReactModal
isOpen={
  openModal
/* Boolean describing if the modal should be shown or not. */}
style={
  { overlay: {}, content: {} }
/* Object indicating styles to be used for the modal.
   It has two keys, `overlay` and `content`.
   See the `Styles` section for more details. */}
contentLabel={
  "Example Modal"
/* String indicating how the content container should be announced
   to screenreaders */}
className={
  "ReactModal__Content"
/* String className to be applied to the modal content.
   See the `Styles` section for more details. */}

role={
  "dialog"
/* String indicating the role of the modal, allowing the 'dialog' role
   to be applied if desired.
   This attribute is `dialog` by default. */}

preventScroll={
  false
/* Boolean indicating if the modal should use the preventScroll flag when
   restoring focus to the element that had focus prior to its display. */}

parentSelector={
  () => document.body
/* Function that will be called to get the parent element
   that the modal will be attached to. */}


>
<h1 className="py-6 border-b-2 text-xl text-gray-600 px-8 bg-white">Pagamento</h1>

 
</ReactModal>

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
