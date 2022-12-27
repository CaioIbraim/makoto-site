import React from 'react'
import Navbar from '../components/Navbar'
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import Head from 'next/head'
import { supabase } from '../supabase'

const Perfil = () => {


  const supabaseClient = useSupabaseClient()
  const user = useUser()
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  
  const [id, setId] = useState(null);
  const [nome, setNome] = useState('');
  const [apelido, setApelido] = useState('');
  const [email, setEmail] = useState('');
  const [sexo, setSexo] = useState('');
  const [documento, setDocumento] = useState('');
  const [telefone, setTelefone] = useState('');
  const [nascimento, setNascimento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [cep, setCep] = useState('');
  const [numero, setNumero] = useState('');
  const [estado, setEstado] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');


  useEffect(() => {
    async function loadData() {
      const { data } = await supabaseClient.from('usuario').select('*')
      setData(data)
      setNome(user.user_metadata.name)
      setEmail(user.user_metadata.email)
      getProfile()
  
    }
    // Only run query once user is logged in.
    if (user) loadData()
      
  }, [user])



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





    const getProfile = async () => {
      try {
        setLoading(true)
      
        let { data, error, status } = await supabase
          .from('usuario')
          .select(`*`)
          .eq('email', user.user_metadata.email)
          .single()
  
        if (error && status !== 406) {
          throw error
        }
  
        if (data) {
           setId(data.id_usuario)
           setNome(data.nome)
           setApelido(data.apelido)
           setEmail(data.email)
           setSexo(data.sexo)
           setDocumento(data.documento)
           setTelefone(data.telefone)
           setNascimento(data.nascimento)
           setEndereco(data.endereco)
           setCep(data.cep)
           setNumero(data.numero)
           setEstado(data.estado)
           setBairro(data.bairro)
           setCidade(data.cidade)
        }
      } catch (error) {
        alert(error.message)
      } finally {
        setLoading(false)
      }
    }

  

    const  handleCadastrar = async () => {
      try {
        setLoading(true)
      const dados = {
        oauth_id: user.id,
        nome:nome,
        apelido:apelido,
        email:email,
        sexo:sexo,
        documento:documento,
        telefone:telefone,
        nascimento:nascimento,
        endereco:endereco,
        cep:cep,
        numero:numero,
        estado:estado,
        bairro:bairro,
        cidade:cidade    
      }

      const { data, error } = await supabase
      .from('usuario')
      .insert([dados], { upsert: true })

      } catch (error) {
        alert(error.message)
      } finally {
        setLoading(false)
      }

    }


  const  handleAtualizar = async () => {
    try {
      setLoading(true)
    const dados = {
      id_usuario:id,
      nome:nome,
      fk_tipo_usuario:2,
      apelido:apelido,
      email:email,
      sexo:sexo,
      documento:documento,
      telefone:telefone,
      nascimento:nascimento,
      endereco:endereco,
      cep:cep,
      numero:numero,
      estado:estado,
      bairro:bairro,
      cidade:cidade    
    }

    const { data, error } = await supabase
    .from('usuario')
    .upsert(dados)

    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }


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

      {loading ? (
        <div className="p-5 w-full bg-gray-100 text-center tx-6-xs">  Carregando ... </div>
      ) : (

      <div className='h-screen'>
            
        <div className="p-5 w-full bg-gray-100">

          <div className="p-5 w-full bg-gray-300 rounded-md flex justify-between">
            <div className="flex">
              <Image src={user.user_metadata.avatar_url} className="rounded-md" width={80} height={80} />
              <div className="ml-5 mt-2">
                <h1 className="text-3xl">{user.user_metadata.name}</h1>
                {user.user_metadata.email}
              </div>
            </div>
            <button onClick={() => supabaseClient.auth.signOut()} className="bg-red-600 h-1/2 p-2 rounded-md">Sair</button>
          </div>

          <div className='h-screen bg-gray-100'>

            <label className="flex pt-3 text-2xs" htmlFor="nome">Nome:
              <input type="text" className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2" id="nome" name="nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </label>

            <label className="flex pt-3 text-2xs" htmlFor="apelido">Apelido:
              <input type="text" className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2" id="apelido" name="apelido" value={apelido} onChange={(e) => setApelido(e.target.value)} />
            </label>

            <label className="flex pt-3 text-2xs" htmlFor="email">Email:
              <input type="email" className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2" id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>

            <label className="flex pt-3 text-2xs" htmlFor="sexo">Sexo:
              <select className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2 bg-white" id="sexo" name="sexo" onChange={(e) => setSexo(e.target.value)} >
                <option>Masculino</option>
                <option>Feminino</option>
              </select>
            </label>

            <label className="flex pt-3 text-2xs" htmlFor="documento">Documento:
              <input type="text" className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2" id="documento" name="documento" value={documento} onChange={(e) => setDocumento(e.target.value)} />
            </label>

            <label className="flex pt-3 text-2xs" htmlFor="telefone">Telefone:
              <input type="tel" className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2" id="telefone" name="telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            </label>

            <label className="flex pt-3 text-2xs" htmlFor="nascimento">Data de nascimento:
              <input type="date" className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2" id="nascimento" name="nascimento" value={nascimento} onChange={(e) => setNascimento(e.target.value)} />
            </label>

            <label className="flex pt-3 text-2xs" htmlFor="endereco">Endereço:
              <input type="text" className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2" id="endereco" name="endereco" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
            </label>

            <label className="flex pt-3 text-2xs" htmlFor="cep">CEP:
              <input type="text" className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2" id="cep" name="cep" value={cep} onChange={(e) => setCep(e.target.value)} />
            </label>

            <label className="flex pt-3 text-2xs" htmlFor="numero">Número:
              <input type="text" className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2" id="numero" name="numero" value={numero} onChange={(e) => setNumero(e.target.value)} />
            </label>


            <label className="flex pt-3 text-2xs" htmlFor="estado">Estado:
              <input type="text" className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2" id="estado" name="estado" value={estado} onChange={(e) => setEstado(e.target.value)} />
            </label>

            <label className="flex pt-3 text-2xs" htmlFor="cidade">Cidade:
              <input type="text" className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2" id="cidade" name="cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            </label>

            <label className="flex pt-3 text-2xs" htmlFor="bairro">Bairoo:
              <input type="text" className="w-1/2 ml-5 rounded-md border-2 border-gray-200 p-2" id="bairro" name="bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
            </label>

            <button onClick={id == null ? handleCadastrar : handleAtualizar} className="w-full bg-indigo-600 p-5 rounded-md mt-5 mb-5 text-white">Atualizar Perfil</button>

          </div>

        </div>

      </div>

      )}

    </>
  )
}

export default Perfil