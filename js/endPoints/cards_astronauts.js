'use strict'

//async permite que execute o restante do codigo, como a obetenção da API sem bloquear a execucao do restante do codigo
export const getAllAstronauts = async() =>{

    //URL indica o endereço onde as informações podem ser obtidas
    //const url = 'https://ll.thespacedevs.com/2.2.0/astronaut/'
    const url = 'https://lldev.thespacedevs.com/2.2.0/astronaut/'

    //Para acessar os dados da requisição da API é nessario o feth() que tem os status da requisição e os headers
    const response = await fetch(url)

    //Data recebe o response.json() que extrai o conteudo da resposta no formato JSON
    const data = await response.json()
 
    return{
        ...data
    }
}