import Image from 'next/image';
import Navbar from "../../components/Navbar"
import styles from '../../styles/CartPage.module.css';
import { supabase } from '../../supabase'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import { formataStatus } from '../../utils/funcoes'
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
      <Navbar />
      <h1 className="text-center m-5 text-3xl">Meus pedidos </h1>
      <div className={styles.container}>
        {(dadosVenda == undefined || dadosVenda.length == 0) ? (
          
          <h1>       
          Não encontramos nenhum pedido para o seu usuário {dadosUsuario.nome}</h1>
        ) : (
          <>

          <h2 className="text-left m-5 text-3xl">Total de pedidos registrados : {dadosVenda.length}</h2>
         
            <div className={styles.header}>
              <div>#ID</div>
              <div>Data da Compra</div>
              <div>Forma de pagamento</div>
              <div>Endereço de entrega</div>
              <div>Data da entrega</div>
              <div>Quantidade de itens</div>
              <div>Status</div>
              <div>Total</div>
              <div>Detalhes</div>
            </div>
            {dadosVenda.map((item) => (
             
                <div className={styles.body} >
                  
                    <p>#{item.id_venda} </p>
                    <p>{item.data_solicitacao}</p>
                    <p>{item.fm_pagamento}</p>
                    <p>{item.endereco_entrega}</p>
                    <p>{item.data_de_entrega}</p>
                    <p>{item.qtd}</p>
                    <p>{formataStatus(item.status)}</p>
                    <p>{(item.valor_total).toLocaleString('en-US', {  style: 'currency',  currency: 'BRL',})}</p>
                    <p>
                      <Link href={`/pedidos/${item.id_venda}`} className="cursor-pointer">
                        Visualizar
                      </Link>
                    </p>
                    
                    
                </div>
                 
            ))}
          </>
        )}
      </div>
                
    </>
  );
};

export default Pedidos;