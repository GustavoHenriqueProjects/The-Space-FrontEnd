'use strict'

class card extends HTMLElement{

    constructor(){
        super()

        this.shadow = this.attachShadow({mode:'open'})

        this.name = 'Astronauta'
        this.photo = null
        this.background = 'green'

    }

    static get observedAttributes(){
        return['name','photo', 'background']
    }

    attributeChangedCallback(nameAttr, oldValue, newValue){
        this[nameAttr] = newValue
    }

    connectedCallback(){
        this.shadow.appendChild(this.component())
        this.shadow.appendChild(this.styles())
    }

    styles(){
          const css = document.createElement('style') 
          css.textContent = `
          *{
            padding:0;
            margin:0;
            box-sizing: border-box;
          }

          .card{
            width: 130px;
            height: 200px;
            display: grid;
            grid-template-rows: 20% 1fr 20%;
            place-items: center;
            background-color: ${this.background};
          }

          .card_name{
            color: #fff;
            font-size: 1rem;
            font-family: 'Roboto', sans-serif;
          }

          .card-photo{
            height: 100px;
            width: 100px;
            border-radius: 50%;
            background-color: green;
            background-image: url(${this.photo});
            background-size: cover;
          }

          .card-data{
            color: #fff;
            font-size: 1rem;
            font-family: 'Roboto', sans-serif;
          }

          ` 
    return css
    }

    component(){
        const card = document.createElement('div')
        card.classList.add('card')

        const name = document.createElement('div')
        name.classList.add('card_name')
        name.textContent = this.name

        const photo = document.createElement('div')
        photo.classList.add('card-photo')

        const data = document.createElement('div')
        data.classList.add('card-data')
        data.textContent = 'Astronaut'

        card.append(name, photo, data)

        return card
    }
}

customElements.define('card-astronaut',card)