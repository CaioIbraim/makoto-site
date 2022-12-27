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