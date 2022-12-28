import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from "axios"
import { useState, useEffect } from 'react'
import CartList from '../components/CartList'
import Navbar from "../components/Navbar"

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSelector, useDispatch } from 'react-redux';
import { supabase } from '../supabase'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import Image from 'next/image'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'


import {
    cleanCart,
} from '../redux/cart.slice';


import {
    BraintreePayPalButtons,
} from "@paypal/react-paypal-js";



const Finalizar = () => {
    const router = useRouter()
    const user = useUser()
    const cart = useSelector((state) => state.cart);
    const supabaseClient = useSupabaseClient()

    const [checkOut, setCheckOut] = useState(false)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()
    const [frete, setFrete] = useState(0)
    const [cidade, setCidade] = useState()
    const [cep, setCep] = useState()
    const [estado, setEstado] = useState()
    const [bairro, setBairro] = useState()
    const [endereco, setEndereco] = useState()

    const dispatch = useDispatch();




    const totalPrice = () => {
        return cart.reduce(
            (accumulator, item) => accumulator + item.quantity * item.price,
            0
        )
    }

    //Se cartItem.length for igual a zero redireciona para a tela principal
    const createCheckoutSession = async () => {
        //Redirecionar para página de finalização de venda 
        //Capturar dados de entrega, calcular frete de entrega
        //Informar opções de pagamento

        axios.post('api/checkout_sessions', { cart })
            .then(res => {

                router.push({ pathname: res.data.sessionURL })
            })
            .catch(err => console.log(err))
    }

    const handleCadastrar = async () => {
        dispatch(cleanCart(cart))

        //Utilizar esta função após ser realizado o pagamento da encomenda
        // try {
        //   setLoading(true)
        //     const dados = {
        //         id_login: user.id,
        //         qtd:qtd,
        //         fm_pagamento:apelido,
        //         status:0,
        //         endereco_entrega:sexo
        //     }

        // const { data, error } = await supabase
        // .from('vendas')
        // .insert([dados], { upsert: true })

        // } catch (error) {
        //   alert(error.message)
        // } finally {
        //   setLoading(false)
        // }

    }

    useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient.from('usuario')
                .select(`*`)
                .eq('email', user.user_metadata.email)
                .single()
            setData(data)

        }
        // Only run query once user is logged in.
        if (user) loadData()
    }, [user])

    if (!user)
        return (
            <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
                <div className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
                    <Image src="/logo.jpeg" width="100" height="100" />
                    Realize seu login para finalizar suas compras
                    <Auth
                        redirectTo="http://localhost:3000/"
                        appearance={{ theme: ThemeSupa }}
                        supabaseClient={supabaseClient}
                        providers={['google']}
                        socialLayout="horizontal"
                    />
                </div>
            </div>

        )

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
                                        <input name="name" className="focus:outline-none px-3" placeholder="Digite seu nome completo" required="" value={user.user_metadata.name} />
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Email</span>
                                        <input name="email" type="email" className="focus:outline-none px-3 w-full" placeholder="Digite seu Email" required="" onChange={(e) => { setEmail(e.target.value) }} value={user.user_metadata.email} />
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Endereço</span>
                                        <input name="address" className="focus:outline-none px-3" placeholder="Digite seu endereço" onChange={(e) => { setEndereco(e.target.value) }} value={endereco} />
                                    </label>
                                    <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                        <span className="text-right px-2">Cidade</span>
                                        <input name="city" className="focus:outline-none px-3" placeholder="Digite sua Cidade" onChange={(e) => { setCidade(e.target.value) }} value={cidade} />
                                    </label>
                                    <label className="inline-flex w-2/4 border-gray-200 py-3">
                                        <span className="text-right px-2">Estado</span>
                                        <input name="state" className="focus:outline-none px-3" placeholder="Digite seu Estado" onChange={(e) => { setEstado(e.target.value) }} value={estado} />
                                    </label>
                                    <label className="xl:w-1/4 xl:inline-flex items-center flex xl:border-none border-t border-gray-200 py-3">
                                        <span className="text-right px-2 xl:px-0 xl:text-none">CEP</span>
                                        <input name="postal_code" className="focus:outline-none px-3" placeholder="Digite seu CEP" onChange={(e) => { setCep(e.target.value) }} value={cep} />
                                    </label>

                                </fieldset>
                            </section>
                        </form>
                    </div>



                    {/* <div className="rounded-md">
                        <section>
                            <h2 className="uppercase tracking-wide text-lg font-semibold text-gray-700 my-2">Informações de pagamento</h2>
                            <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                                <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                    <span className="text-right px-2">Cartão</span>
                                    <input name="card" className="focus:outline-none px-3 w-full" placeholder="Número do cartão MM/YY CVC" required=""/>
                                </label>
                            </fieldset>
                        </section>
                    </div> */}




                    <div className="text-center">
                        <PayPalScriptProvider options={{ "client-id": "AUa4ae6NFHkh3KOrsNClZj0czw5o0KMBLhol2qbvbkqw02mwicRTYcOZ7rc6tvx8ic3qNh4bntP1ayoL" }}>
                            <PayPalButtons
                                createOrder={(data, actions) => {
                                    return actions.order.create({
                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: (totalPrice() + frete),
                                                }
                                            },
                                        ],
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        const name = details.payer.name.given_name;
                                        alert(`Transaction completed by ${name}`);
                                    });
                                }}
                            />
                        </PayPalScriptProvider>

                    </div>

                </div>




                {/* Resumo do pedido */}
                <div className="col-span-1 bg-white lg:block hidden">
                    <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Resumo do pedido</h1>







                    {cart.length <= 0
                        ? <h1 className='text-center text-4xl mt-32'>Nenhum produto adicionado</h1>
                        : <CartList data={cart} />}




                    {cart.length > 0 && (

                        <div className="px-8 border-b">
                            <div className="flex justify-between py-4 text-gray-600">
                                <span>Subtotal</span>
                                <span className="font-semibold text-indigo-500">{totalPrice().toLocaleString('en-US', { style: 'currency', currency: 'BRL', })}</span>
                            </div>
                            <div className="flex justify-between py-4 text-gray-600">
                                <span>Frete</span>
                                <span className="font-semibold text-indigo-500">Grátis</span>
                            </div>
                        </div>)}



                    {cart.length > 0 && (

                        <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                            <span>Total</span>
                            <span>{totalPrice().toLocaleString('en-US', { style: 'currency', currency: 'BRL', })}</span>
                        </div>

                    )}


                </div>
            </div>


        </div>
    )
}

export default Finalizar