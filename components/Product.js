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
            <div className='bg-slate-50 p-1 md:p-2'>
                <Link href= {`/produto/${product.id_produto}`}>    
                    <img className='md:mx-auto md:w-[350px] md:h-[200px] object-contain' src={`https://dmrufagccpgeyzmftmwj.supabase.co/storage/v1/object/public/arquivos/${product.img_url}`} alt="" />
                </Link>
                <div className='md:mt-4 md:px-6'>
                    <div className='md:text-[16px]'>
                        <h1 className="md:text-1xl">{product.title}</h1>
                        <small className='text-1xl'>{product.price.toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</small>
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