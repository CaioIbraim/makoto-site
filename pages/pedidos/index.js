import Image from 'next/image';
import Navbar from "../../components/Navbar"
import styles from '../../styles/CartPage.module.css';
import { supabase } from '../../supabase'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { formataStatus, formatarData} from '../../utils/funcoes'
import Link  from 'next/link'


const Pedidos = () => {
  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [dadosUsuario, setDadosUsuario] = useState({})
  const [dadosVenda, setDadosVenda] = useState([])

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('usuario').select('*').eq('email', user.user_metadata.email)
      .single()
      setDadosUsuario(data)
    }
    // Only run query once user is logged in.
    if (user){
      loadData().then(() => getVendas())
    } 
      
  }, [user])


  useEffect(() => {
   getVendas()
  }, [dadosUsuario])


  if (!user)
    return (
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <div className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
          <Image src="/logo.jpeg" width="100" height="100" />

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



  const getVendas = async () => {
    const  vendas  = await supabaseClient.from('vendas').select('*').eq('id_login', dadosUsuario.id_usuario)
    
    setDadosVenda(vendas.data)
    console.log(vendas.data)
  }
    
  return (

    <>
     <section className='w-10/12  mx-auto md:p-10'>
      <div className="pt-3 pb-5">
          <span className="text-slate-400">#Pedidos</span>
          <h1 className='text-1xl md:text-4xl mt-2 text-left uppercase  text-slate-800'>Meus pedidos</h1>
      </div> 
       <div>
        {(dadosVenda == undefined || dadosVenda.length == 0) ? (
           <h2 className="text-left m-5 text-1xl">Não encontramos nenhum pedido para o seu usuário {dadosUsuario.nome}</h2>
        ) : (
          <>

          <h2 className="text-left m-5 text-1xl">Total de pedidos registrados : {dadosVenda.length}</h2>
         
            {dadosVenda.map((item) => (
             
                <div className='shadow-1xl cursor-pointer p-3 border-2 m-3 rounded-md'>
                  
                    <p>#ID : {item.id_venda} </p>
                    <p>Data da Compra: {formatarData(item.data_solicitacao)}</p>
                    <p>Forma de pagamento: {item.fm_pagamento}</p>
                    <p>Endereço de entrega: {item.endereco_entrega}</p>
                    <p>Data da entrega: {item.data_de_entrega}</p>
                    <p>Quantidade de itens: {item.qtd}</p>
                    <p>Status: {formataStatus(item.status)}</p>
                    <p>Valor total: {(item.valor_total).toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</p>
                    <p>
                      <Link href={`/pedidos/${item.id_venda}`} className="cursor-pointer">
                      <button
                        className='bg-blue-600 w-full rounded-md text-white p-2 md:py-4 md:px-12 md:mt-4 block mx-auto hover:bg-red-800'
                      >
                        Visualizar itens
                      </button>
                        
                      </Link>
                    </p>
                    
                    
                </div>
                 
            ))}
          </>
        )}
      </div>
      </section>

           
    </>
  );
};

export default Pedidos;