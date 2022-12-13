import Head from 'next/head'
import Image from 'next/image'
import { FaUser, FaMailBulk, FaLock } from 'react-icons/fa';


export default function Cadastro() {
  return (
    <div>
      <Head>
        <title>Cadastre-se</title>
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
      
    

    
      <div className="w-screen h-screen flex justify-center items-center bg-gray-100">

     
       
        <div className="p-10 bg-white rounded flex justify-center items-center flex-col shadow-md">
     
        <Image src="/logo.jpeg" width="100" height="100"/>

        <p className="mb-5 text-3xl uppercase text-gray-600">Cadastre-se </p>
        
            <div className="flex mb-5 p-3 w-80 focus:border-red-700 rounded border-2 outline-none">
                <FaUser /> 
                <input type="text" name="nome" className="ml-2"  placeholder="Digite seu nome" required/>
            </div>



            <div className="flex mb-5 p-3 w-80 focus:border-red-700 rounded border-2 outline-none">
                <FaMailBulk /> 
                <input type="email" name="email" className="ml-2"  placeholder="Digite seu E-mail" required/>
            </div>

        
            <div className="flex mb-5 p-3 w-80 focus:border-red-700 rounded border-2 outline-none">
                <FaLock /> 
                <input type="password" name="password" className="ml-2"  placeholder="Senha" required/>
            </div>


            <div className="flex mb-5 p-3 w-80 focus:border-red-700 rounded border-2 outline-none">
                <FaLock /> 
                <input type="password" name="confPassword" className="ml-2"  placeholder="Confirmar senha" required/>
            </div>

           
          <button className="bg-red-600 hover:bg-red-900 text-white font-bold p-2 rounded w-80" id="login" type="submit"><span>Cadastrar</span></button>
        </div>
      </div>

    </div>
  )
}
