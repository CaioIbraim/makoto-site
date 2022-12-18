import React from 'react'
import Navbar from '../components/Navbar'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Head from 'next/head'

const Perfil = () => {


  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [data, setData] = useState()

  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('test').select('*')
      setData(data)
    }
    // Only run query once user is logged in.
    if (user) loadData()
  }, [user])


  if (!user)
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
      <div className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
      <Image src="/logo.jpeg" width="100" height="100"/>

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
        
        <>


<Head>
        <title>Perfil : {user.email}</title>
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



        <div className='h-screen'>


          <div className="p-5 w-full bg-gray-100">
           
            <div className="p-5 w-full bg-gray-300 rounded-md flex justify-between">
                <div className="flex">
                  <Image src={user.user_metadata.avatar_url} className="rounded-md" width={80} height={80}/>
                  <div className="ml-5 mt-2">
                    <h1 className="text-3xl">{user.user_metadata.name}</h1>
                    {user.user_metadata.email}
                  </div>
                </div>
                <button onClick={() => supabaseClient.auth.signOut()} className="bg-red-600 h-1/2 p-2 rounded-md">Sair</button>
            </div>

          </div>

        <div className='text-center'>
        
         
          
        </div>
  
      </div>
      </>
    )
}

export default Perfil