import Head from 'next/head'
import Image from 'next/image'

export default function Login() {
  return (
    <div>
      <Head>
        <title>Tela de Login</title>
        <meta name="description" content="Pedenoapp.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
    
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">
        <div className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
          <Image src="/logo.jpeg" width="100" height="100"/>

          <p className="mb-5 text-3xl uppercase text-gray-600">Entrar</p>
          <input type="email" name="email" className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"  placeholder="Email" required/>
          <input type="password" name="password" className="mb-5 p-3 w-80 focus:border-purple-700 rounded border-2 outline-none"  placeholder="Password" required/>

          <div className="flex items-left w-full">
            <input type="checkbox" name="remember" className="mb-5 mt-2  p-3 focus:border-purple-700 rounded border-2 outline-none"  required/>
            
            <span className="ml-2">
               Lembrar senha?
            </span>

          </div>
          
          <button className="bg-purple-600 hover:bg-purple-900 text-white font-bold p-2 rounded w-80" id="login" type="submit"><span>Entrar</span></button>
        </div>
      </div>

    </div>
  )
}
