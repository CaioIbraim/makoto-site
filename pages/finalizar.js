import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import axios from "axios"
import { useState, useEffect, useReducer } from 'react'
import CartList from '../components/CartList'

import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useSelector, useDispatch } from 'react-redux';
import { supabase } from '../supabase'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import ReactModal from 'react-modal';

import Image from 'next/image'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'

const api_mercadopago = axios.create({
  baseURL: "https://api.mercadopago.com"
});


api_mercadopago.interceptors.request.use(async config => {
  // https://www.mercadopago.com.br/developers/panel
  // vai precisar gerar um token, acesse esse link. 
  // E gratuito.
  // Aqui no video não vou mostrar meu token, por questões
  // de segurança. Mas e algo como:
  //  TEST-asasj14jh2ldfljdfsfld
  // const token = process.env.REACT_APP_TOKEN_MERCADO_PAGO_PUBLIC
  const token = 'APP_USR-1798899051097147-112416-633d8c457976c2914456fbf85c76735e-527100435'
  config.headers.Authorization = `Bearer ${token}`

  return config
});

const formReducer = (state, event) => {
  return {
    ...state,
    [event.name]: event.value
  }
}

import {
    cleanCart,
} from '../redux/cart.slice';



const Finalizar = () => {
    const router = useRouter()
    const user = useUser()
    const cart = useSelector((state) => state.cart);
    const supabaseClient = useSupabaseClient()

    const [checkOut, setCheckOut] = useState(false)
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState()
    const [frete, setFrete] = useState(0)
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [cidade, setCidade] = useState("")
    const [cep, setCep] = useState("")
    const [estado, setEstado] = useState("")
    const [bairro, setBairro] = useState("")
    const [endereco, setEndereco] = useState("")
    const [cpf, setCpf] = useState('')
    const [numero, setNumero] = useState("")
    const [id, setId] = useState(null)
    const [tipoPagamento, setTipoPagamento] = useState(0)
    const [responsePayment, setResponsePayment] = useState(false)
    const [linkBuyMercadoPago, setLinkBuyMercadoPago] = useState(false)
    const [statusPayment, setStatusPayment] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    

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

        axios.post('api_mercadopago/checkout_sessions', { cart })
            .then(res => {

                router.push({ pathname: res.data.sessionURL })
            })
            .catch(err => console.log(err))
    }

    const  cadastrarUsuario = async () => {
        try {
          setLoading(true)
            const dados = {
                            fk_tipo_usuario : 2,
                            oauth_id: user.id,
                            nome:nome,
                            email:email,
                            endereco:endereco,
                            cep:cep,
                            numero:numero,
                            estado:estado,
                            bairro:bairro,
                            cidade:cidade    
            }
        
        const usuario = { data, error } = await supabase
        .from('usuario')
        .insert([dados], { upsert: true })
        
        console.log(usuario)

        } catch (error) {
          alert(error.message)
        } finally {
          setLoading(false)
        }
    
    }
    
    const getProfile = async () => {
        try {
          setLoading(true)        
          let { data, error, status } = await supabase
            .from('usuario')
            .select(`*`)
            .eq('email', email)
            .single()
    
          if (error && status !== 406) {
            throw error
          }
    
          if (data) {
              setId(data.id_usuario)
              setNome(data.nome)
              setEmail(data.email)
          }
        } catch (error) {
          alert(error.message)
        } finally {
          setLoading(false)
        }
    }
    
    const handleCadastrar = async () => {
        //Cadastar venda via PAYPAL passando o ID do usuário informado    
        try {
        
        dispatch(cleanCart(cart))
        setLoading(true)
        
        //Verificar se o email cadastrado existe
        const usuario = { data } = await supabase
        .from('usuario')
        .select()
        .eq('email',email)
        if(usuario.length > 0){
            //Se existe buscar o ID do email cadastrado
            setId(usuario[0].id_usuario)
        }else{
            //Se não existe cadastrar o usuário e buscar o ID gerado
            await cadastrarUsuario()
            getProfile()
        }
        
        

        if(id != null){
            const dados = {
                id_login: id,
                qtd:cart.length,
                fm_pagamento:'paypal',
                status:0,
                endereco_entrega:`${endereco} n° ${numero}, ${cidade}, ${estado} - ${cep}`,
                valor_total:totalPrice()
            }

   
        const venda = { data } = await supabase
                        .from('vendas')
                        .insert([dados])

                        

        const id_venda = await supabase
                            .from('vendas')
                            .select('id_venda')
                            .eq('id_login', id)
                            .order('id_venda', { ascending: false })
                            .limit(1)

        let carrinho = cart
        let id_retornado = id_venda.data[0].id_venda

        const   dados_venda_produtos = carrinho.map(item => {   
             return {
                id_venda : id_retornado,
                id_produto : item.id_produto,
                qtd : item.quantity,
                valor : item.price
             } 
        })
      
        const venda_produtos = { data } = await supabase
                        .from('venda_produtos')
                        .insert(dados_venda_produtos)


        }
        
        } catch (error) {
          alert(error.message)
        } finally {
           setTimeout(() =>{ router.push({ pathname: '/success' }) },1000)
          setLoading(false)
        }

    }

    const handleBuscarCep = async () => {
        //
        if(cep.length == 8){

            axios.get(`https://viacep.com.br/ws/${cep}/json`)
            .then(res => {    
                console.log(res.data)
                setEndereco(res.data.logradouro)
                setBairro(res.data.bairro)
                setCidade(res.data.localidade)
                setEstado(res.data.uf)
            })
            .catch(err => console.log(err))
        }
    }

    const handleCalcularFrete = async () => {
        setFrete(1)
        axios.get('api_mercadopago/calcular_frete')
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
      
    }

    const handleTipoPagamento = (tipo) => {
        alert(tipo)
    }

    const selecionarTipoPagamento = () => {
        return (
            <div className="flex flex-inline space-x-4">
                            <div onClick={handleTipoPagamento(1)} className="p-10 w-12 h-12 items-center justify-center flex bg-yellow-200 text-gray-900 rounded-md cursor-pointer shadow-md hover:shadow-lg">PayPal</div>
                            <div onClick={handleTipoPagamento(2)} className="p-10 w-12 h-12 items-center justify-center flex bg-green-200 text-gray-900 rounded-md cursor-pointer shadow-md hover:shadow-lg">Pix</div>
                        </div>

        )
    }

    const pagamentoViaPayPal = () => {
                                
        return (
        <div className="rounded-md">
                <section>
                    <PayPalScriptProvider options={{ "client-id": "AUa4ae6NFHkh3KOrsNClZj0czw5o0KMBLhol2qbvbkqw02mwicRTYcOZ7rc6tvx8ic3qNh4bntP1ayoL" }}>
                    <PayPalButtons
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            value: (totalPrice() + frete),
                                            currency: 'BRL'
                                        },
                                        currency: 'BRL'
                                    },
                                ],
                            });
                        }}
                        onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                const name = details.payer.name.given_name;
                                alert(`Transaction completed by ${name}`);
                                handleCadastrar()
                            });
                        }}
                    />
                </PayPalScriptProvider>
                </section>
        </div>   
            
        )
    }
        
    const handleChange = event => {
        setFormdata({
        name: event.target.name,
        value: event.target.value,
        })
    }

    const getStatusPayment = () => {

        if( responsePayment.data === undefined ){ 
        return false
        }

        api_mercadopago
        .get(`v1/payments/${responsePayment.data.id}`)
        .then(response => {
        console.log("Vrf")
            if (response.data.status === "approved") {
             handleCadastrar()
            }
        })
    }

    const handleSubmit = () => {

       if((estado != "") && (cep.length > 7) && (cidade != "") && (endereco != "") && (email != "") && (cpf != "") && (nome != "") && (numero != "") && (frete != 0) ){   
            const body = {
            "transaction_amount": (totalPrice() + frete),
            "description": `Compra realizada pelo site makotopatches.com.br`,
            "payment_method_id": "pix",
            "payer": {
                "email": email,
                "first_name": nome,
                "identification": {
                "type": "CPF",
                "number": cpf
                }
            },
            "notification_url": "https://eorpjcvcjvhqnq6.m.pipedream.net"
            }
                api_mercadopago.post("v1/payments", body).then(response => {
                setResponsePayment(response)
                setLinkBuyMercadoPago(response.data.point_of_interaction.transaction_data.ticket_url)
                setOpenModal(true)
            }).catch(err => {
                alert(err)
            })
            setInterval( () => {
                getStatusPayment()
            }, 1000)
        }

    }

  
    useEffect(() => {
        async function loadData() {
            const { data } = await supabaseClient.from('usuario')
                .select(`*`)
                .eq('email', user.user_metadata.email)
                .single()

                if(data == null){
                    const dados = {
                        fk_tipo_usuario : 2,
                        nome:user.user_metadata.name,
                        email:user.user_metadata.email,
                       }
                  
                      const usuario =  await supabase
                      .from('usuario')
                      .insert([dados], { upsert: true })
                      
                }else{
                    setId(data.id_usuario)
                    setEmail(data.email)
                    setNome(data.nome)
                }
            
        }
        // Only run query once user is logged in.
        if (user) {
            loadData()
        }else{
            setData(user)
        }
    }, [user])

    useEffect(() => {
        if(cart.length == 0){
            router.push({ pathname: "/" })
           
        }
    })

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

            <section className='w-full mx-auto md:p-10'>
                
                <div className="pt-3 pb-5">
                  <span className="text-slate-400">#Finalizar pagamento</span>
                  <h1 className='text-1xl md:text-4xl mt-2 text-left uppercase  text-slate-800'>Informações de entrega e pagamento</h1>
                </div> 

                <div className="h-screen grid grid-cols-3">

                    {/* Dados de entrega do pedido */}
                    <div className="lg:col-span-1 col-span-3">
                    
                        <div className="rounded-md mr-8">
                        <h1 className="py-6 border-b-2 text-xl text-gray-600 px-8">Dados de entrega</h1>
                                <section>
                                    <fieldset className="mb-3 bg-white shadow-lg rounded text-gray-600">
                                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                            <span className="text-right px-2">Nome</span>
                                            <input name="name" className="focus:outline-none px-3 w-full" placeholder="Digite seu nome completo" required="" onChange={(e) => { setNome(e.target.value) }} value={nome} />
                                        </label>
                                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                            <span className="text-right px-2">Email</span>
                                            <input name="email" type="email" className="focus:outline-none px-3 w-full" placeholder="Digite seu Email" required="" onChange={(e) => { setEmail(e.target.value) }} value={email} />
                                        </label>

                                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                            <span className="text-right px-2">CPF</span>
                                            <input name="cpf" type="cpf" className="focus:outline-none px-3 w-full" placeholder="Digite seu CPF" required="" onChange={(e) => { setCpf(e.target.value) }} value={cpf} />
                                        </label>

                                        <label className="inline-flex w-2/4 border-gray-200 py-3">
                                             <span className="text-right px-2">CEP</span>
                                            <input  name="postal_code" className="focus:outline-none px-3" placeholder="Digite seu CEP" onChange={(e) => { setCep(e.target.value) }} onKeyDown={handleBuscarCep}  value={cep} />
                                        </label>

                                        { (cep.length > 7) ? 
                                            <label className="xl:w-1/4 xl:inline-flex items-center flex xl:border-none border-t border-gray-200 py-3">
                                                <button onClick={handleCalcularFrete} className="text-center rounded-md px-2 xl:px-0 xl:text-none  w-full bg-indigo-200 p-2">Calcular Frete</button>                                            
                                            </label>
                                        : null }

                                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                            <span className="text-right px-2">Endereço</span>
                                            <input name="address" className="focus:outline-none px-3 w-full" placeholder="Digite seu endereço" onChange={(e) => { setEndereco(e.target.value) }} value={endereco} />
                                        </label>

                                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                            <span className="text-right px-2">Número</span>
                                            <input name="address" className="focus:outline-none px-3" placeholder="Digite seu numero" onChange={(e) => { setNumero(e.target.value) }} value={numero} />
                                        </label>
                                        <label className="flex border-b border-gray-200 h-12 py-3 items-center">
                                            <span className="text-right px-2">Cidade</span>
                                            <input name="city" className="focus:outline-none px-3" placeholder="Digite sua Cidade" onChange={(e) => { setCidade(e.target.value) }} value={cidade} />
                                        </label>
                                        <label className="inline-flex w-2/4 border-gray-200 py-3">
                                            <span className="text-right px-2">Estado</span>
                                            <input name="state" className="focus:outline-none px-3" placeholder="Digite seu Estado" onChange={(e) => { setEstado(e.target.value) }} value={estado} />
                                        </label>


                                        <label className="mt-3 mb-3">
                                            <button onClick={handleSubmit} className="text-center text-white rounded-md px-2 xl:px-0 xl:text-none  w-full bg-green-600 p-2">Pagar</button>                                            
                                        </label>

                                    </fieldset>
                                </section>
                        </div>

                    </div>  
                    
                    {/* Resumo do pedido */}
                    <div className="col-span-1 bg-white lg:block hidden shadow-lg">
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
                                    <span className="font-semibold text-indigo-500">
                                        {frete == 0 ? `Grátis` : frete.toLocaleString('en-US', { style: 'currency', currency: 'BRL', })}
                                        
                                    </span>
                                </div>
                            </div>)}
                        {cart.length > 0 && (
                            <div className="font-semibold text-xl px-8 flex justify-between py-8 text-gray-600">
                                <span>Total</span>
                                <span>{(totalPrice() + frete).toLocaleString('en-US', { style: 'currency', currency: 'BRL', })}</span>
                            </div>
                        )}
                    </div>

                    
                </div>

            </section>






                        
                        
            <ReactModal
                isOpen={
                openModal
                /* Boolean describing if the modal should be shown or not. */}
                style={
                { overlay: {}, content: {} }
                /* Object indicating styles to be used for the modal.
                It has two keys, `overlay` and `content`.
                See the `Styles` section for more details. */}
                contentLabel={
                "Example Modal"
                /* String indicating how the content container should be announced
                to screenreaders */}
                className={
                "ReactModal__Content"
                /* String className to be applied to the modal content.
                See the `Styles` section for more details. */}

                role={
                "dialog"
                /* String indicating the role of the modal, allowing the 'dialog' role
                to be applied if desired.
                This attribute is `dialog` by default. */}

                preventScroll={
                false
                /* Boolean indicating if the modal should use the preventScroll flag when
                restoring focus to the element that had focus prior to its display. */}

                parentSelector={
                () => document.body
                /* Function that will be called to get the parent element
                that the modal will be attached to. */}
            >
                {responsePayment &&
                    <button onClick={getStatusPayment}>Verificar status pagamento</button>
                }

                {
                linkBuyMercadoPago && !statusPayment &&
                    <iframe src={linkBuyMercadoPago} className="w-full h-screen flex items-center justify-center" title="link_buy" />
                }

                {
                statusPayment &&
                    <h1 className="py-6 border-b-2 text-xl text-green-600 px-8">Compra Aprovada</h1>
                }
            </ReactModal>

        </div>
    )
}

export default Finalizar