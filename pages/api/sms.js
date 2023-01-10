// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const twilio = require('twilio');

const client = twilio('AC4083e99a86fc946cada24a41335d1ec2', '3ac0aaac9fa3f579936a00f6b1073b5d');

export default function handler(req, res) {
            
        client.messages
        .create({
        from: '+19894593349',
        body: 'Hello there!',
        to: '+5521998639055'
        })
                .then(message => {
                
                console.log(message.sid)
                res.status(200).json({ name: 'Mensagem enviada com sucesso' })

            })
            .catch(err => {
                console.error(err)
                res.status(400).json({ name: 'Não foi possível enviar a mensagem' })
            });


    // client.messages
    //         .create({
    //             from: '+19894593349',
    //             to: '+5521975713279',
    //             body: 'Jessica te amo muitoo, você é linda demais! Seu namorado tem sorte :)'
    //         })
    //         .then(message => {
                
    //             console.log(message.sid)
    //             res.status(200).json({ name: 'Mensagem enviada com sucesso' })

    //         })
    //         .catch(err => {
    //             console.error(err)
    //             res.status(400).json({ name: 'Não foi possível enviar a mensagem' })
    //         });


  }
  