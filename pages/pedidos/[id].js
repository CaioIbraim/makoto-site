import React from 'react'
import Navbar from "../../components/Navbar"
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'
import { supabase } from '../../supabase'
import { useDispatch } from 'react-redux';
import CartListDetails from '../../components/CartListDetails'
import Link  from 'next/link'

export async function getStaticProps(context) {
   const id = context.params.id
    try {        
       let { data , error, status } = await supabase
        .from('venda_produtos')
        .select(`
            id_venda,
            qtd,
            valor,
            produto(id_produto,*)
        `).eq('id_venda',id)
        if (error && status !== 406) {
            throw error
        }
        return { props : {  produto : data } }        
    } catch (error) {
        return error.message
    } 
   
  }

  export async function getStaticPaths() {
    // Instead of fetching your `/api` route you can call the same
    // function directly in `getStaticProps`

        let { data, error, status } = await supabase
        .from('vendas')
        .select(`*`)
        
        if (error && status !== 406) {
        throw error
        }
       
        const paths = data.map(prod =>({
            params: {id: prod.id_venda.toString() },
        }))
        // Props returned will be passed to the page component
        return {  paths , fallback: false }
  }

const Produto = (props) => {
    const router = useRouter()
    const dispatch = useDispatch()
   
    const addItemsToCart = () => {
        dispatch(addToCart(props.produto))
        router.push({pathname: '/carrinho'})
        toast(`${props.produto.title} Adicionado ao carrinho`)
    }

    return (
        <div>
            <section className='w-10/12  mx-auto md:p-10'>
                <div className="pt-3 pb-5">
                    <div className="flex justify-between">
                        <span className="text-slate-400">#Pedidos</span>
                        <Link href={`/pedidos`} className="cursor-pointer">
                            <span className="text-slate-400 cursor-pointer">Voltar</span>
                        </Link>    
                    </div>
                    <h1 className='text-1xl md:text-4xl mt-2 text-left uppercase  text-slate-800'>Detalhes do pedido</h1>
                </div> 
            <CartListDetails data={props.produto} />
            </section>
        </div>
    )
}

export default Produto

