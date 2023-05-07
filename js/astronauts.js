'use strict'

import { getAllAstronauts } from './endPoints/cards_astronauts.js'
import { getAstronautsInSpace } from './endPoints/cards_astronautsInSpace.js'
import { getAstronautsByPage } from './endPoints/card_astronautsByPages.js'

const createCards = ($data) => {

    const card = document.createElement('card-astronaut')
    card.setAttribute('name', $data.name)
    card.setAttribute('photo', $data.profile_image_thumbnail)
    card.setAttribute('background', 'linear-gradient(179.15deg, #4A85BC -0.22%, rgba(74, 133, 188, 0.585029) -0.22%, rgba(74, 133, 188, 0.340032) 2.21%, rgba(74, 133, 188, 0.22032) 78.07%, rgba(74, 133, 188, 0) 106.08%)');
    card.setAttribute('data', `Idade: ${$data.age}`)

    return card
}

const nextPage = async () => {

    let newPage = localStorage.getItem('nextPage')

    let card = document.querySelector('.container-card')

    let page = await getAstronautsByPage(newPage)

    let listAstronauts = page.results.map(createCards)

    card.replaceChildren(...listAstronauts)

    //Atualiza o valor do localStorage com a nova pagina
    localStorage.removeItem('nextPage')
    localStorage.removeItem('backPage')

    localStorage.setItem('nextPage', page.next)
    localStorage.setItem('backPage', page.previous)
}

const previousPage = async () => {

    let backPage = localStorage.getItem('backPage')

    let card = document.querySelector('.container-card')

    let nextPage = await getAstronautsByPage(backPage)

    let listAstronauts = nextPage.results.map(createCards)

    card.replaceChildren(...listAstronauts)


    //Atualiza o valor do localStorage com a nova pagina
    localStorage.removeItem('nextPage')
    localStorage.removeItem('backPage')

    localStorage.setItem('nextPage', nextPage.next)
    localStorage.setItem('backPage', nextPage.previous)
}


const statusAstronauts = async (status) => {

    if (status == 'all') {
        loadAllAstronauts()
    } else {
        let statusAstronauts = await getAstronautsInSpace(status)

        let card = document.querySelector('.container-card')

        let listAstronauts = statusAstronauts.results.map(createCards)

        card.replaceChildren(...listAstronauts)

        //Atualiza o valor do localStorage com a nova pagina
        localStorage.removeItem('nextPage')
        localStorage.removeItem('backPage')

        localStorage.setItem('nextPage', statusAstronauts.next)
        localStorage.setItem('backPage', statusAstronauts.previous)
        let new_page = window.document.getElementById('next-page')
        new_page.addEventListener('click', () => {
            nextPage()
        })

        let back_page = window.document.getElementById('back-page')
        back_page.addEventListener('click', () => {
            previousPage()
        })

    }

}

export const loadAllAstronauts = async () => {

    let allAstronauts = await getAllAstronauts()

    let card = document.querySelector('.container-card')

    let listAstronauts = allAstronauts.results.map(createCards)

    localStorage.setItem('nextPage', allAstronauts.next)

    card.replaceChildren(...listAstronauts)

    let next_page = allAstronauts.results.next_page
    console.log(next_page)

    const option = document.querySelector('#option')
    option.addEventListener('change', () => {
        statusAstronauts(option.value)
    })

    let new_page = window.document.getElementById('next-page')
    new_page.addEventListener('click', () => {
        nextPage()
    })

    let back_page = window.document.getElementById('back-page')
    back_page.addEventListener('click', () => {
        previousPage()
    })

}