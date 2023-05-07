'use strict'

//async permite que execute o restante do codigo, como a obetenção da API sem bloquear a execucao do restante do codigo
export const getAgenciesByPage = async (page) => {

    if (page !== null && page !== undefined && page != 'null' && page !== 'undefined') {
        //URL indica o endereço onde as informações podem ser obtidas
        const url = `${page}`

        //Para acessar os dados da requisição da API é nessario o feth() que tem os status da requisição e os headers
        const response = await fetch(url)

        //Data recebe o response.json() que extrai o conteudo da resposta no formato JSON
        const data = await response.json()

        return {
            ...data
        }
    }

}