'use strict'

const routes = {
    '/' : '../pages/home.html'
}

const route = async () =>{
    //Ouve o evento e corta a ação do link
    window.event.preventDefault()
    window.history.pushState({},"", window.event.target.href)

    const path = window.location.pathname
    const route = routes[path] // Pega o endereço
    const response = await fetch(route)
    const html = await response.text() // Tranforma em elemento html

    console.log(html)
    document.getElementById('root').innerHTML = html
}

//Torna a função global para ser usada no html
window.route = route