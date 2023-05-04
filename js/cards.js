'use strict'

class card extends HTMLElement{

    constructor(){
        super()

        this.shadow = this.attachShadow({mode:'open'})

        this.name = 'Astronauta'
        this.photo = null
        this.background = ''
        this.data = '00'
      }

    static get observedAttributes(){
        return['name','photo', 'background','data']
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
            width: 190px;
            height: 300px;
            display: grid;
            grid-template-rows: 20% 1fr 20%;
            place-items: center;
            background: ${this.background};
            border-radius: 30px;
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
            display: flex;
            flex-direction: column;
            align-items: center;
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

        const age_current = document.createElement('p')
        age_current.classList.add('data-age')
        age_current.textContent = `${this.data}`

        const data = document.createElement('div')
        data.classList.add('card-data')

        data.append(age_current)

        card.append(name, photo, data)

        return card
    }
}

customElements.define('card-astronaut',card)