'use strict'

import {getAgencies} from './endPoints/card_agencies.js'
import {getAgenciesByName} from './endPoints/card_agenciesByName.js'
import {getAgenciesByPage} from './endPoints/card_agencieByPage.js'

const createCards = ($data) => {

    const card = document.createElement('card-astronaut')
    card.setAttribute('name', $data.abbrev)
    card.setAttribute('background', 'linear-gradient(179.15deg, #4A85BC -0.22%, rgba(74, 133, 188, 0.585029) -0.22%, rgba(74, 133, 188, 0.340032) 2.21%, rgba(74, 133, 188, 0.22032) 78.07%, rgba(74, 133, 188, 0) 106.08%)');
    card.setAttribute('data', $data.type)

    if($data.logo_url != null){
        card.setAttribute('photo', $data.logo_url)
    }else{
        if($data.image_url != null){
            card.setAttribute('photo', $data.image_url)
        }else{
            card.setAttribute('photo', '../imgs-videos/erro.png')
        }
    }

    return card
}

const nextPage = async () => {

    let newPage = localStorage.getItem('nextPageAgencie')

    let card = document.querySelector('.container-card')

    let page = await getAgenciesByPage(newPage)

    let listAstronauts = page.results.map(createCards)

    card.replaceChildren(...listAstronauts)

    //Atualiza o valor do localStorage com a nova pagina
    localStorage.removeItem('nextPageAgencie')
    localStorage.removeItem('backPageAgencie')

    localStorage.setItem('nextPageAgencie', page.next)
    localStorage.setItem('backPageAgencie', page.previous)
}

const previousPage = async () => {

    let backPage = localStorage.getItem('backPageAgencie')

    console.log(backPage)

    if(backPage != 'null' || backPage != null){

    let card = document.querySelector('.container-card')

    let nextPage = await getAgenciesByPage(backPage)

    let listAstronauts = nextPage.results.map(createCards)

    card.replaceChildren(...listAstronauts)

    //Atualiza o valor do localStorage com a nova pagina
    localStorage.removeItem('nextPageAgencie')
    localStorage.removeItem('backPageAgencie')

    localStorage.setItem('nextPageAgencie', nextPage.next)
    localStorage.setItem('backPageAgencie', nextPage.previous)

    }
}

const searchAgenciesByName = async (name) => {

    let searchAgencie = await getAgenciesByName(name)

    let card = document.querySelector('.container-card')

    let cardAgencie = searchAgencie.results.map(createCards)

    card.replaceChildren(...cardAgencie)
    
}


export const loadAllAgencies = async () => {

    let agencies = await getAgencies()

    let card = document.querySelector('.container-card')

    let listAstronauts = agencies.results.map(createCards)

    localStorage.setItem('nextPageAgencie', agencies.next)
    localStorage.removeItem('backPageAgencie')

    card.replaceChildren(...listAstronauts)

    const search = document.getElementById('search')
    search.addEventListener('keyup', () =>{
        searchAgenciesByName(search.value)
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