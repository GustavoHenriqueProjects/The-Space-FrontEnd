'use strict'

import {getAllAstronauts} from './endPoints/cards_astronauts.js'

const createCards = ($data) =>{

    const card = document.createElement('card-astronaut')
    card.setAttribute('name', $data.name)
    card.setAttribute('photo', $data.profile_image_thumbnail)
    card.setAttribute('background', 'blue')

    return card
}

    export const loadAllAstronauts = async() => {  

    let allAstronauts = await getAllAstronauts()

    let card = document.querySelector('.container-card')

    let listAstronauts = allAstronauts.results.map(createCards)

    card.replaceChildren(...listAstronauts)

}