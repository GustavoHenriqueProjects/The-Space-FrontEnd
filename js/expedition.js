'use strict'

import { getExpedition } from './endPoints/card_expedition.js'
import { getExpeditionByPage } from './endPoints/card_expeditionByPage.js'

const createCards = ($data) => {

    const card = document.createElement('card-astronaut')
    card.setAttribute('name', $data.name)
    card.setAttribute('background', 'linear-gradient(179.15deg, #4A85BC -0.22%, rgba(74, 133, 188, 0.585029) -0.22%, rgba(74, 133, 188, 0.340032) 2.21%, rgba(74, 133, 188, 0.22032) 78.07%, rgba(74, 133, 188, 0) 106.08%)');
    card.setAttribute('data', $data.spacestation.name)
    card.setAttribute('photo', $data.spacestation.image_url)



    return card
}

const nextPage = async () => {

    let newPage = localStorage.getItem('nextPageExpedition')

    let card = document.querySelector('.container-card')

    let page = await getExpeditionByPage(newPage)

    let listExpedition = page.results.map(createCards)

    card.replaceChildren(...listExpedition)

    //Atualiza o valor do localStorage com a nova pagina
    localStorage.removeItem('nextPageExpedition')
    localStorage.removeItem('backPageExpedition')

    localStorage.setItem('nextPageExpedition', page.next)
    localStorage.setItem('backPageExpedition', page.previous)
}

const previousPage = async () => {

    let backPage = localStorage.getItem('backPageExpedition')

    if (backPage != 'null' || backPage != null) {

        let card = document.querySelector('.container-card')

        let nextPage = await getExpeditionByPage(backPage)

        let listExpedition = nextPage.results.map(createCards)

        card.replaceChildren(...listExpedition)

        //Atualiza o valor do localStorage com a nova pagina
        localStorage.removeItem('nextPageExpedition')
        localStorage.removeItem('backPageExpedition')

        localStorage.setItem('nextPageExpedition', nextPage.next)
        localStorage.setItem('backPageExpedition', nextPage.previous)

    }
}

export const loadAllExpedition = async () => {

    let expedition = await getExpedition()

    let card = document.querySelector('.container-card')

    let listExpedition = expedition.results.map(createCards)

    localStorage.setItem('nextPageExpedition', expedition.next)
    localStorage.removeItem('backPageExpedition')

    card.replaceChildren(...listExpedition)

    let new_page = window.document.getElementById('next-page')
    new_page.addEventListener('click', () => {
        nextPage()
    })

    let back_page = window.document.getElementById('back-page')
    back_page.addEventListener('click', () => {
        previousPage()
    })

}