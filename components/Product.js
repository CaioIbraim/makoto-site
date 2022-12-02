import React from 'react'
import { useRecoilState } from 'recoil';
import { cartState } from "../atoms/cartState"
import toast from 'react-hot-toast';
import Link from 'next/link'
import {FaArrowAltCircleRight} from 'react-icons/fa';
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

        <div className='bg-red-300 p-2  shadow-2xl cursor-pointer'>

            <div className='bg-gray-100 p-2'>
                <Link href= {`/produto/${product.id}`}>    
                    <img className='mx-auto w-[350px] h-[200px] object-contain' src={product.image} alt="" />
                </Link>
                <div className='mt-4 px-6'>
                    <div className='text-center text-[26px]'>
                        <h1 className="text-2xl">{product.name}</h1>
                        <small className='text-1xl'>{product.price.toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</small>
                    </div>

                    <button
                        className='bg-red-600 text-white py-4 px-12 mt-4 block mx-auto hover:bg-red-800'
                        onClick={addItemsToCart}>Por no carrinho</button>

                </div>
            </div>
            
        </div>
      
    )
}

export default Product