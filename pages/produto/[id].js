import React from 'react'
import Navbar from "../../components/Navbar"
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'
import { supabase } from '../../supabase'
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cart.slice';


export async function getStaticProps(context) {
   const id = context.params.id
    try {
     
        let { data, error, status } = await supabase
        .from('produto')
        .select(`*`)
        .eq('id_produto', id)
        .single()
        
        if (error && status !== 406) {
        throw error
        }
        return { props : { id : id, produto : data } }
        
    } catch (error) {
        console.log(error.message)
    } 
   
  }

  export async function getStaticPaths() {
    // Instead of fetching your `/api` route you can call the same
    // function directly in `getStaticProps`

        let { data, error, status } = await supabase
        .from('produto')
        .select(`*`)
        
        if (error && status !== 406) {
        throw error
        }
        console.log("dados do produto")
        console.log(data)
 
        const paths = data.map(prod =>({
            params: {id: prod.id_produto.toString() },
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
            <section className='container mx-auto md:p-20'>
                <h1 className='text-2xl mt-4 text-center uppercase'>{props.produto.title}</h1>
                <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100'>
                    <div className="w-full p-10">
                        <img className='mx-auto  md:w-[350px] md:h-[200px] object-contain' src={`https://dmrufagccpgeyzmftmwj.supabase.co/storage/v1/object/public/arquivos/${props.produto.img_url}`} alt="" />
                    </div>
                    <div className="w-full p-10">
                    <h1 className='text-2xl mt-4 text-center uppercase'>{props.produto.price.toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</h1>
                        {props.produto.description}
                        <button
                        className='bg-red-600 text-white py-4 px-12 mt-4 block mx-auto hover:bg-red-800'
                        onClick={addItemsToCart}>Por no carrinho</button>
                    </div>            
                </div>
            </section>
        </div>
    )
}

export default Produto

