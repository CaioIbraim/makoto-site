import React from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cart.slice';
import { useRouter } from 'next/router'
const Product = ({ product }) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const handleAdd = () => {
        dispatch(addToCart(product))
        router.push({pathname: '/carrinho'}) 
    }


    return (
        <div className='shadow-1xl cursor-pointer'>
            <div className='bg-gray-100 p-1 md:p-2'>
                <Link href= {`/produto/${product.id_produto}`}>    
                    <img className='md:mx-auto md:w-[350px] md:h-[200px] object-contain' src={product.img_url} alt="" />
                </Link>
                <div className='md:mt-4 md:px-6'>
                    <div className='text-center md:text-[26px]'>
                        <h1 className="md:text-2xl">{product.title}</h1>
                        <small className='md:text-1xl'>{product.price.toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</small>
                    </div>

                    <button
                        className='bg-red-600 rounded-md text-white p-2 md:py-4 md:px-12 md:mt-4 block mx-auto hover:bg-red-800'
                        onClick={() => handleAdd()} >Por no carrinho</button>
                  </div>
            </div>
            
        </div>
      
    )
}

export default Product