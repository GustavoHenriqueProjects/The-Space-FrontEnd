'use strict'

import {getAllAstronauts} from './endPoints/cards_astronauts.js'
import { getAstronautsInSpace } from './endPoints/cards_astronautsInSpace.js'

const createCards = ($data) =>{

    const card = document.createElement('card-astronaut')
    card.setAttribute('name', $data.name)
    card.setAttribute('photo', $data.profile_image_thumbnail)
    card.setAttribute('background', 'linear-gradient(179.15deg, #4A85BC -0.22%, rgba(74, 133, 188, 0.585029) -0.22%, rgba(74, 133, 188, 0.340032) 2.21%, rgba(74, 133, 188, 0.22032) 78.07%, rgba(74, 133, 188, 0) 106.08%)');
    card.setAttribute('data', `Idade: ${$data.age}`)

    return card
}



const statusAstronauts = async (status) =>{

    if(status == 'all'){
        loadAllAstronauts()
    }else{
        let statusAstronauts = await getAstronautsInSpace(status)

        let card = document.querySelector('.container-card')
    
        let listAstronauts = statusAstronauts.results.map(createCards)
    
        card.replaceChildren(...listAstronauts)
    }

}

    export const loadAllAstronauts = async() => {  

    let allAstronauts = await getAllAstronauts()

    let card = document.querySelector('.container-card')

    let listAstronauts = allAstronauts.results.map(createCards)

    card.replaceChildren(...listAstronauts)

    const option = document.querySelector('#option')
    option.addEventListener('change', () => {
    statusAstronauts(option.value)

})

}





