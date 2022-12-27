import React from 'react'
import Navbar from "../../components/Navbar"
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'
import { supabase } from '../../supabase'
import { useDispatch } from 'react-redux';
import CartListDetails from '../../components/CartListDetails'


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

        console.log(data)
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
            <Navbar />

            <h1 className="text-center m-5 text-3xl">Detalhes do pedido </h1>
            <CartListDetails data={props.produto} />

        </div>
    )
}

export default Produto

