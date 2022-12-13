import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from "axios"
import { useRecoilState } from 'recoil'
import {useState, useEffect} from 'react'
import { cartState } from '../atoms/cartState'
import CartList2 from '../components/CartList2'
import Navbar from "../components/Navbar"

const Finalizar = () => {
    const router = useRouter()
    const [cartItem, setCartItem] = useRecoilState(cartState)
    const [checkOut, setCheckOut] = useState(false)
   
    const [frete, setFrete] = useState(0)
    const totalPrice = () => {
        let total = 0
        cartItem.forEach(item => total += (item.price * item.quantity))
        return total
    }

    //Se cartItem.length for igual a zero redireciona para a tela principal

    useEffect(() => {
        if(cartItem.length == 0){
            router.push({pathname: '/cart'})
        }
    },[])

    useEffect(() => {
        if(checkOut == true){
            router.push({pathname:  res.data.sessionURL})
        }
    },[])


    const createCheckoutSession = async () => {
        //Redirecionar para página de finalização de venda 
        //Capturar dados de entrega, calcular frete de entrega
        //Informar opções de pagamento
        router.push({pathname: '/success'})
    
        axios.post('api/checkout_sessions', { cartItem })
            .then(res => {
                setCheckOut(true)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>


<Head>
        <title>Finalizar Carrinho</title>
        <meta name="description" content="A makoto Sportswears é uma empresa
                    que está no mercado desde 2016
                    comprometida em garantir produtos de
                    qualidade, que conferem conforto e
                    exclusividade para as equipes e atletas
                    de todo o mundo.
                    Os patches, nosso produto destaque,
                    são feitos de poliprene, material exclusivo
                    da Makoto. Ele foi criado visando a
                    comodidade e nos movimentos realizados
                    pelos atletas.
                    Eles são maleáveis, resistentes,
                    não desfiam e nem desbotam." />
        <link rel="icon" href="/logo.jpeg" />
      </Head>
     

    <Navbar />
           
   
    <div className="h-screen grid grid-cols-3">
        <div className="lg:col-span-2 col-span-3 bg-indigo-50 space-y-8 px-12">
            <div className="mt-8 p-4 relative flex flex-col sm:flex-row sm:items-center bg-white shadow rounded-md">
                <div className="flex flex-row items-center border-b sm:border-b-0 w-full sm:w-auto pb-4 sm:pb-0">
                    <div className="text-yellow-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 sm:w-5 h-6 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="text-sm font-medium ml-3">Finalizar Compra</div>
                </div>
                <div className="text-sm tracking-wide text-gray-500 mt-4 sm:mt-0 sm:ml-4">Preencha seus detalhes de envio e pagamento abaixo.</div>
                <div className="absolute sm:relative sm:top-auto sm:right-auto ml-auto right-4 top-4 text-gray-400 hover:text-gray-800 cursor-pointer">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </div>
            </div>
            <div className="rounded-md">
                <form id="payment-form" method="POST" action="">
                    <section>
                        <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Informações de envio e cobrança</h2>
                        <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Nome</span>
                                <input name="name" className="focus:outline-none px-3" placeholder="Digite seu nome completo" required=""/>
                            </label>
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Email</span>
                                <input name="email" type="email" className="focus:outline-none px-3" placeholder="Digite seu Email" required=""/>
                            </label>
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Endereço</span>
                                <input name="address" className="focus:outline-none px-3" placeholder="Digite seu endereço"/>
                            </label>
                            <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                <span className="text-right px-2">Cidade</span>
                                <input name="city" className="focus:outline-none px-3" placeholder="Digite sua Cidade"/>
                            </label>
                            <label className="inline-flex w-2/4 border-gray-200 py-3">
                                <span className="text-right px-2">Estado</span>
                                <input name="state" className="focus:outline-none px-3" placeholder="Digite seu Estado"/>
                            </label>
                            <label className="xl:w-1/4 xl:inline-flex items-center flex xl:border-none border-t border-gray-200 py-3">
                                <span className="text-right px-2 xl:px-0 xl:text-none">CEP</span>
                                <input name="postal_code" className="focus:outline-none px-3" placeholder="Digite seu CEP"/>
                            </label>
                        
                        </fieldset>
                    </section>
                </form>
            </div>
            <div className="rounded-md">
                <section>
                    <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Informações de pagamento</h2>
                    <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                            <span className="text-right px-2">Cartão</span>
                            <input name="card" className="focus:outline-none px-3 w-full" placeholder="Número do cartão MM/YY CVC" required=""/>
                        </label>
                    </fieldset>
                </section>
            </div>
            <button  onClick={createCheckoutSession} className="submit-button px-4 py-3  bg-red-600 text-white focus:ring focus:outline-none w-full text-xl font-semibold transition-colors">
            { (totalPrice() + frete).toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}
            </button>
        </div>




        {/* Resumo do pedido */}
        <div className="col-span-1 bg-white lg:block hidden">
            <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Resumo do pedido</h1>

           
            




            {cartItem.length <= 0
                    ? <h1 className='text-center text-4xl mt-32'>Nenhum produto adicionado</h1>
                    :<CartList2 data={cartItem} /> }
               

              

            {cartItem.length > 0 && (
                
            <div className="px-8 border-b">
            <div className="flex justify-between py-4 text-gray-600">
                <span>Subtotal</span>
                <span className="font-semibold text-indigo-500">{totalPrice().toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</span>
            </div>
            <div className="flex justify-between py-4 text-gray-600">
                <span>Frete</span>
                <span className="font-semibold text-indigo-500">Grátis</span>
            </div>
            </div>)}



            {cartItem.length > 0 && (

            <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                <span>Total</span>
                <span>{totalPrice().toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</span>
            </div>

            )}


        </div>
    </div>


        </div>
    )
}

export default Finalizar