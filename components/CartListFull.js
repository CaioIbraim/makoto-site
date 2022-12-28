import React from 'react'
import {useEffect} from 'react'
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';

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
        <img className='h-[80px]' src={img_url} alt="" />

        <div>
            <div className='font-bold text-1xl'>{title}</div>
            <div className='flex p-2'>
            
                {quantity} x {price.toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}
            
            </div>
        
            <div className='flex space-x-5'>

            <button onClick={() => dispatch(incrementQuantity(id_produto))}>
            +
            </button>
            <button onClick={() => dispatch(decrementQuantity(id_produto))}>
            -
            </button>
            <button onClick={() => dispatch(removeFromCart(id_produto))}>
            x
            </button>

          </div>
          
        </div>

        <div className='text-1xl font-bold'>{(price * quantity).toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</div>
      </div>


   
    </div>
    : null
    }
    </>
  )
}

export default CartList
