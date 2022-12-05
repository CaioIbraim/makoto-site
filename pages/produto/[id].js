import React from 'react'
import Navbar from "../../components/Navbar"
import produtos from "../../data.json"
import { useRecoilState } from 'recoil';
import { cartState } from "../../atoms/cartState"
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'


export async function getStaticProps(context) {
   const id = context.params.id
   const selectedProduto = produtos.filter(prod => prod.id.toString() === id)[0]
   console.log(selectedProduto)
   
   return { props : { id : id, produto : selectedProduto } }
  
  }

  export async function getStaticPaths() {
    // Instead of fetching your `/api` route you can call the same
    // function directly in `getStaticProps`
    const produto = produtos
    const paths = produto.map(prod =>({
        params: {id: prod.id.toString() },
    }))

    // Props returned will be passed to the page component
    return {  paths , fallback: false }
  }




const Produto = (props) => {
    const router = useRouter()
   

    const [cartItem, setCartItem] = useRecoilState(cartState)
   


    const addItemsToCart = () => {

        if (cartItem.findIndex(pro => parseInt(pro.id)  === parseInt(props.id) ) === -1) {
            setCartItem(prevState => [...prevState, props.produto])
        } else {
            setCartItem(prevState => {
                return prevState.map((item) => {
                    return parseInt(item.id) === parseInt(props.id) ? { ...item, quantity: item.quantity + 1 } : item
                })
            })
        }

        router.push({pathname: '/cart'})

        toast(`${props.produto.name} Adicionado ao carrinho`)
    }



    return (
        <div>
            <Navbar />

            <section className='container mx-auto md:p-20'>
                <h1 className='text-2xl mt-4 text-center uppercase'>{props.produto.name}</h1>
                <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100'>

                    <div className="w-1/2 p-10">
                            <img className='mx-auto w-[350px] h-[200px] object-contain' src={props.produto.image} alt="" />
                    </div>

                    <div className="w-full p-10">
                            {props.produto.detalhes}

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

