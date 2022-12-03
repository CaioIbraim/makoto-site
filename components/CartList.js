import React from 'react'
import {useEffect} from 'react'
import { useRecoilState   } from 'recoil';
import { cartState } from "../atoms/cartState"
import toast from 'react-hot-toast';
import { useRouter } from 'next/router'


const CartList = ({ data }) => {
  const { id, name, image, quantity, price } = data
  const [cartItem, setCartItem] = useRecoilState(cartState)
  const index = cartItem.findIndex((cartItem) => cartItem === data);
   const router = useRouter()

   
  const addItemsToCart = () => {
    setCartItem(prevState => {
        return prevState.map((item) => {
            return item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        })
    })
  }



  const removeItem = () => () => {
    const itemIndex = cartItem.findIndex((e) => e === data);
    setCartItem([]);
  };

  const rmItemsToCart = () => {
    setCartItem(prevState => {
        return prevState.map((item) => {
            if(((item.quantity -1)  == 0) &&  (item.id === id)){ 
              //removar produto do carrinho
                
              toast(`${item.name} removido do carrinho`)
              
              return 0
            }
            return item.id === id ? { ...item, quantity:   ((item.quantity - 1) > 0 ? item.quantity - 1 : 0 )  } : item
        })
    })
  }


  return (
      <>
      {quantity > 0 ? 
    <div className="container p-2">

      

      <div className='bg-[#fff] max-w-[800px] mx-auto mt-4 py-2 px-6 flex gap-6 items-center justify-between'>
        <img className='h-[80px]' src={image} alt="" />

        <div>
          <div className='font-bold text-1xl'>{name}</div>
          <div className='flex p-2'>{quantity} x {price.toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</div>
          <div className='flex space-x-5'>
          <div className='text-indigo-600 p-3 bg-indigo-300 rounded-full cursor-pointer' onClick={rmItemsToCart}> -  1</div>
          
          <div className='text-indigo-600 p-3 bg-indigo-300 rounded-full cursor-pointer' onClick={addItemsToCart}> +  1</div>
        
        
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


function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}