'use strict'

import {loadAllAstronauts} from './astronauts.js'
import {loadAllAgencies} from './agencies.js'
/**
 * const routes = { '/': '../pages/home.html' }: 
 * define um objeto "routes" que mapeia os caminhos das rotas
 *  para os arquivos HTML correspondentes. Neste caso, a raiz 
 * do site "/" está mapeada para "../pages/home.html".
 * 
 */
const routes = {
    '/' : '../pages/home.html',
    '/astronaut' : '../pages/astronaut.html',
    '/agencies' : '../pages/agencies.html',
    '/location' : '../pages/location.html'
}

/**
 * const route = async () => { ... }: define uma função "route()" 
 * que é chamada quando um link é clicado. É uma função assíncrona,
 *  o que permite que ela faça requisições assíncronas ao servidor 
 * sem bloquear a execução do código.
 */
const route = async () =>{
    /**
     * window.event.preventDefault(): impede que o link seja aberto
     *  normalmente no navegador, já que queremos que a navegação seja
     *  tratada pelo JavaScript.
     */
    window.event.preventDefault()

    /**
     * window.history.pushState({},"", window.event.target.href): 
     * atualiza o histórico do navegador com a nova URL, para que
     *  o usuário possa navegar pelo histórico do navegador
     */
    window.history.pushState({},"", window.event.target.href)

    /**
     * const path = window.location.pathname:
     *  pega o caminho do URL atual.
     * */
    const path = window.location.pathname


    /**
     * const route = routes[path]: verifica se existe um arquivo HTML
     *  correspondente ao caminho atual definido no objeto "routes". 
     * Neste caso, se o caminho for "/", irá retornar "../pages/home.html"
     */
    const route = routes[path]

    /**
     * const response = await fetch(route): faz uma requisição HTTP para obter
     *  o conteúdo do arquivo HTML.
     */
    const response = await fetch(route)

    /**
     * const html = await response.text(): 
     * obtém o conteúdo do arquivo HTML como uma string de texto.
     */
    const html = await response.text() // Tranforma em elemento html

    /**document.getElementById('root').innerHTML = html:
     *  define o conteúdo da tag HTML com o ID "root" como o
     *  conteúdo HTML obtido da requisição */
    document.getElementById('root').innerHTML = html

    if(path == '/astronaut'){
        loadAllAstronauts()
    }else if(path == '/agencies'){
        loadAllAgencies()
    }
}

//Torna a função global para ser usada no html 
window.route = route
