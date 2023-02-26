import React from 'react'
import {useEffect} from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';
import { FiPlusSquare, FiTrash, FiMinusSquare } from "react-icons/fi"

//Importing actions from  cart.slice.js
import {
    incrementQuantity,
    decrementQuantity,
    removeFromCart,
  } from '../redux/cart.slice';
  

const CartList = ({ data }) => {
  const { id_produto, title, img_url, quantity, price } = data
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();


  return (
      <>
    {quantity > 0 ? 
    <div className="container p-2">

      

      <div className='bg-[#fff] max-w-[800px] mx-auto mt-4 py-2 px-6 flex gap-6 items-center justify-between'>
        <img className='h-[80px]' src={`https://dmrufagccpgeyzmftmwj.supabase.co/storage/v1/object/public/arquivos/${img_url}`} alt="" />

        <div>
            <div className='md:font-bold md:text-1xl'>{title}</div>
            <div className='flex p-2  w-full items-center justify-center'>
            
                {quantity} x {price.toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}
            
            </div>
        
          
        </div>

        <div className='text-1xl font-bold flex-wrap justify-center'>


          {(price * quantity).toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}


        <div className='flex space-x-5 w-full items-center justify-center mt-2'>
           <button onClick={() => dispatch(decrementQuantity(id_produto))}>
            <FiMinusSquare/>
            </button>
            <button onClick={() => dispatch(incrementQuantity(id_produto))}>
            <FiPlusSquare/>
            </button>
            <button className="text-red-600" onClick={() => dispatch(removeFromCart(id_produto))}>
            <FiTrash/>
            </button>  
        </div>

        
        </div>

      </div>


   
    </div>
    : null
    }
    </>
  )
}

export default CartList
