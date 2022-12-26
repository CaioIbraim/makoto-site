import React from 'react'
import axios from "axios"
import { useRecoilState } from 'recoil'
import { cartState } from '../atoms/cartState'
import CartList from '../components/CartList'
import Navbar from "../components/Navbar"
import { useRouter } from 'next/router'

const Cart = () => {
    const router = useRouter()
    const [cartItem, setCartItem] = useRecoilState(cartState)

    const totalPrice = () => {
        let total = 0
        cartItem.forEach(item => total += (item.price * item.quantity))
        return total.toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})
    }

    const createCheckoutSession = async () => {
        //Redirecionar para página de finalização de venda 
        //Capturar dados de entrega, calcular frete de entrega
        //Informar opções de pagamento
        router.push({pathname: '/finalizar'})
        
    }

    return (
        <div>
            <Navbar />
            <div className='container mx-auto'>
                <h1 className='text-center text-4xl mt-32'>Carrinho</h1>
                {cartItem.length <= 0
                    ? <h1 className='text-center text-4xl mt-32'>Nenhum produto adicionado</h1>
                    : cartItem.map(item => <CartList key={item.id_produto} data={item} />)}
                {cartItem.length > 0 && (
                <div className='max-w-[800px] mx-auto mt-4'>
                    <h2 className='text-right text-1xl font-bold p-2 mr-2'>Total: {totalPrice()}</h2>
                    <button
                        className='text-right bg-red-600 text-white py-4 px-12 mt-4 block mx-auto hover:bg-red-800' onClick={createCheckoutSession}>Finalizar compra</button>
                </div>)}
            </div>
        </div>
    )
}

export default Cart