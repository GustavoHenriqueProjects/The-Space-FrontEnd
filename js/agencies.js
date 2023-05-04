'use strict'

import {getAllAgencies} from './endPoints/card_agencies.js'

const createCards = ($data) => {

    const card = document.createElement('card-astronaut')
    card.setAttribute('name', $data.abbrev)
    card.setAttribute('photo', $data.image_url)
    card.setAttribute('background', 'linear-gradient(179.15deg, #4A85BC -0.22%, rgba(74, 133, 188, 0.585029) -0.22%, rgba(74, 133, 188, 0.340032) 2.21%, rgba(74, 133, 188, 0.22032) 78.07%, rgba(74, 133, 188, 0) 106.08%)');
    card.setAttribute('data', $data.type)

    if($data.image_url == undefined) {
        card.setAttribute('photo', $data.logo_url)
    }else{
        card.setAttribute('photo', '../imgs-videos/erro.png')
    }

    return card
}


export const loadAllAgencies = async () => {

    let allAstronauts = await getAllAgencies()

    let card = document.querySelector('.container-card')

    let listAstronauts = allAstronauts.results.map(createCards)

    card.replaceChildren(...listAstronauts)


}