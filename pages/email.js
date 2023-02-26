import React, { useRef } from 'react';
import Head from 'next/head'
import emailjs from '@emailjs/browser'

const Email = () => {

    const handleEnviarEmail = () => {
        var templateParams = {
            name: 'Caio Ibraim',
            notes: 'Testando envio de email'
        };
         
        emailjs.send('service_nz415za', 'template_tf2fhzi', templateParams)
            .then(function(response) {
               console.log('SUCCESS!', response.status, response.text);
            }, function(error) {
               console.log('FAILED...', error);
            });
        
    }



    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        alert()

        emailjs.sendForm('service_nz415za', 'template_tf2fhzi', form.current, 'LR3Pos6AMZ7wCSCnW')
        .then((result) => {
            console.log(result.text);
        }, (error) => {
            console.log(error.text);
        });
    };


    return (

        <>
      
      <Head>
        <title>Painel de Email Makoto</title>
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



      <div className="flex m-3">
              <section className='w-10/12  mx-auto md:p-10'>
                
                <div className="pt-3 pb-5">
                  <span className="text-slate-400">#Painel de Email  Makoto Patches</span>
                  <h1 className='text-1xl md:text-4xl mt-2 text-left uppercase  text-slate-800'>MAKOTO</h1>
                </div> 

              
                <div className='mt-2 flex-wrap'>
                    <form ref={form} onSubmit={sendEmail}>
                        <label>Name:</label>
                        <input className="border-2 m-2" type="text" name="user_name" />
                        <label>Email:</label>
                        <input className="border-2 m-2"  type="email" name="user_email" />
                        <label>Message:</label>
                        <textarea className="border-2 m-2"  name="message" />
                        <button type="submit" className="btn btn-w-full bg-indigo-500 p-3 mt-3 text-blue-50">Enviar Email</button>
                    </form>
                </div>


              </section>
            </div>
      
       
        </>
    )
}

export default Email