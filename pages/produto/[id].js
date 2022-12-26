import React from 'react'
import Navbar from "../../components/Navbar"
import { useRecoilState } from 'recoil';
import { cartState } from "../../atoms/cartState"
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'
import { supabase } from '../../supabase'


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
   

    const [cartItem, setCartItem] = useRecoilState(cartState)
   


    const addItemsToCart = () => {

        if (cartItem.findIndex(pro => parseInt(pro.id_produto)  === parseInt(props.id) ) === -1) {
            setCartItem(prevState => [...prevState, props.produto])
        } else {
            setCartItem(prevState => {
                return prevState.map((item) => {
                    return parseInt(item.id_produto) === parseInt(props.id) ? { ...item, quantity: item.quantity + 1 } : item
                })
            })
        }

        router.push({pathname: '/cart'})

        toast(`${props.produto.title} Adicionado ao carrinho`)
    }



    return (
        <div>
            <Navbar />


          
            <section className='container mx-auto md:p-20'>
                <h1 className='text-2xl mt-4 text-center uppercase'>{props.produto.title}</h1>
                <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100'>

                    <div className="w-1/2 p-10">
                            <img className='mx-auto w-[350px] h-[200px] object-contain' src={props.produto.img_url} alt="" />
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

