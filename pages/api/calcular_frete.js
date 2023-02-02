import axios from "axios"

export default function handler(req, res) {
    var sendjson = {   
        "nCdEmpresa":"",
        "sDsSenha":"",
        "nCdServico":"41106",
        "sCepOrigem":"32241030",
        "sCepDestino":"37540000",
        "nVlPeso":"1",
        "nCdFormato":"1",
        "nVlComprimento":"20",
        "nVlAltura":"5",
        "nVlLargura":"15",
        "nVlDiametro":"0",
        "sCdMaoPropria":"s",
        "nVlValorDeclarado":"200",
        "sCdAvisoRecebimento":"s"
    }
        
    axios.get(`https://ws.correios.com.br/calculador/CalcPrecoPrazo.asmx/CalcPrecoPrazo`,{sendjson})
    .then(res => {    
        console.log(res)
        res.status(200).json({ res : res })
    })
    .catch(err => console.log(err))            
}
  