import React from 'react'
import { useState } from "react";
import axios from "axios"
import { useRecoilState } from 'recoil'
import { cartState } from '../../atoms/cartState'
import Navbar from "../../components/Navbar"
import { useRouter } from 'next/router'
import data from "../../data.json"
import toast from 'react-hot-toast';

const Produto = () => {
    const router = useRouter()
    const id = router.query.id
    const [cartItem, setCartItem] = useRecoilState(cartState)
    const produto = data.filter(item => {return item.id == parseInt(id)})[0]
   


    const addItemsToCart = () => {

    if (cartItem.findIndex(pro => parseInt(pro.id)  === parseInt(id) ) === -1) {
        setCartItem(prevState => [...prevState, produto])
    } else {
        setCartItem(prevState => {
            return prevState.map((item) => {
                return parseInt(item.id) === parseInt(id) ? { ...item, quantity: item.quantity + 1 } : item
            })
        })
    }

    router.push({pathname: '/cart'})
    
    toast(`${produto.name} Adicionado ao carrinho`)
    }

    return (
        <div>
            <Navbar />

            <section className='container mx-auto md:p-20'>
                <h1 className='text-2xl mt-4 text-center uppercase'>{produto.name}</h1>
                <div className='mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gray-100'>

                    <div className="w-1/2 p-10">
                            <img className='mx-auto w-[350px] h-[200px] object-contain' src={produto.image} alt="" />
                    </div>

                    <div className="w-full p-10">
                            {produto.detalhes}

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