import React from 'react'
import { useRecoilState } from 'recoil';
import { cartState } from "../atoms/cartState"
import toast from 'react-hot-toast';
import Link from 'next/link'
import { useRouter } from 'next/router'


const Product = ({ product }) => {
    const router = useRouter()
   
    const [cartItem, setCartItem] = useRecoilState(cartState)

    const addItemsToCart = () => {

        if (cartItem.findIndex(pro => pro.id === product.id) === -1) {
            setCartItem(prevState => [...prevState, product])
        } else {
            setCartItem(prevState => {
                return prevState.map((item) => {
                    return item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                })
            })
        }
        toast(`${product.name} Adicionado ao carrinho`)
        router.push({pathname: '/cart'})
    }

    return (
        <div className='shadow-1xl cursor-pointer'>
            <div className='bg-gray-100 p-1 md:p-2'>
                <Link href= {`/produto/${product.id}`}>    
                    <img className='md:mx-auto md:w-[350px] md:h-[200px] object-contain' src={product.image} alt="" />
                </Link>
                <div className='md:mt-4 md:px-6'>
                    <div className='text-center md:text-[26px]'>
                        <h1 className="md:text-2xl">{product.name}</h1>
                        <small className='md:text-1xl'>{product.price.toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</small>
                    </div>

                    <button
                        className='bg-red-600 rounded-md text-white p-2 md:py-4 md:px-12 md:mt-4 block mx-auto hover:bg-red-800'
                        onClick={addItemsToCart}>Por no carrinho</button>

                </div>
            </div>
            
        </div>
      
    )
}

export default Product