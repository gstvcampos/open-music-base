/* Desenvolva sua lógica aqui ... */
import { products } from "./productsData.js"

function render(array) {
    const albunsList = document.querySelector('.albuns__list')
  
    albunsList.innerHTML = ""
  
    array.forEach(album => {
      const card = createCard(album)
  
      albunsList.appendChild(card)
    });
  
}

function createCard(object) {
    const li = document.createElement('li')
    const img = document.createElement('img')
    const divHeader = document.createElement('div')
    const band = document.createElement('span')
    const year = document.createElement('span')
    const title = document.createElement('span')
    const price = document.createElement('span')
    const button = document.createElement('button')

    divHeader.classList.add('div-album')
    band.classList.add('text-3')
    year.classList.add('text-3')
    title.classList.add('title')
    price.classList.add('price')
    button.classList.add('buy-button')
    
  divHeader.append(band, year)
  li.append(img, divHeader, title, price, button)

  img.src = object.img

  img.src = `./src/assets/img/${object.id + 1}.jpg`
  img.alt = `foto album ${object.title}`
  band.innerText = object.band
  year.innerText = object.year
  title.innerText = object.title
  price.innerText = `R$ ${object.price.toFixed(2)}`
  button.innerText = "Comprar"

  return li
}

function filter(array) {
  const buttons = document.querySelectorAll('.filter__button')
  const inputRange = document.querySelector('#rangeInput')

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const selectedCategory = button.value
      let filteredItems = []

      if (selectedCategory == 0) {
        filteredItems = array
      } else {
        filteredItems = array.filter(album => album.category == selectedCategory)
      }

      render(filteredItems)
      filterPrice(filteredItems)
    })
  })
}

//filtar por valor
function filterPrice(array) {
  const inputRange = document.querySelector('#rangeInput')
  inputRange.addEventListener('input', () => {

    const filteredItems = array.filter(album => album.price <= inputRange.value)
    render(filteredItems)

  })
}

//renderizando valor no filtro range
function filterByRange() {
  const inputRange = document.querySelector('#rangeInput')

  inputRange.addEventListener('input', () => {
    const span = document.querySelector('#idToSearch')

    span.innerText = `Até R$ ${inputRange.value}.00`


  })
}


function renderDark() {
  const darkButton = document.querySelector('.mode__btn')
  const html = document.querySelector('html')
  const moon = document.querySelector('.img__moon')
  const sun = document.querySelector('.img__sun')

  const modePreference = JSON.parse(localStorage.getItem('dark__mode'))

  if(modePreference) {
    html.classList.toggle('dark__mode')
    moon.classList.toggle('hide')
    sun.classList.toggle('hide')
  }

  darkButton.addEventListener('click', () => {
    html.classList.toggle('dark__mode')
    moon.classList.toggle('hide')
    sun.classList.toggle('hide')

    if(html.classList.contains('dark__mode')) {
      localStorage.setItem('dark__mode', true)
    } else {
      localStorage.setItem('dark__mode', false)
    }
  })
}


filterPrice(products)
renderDark()
filterByRange()
filter(products)
render(products)