import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'

export default function Login() {

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
    <div>
      <Head>
        <title>Entrar</title>
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
      <>

      <div className='h-screen grid place-items-center'>

<div className='text-center'>



  <Link href="/">
      <Image src="/logo.jpeg" className="cursor-pointer" width="150" height="150"/>
  </Link>


  <h1 className='text-4xl font-bold uppercase mt-5  '>Bem-vindo {user.user_metadata.name}!</h1>
  <div className='flex'>  
    <img src={user.user_metadata.avatar_url} className="rounded-full" width="50" height="50"/>
    {user.user_metadata.email}    
  </div>  
  <Link href="/">
    <p className='bg-red-600 text-white py-4 px-12 mt-4 hover:bg-red-800 cursor-pointer'>Ir para a loja</p>
  </Link>
  <button onClick={() => supabaseClient.auth.signOut()} className='bg-red-600 text-white py-4 px-12 mt-4 hover:bg-red-800 cursor-pointer'>Sair</button>
</div>

</div>


      </>
    </div>
  )
}
