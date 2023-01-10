
import { supabase } from '../../supabase'


export default async  function handler(req, res) {
    //Se existe buscar o ID do email cadastrado
    let id = 5
    //Se não existe cadastrar o usuário e buscar o ID gerado
    //Cadastar venda via PAYPAL passando o ID do usuário informado          
    try {
   

    const { data, error } = await supabase
    .from('vendas')
    .select()


    console.log('inserir')
    console.log(venda)
    res.status(200).json({ name: 'Venda enviada com sucesso' , dados : venda })            
    } catch (error) {
        res.status(500).json({ msg: 'Não foi possível realizar a venda', error : error })            
    }  
}
  