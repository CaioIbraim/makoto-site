export const formataStatus = (status) => {
    let texto = ''
    switch (status) {
        case 0:
            texto = 'Em andamento'
            break;
    
        default:
            break;
    }

    return <span className="text-gray-600"> {texto}</span>
}


export const formatarData = (dataPassada) => {
    let data = new Date(dataPassada);
    let dataFormatada = ( (data.getDate() + 1) + "/" + ((data.getMonth() + 1)) + "/" + (data.getFullYear() ));
    return dataFormatada                 
}