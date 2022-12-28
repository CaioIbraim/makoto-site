import React from 'react'
import CartList from '../components/CartListFull'
import Navbar from "../components/Navbar"
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux';

const Cart = () => {
    const router = useRouter()
    const cart = useSelector((state) => state.cart);
    
    const finalizar = () => {
      router.push({pathname: '/finalizar'}) 
    }
    
    const getTotalPrice = () => {
        return cart.reduce(
          (accumulator, item) => accumulator + item.quantity * item.price,
          0
        )
    }
    
    return (
        <div>
            <Navbar />
            <div className='container mx-auto'>
                <h1 className='text-center text-4xl mt-32'>Carrinho</h1>
                {cart.length <= 0
                    ? <h1 className='text-center text-4xl mt-32'>Nenhum produto adicionado</h1>
                    : cart.map(item => <CartList key={item.id_produto} data={item} />)}
                {cart.length > 0 && (
                <div className='max-w-[800px] mx-auto mt-4'>
                    <h2 className='text-right text-1xl font-bold p-2 mr-2'>Total: {getTotalPrice().toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</h2>
                    <button
                        className='text-right bg-red-600 text-white py-4 px-12 mt-4 block mx-auto hover:bg-red-800' onClick={finalizar}>Finalizar compra</button>
                </div>)}
            </div>
        </div>
    )
}

export default Cart