import './styles/reset.css'
import './styles/styles.sass'
import './styles/search.sass'
import './styles/trip.sass'

import pixabayImage from './media/pixabay-logo.png'

import {renderTrips} from './js/trips'
import {renderSearch} from './js/search'

renderTrips()
renderSearch()

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

if (!navigator.onLine) {
  showOfflineMessage()
}

window.addEventListener('online', () => {
  const elements = retrieveInputs()
  elements.forEach(el => {
    if (el.hasAttribute('id')) {
      el.removeAttribute('disabled')
    }
  })
  removeOfflineMessage()
})

window.addEventListener('offline', () => {
  const elements = retrieveInputs()
  elements.forEach(el => {
    el.setAttribute('disabled', 'disabled')
  })
  showOfflineMessage()
})

const removeOfflineMessage = () => {
  const offline = document.getElementById('offline')
  if (offline) {
    offline.remove()
  }
}

const showOfflineMessage = () => {
  const first = document.querySelector('main')
  if (document.getElementById('offline')) {
    return
  }
  const offline = "<p id='offline'>You seem to be offline!</p>"
  first.insertAdjacentHTML('afterbegin', offline)
}

const retrieveInputs = () => {
  const buttons = document.querySelectorAll('button')
  const inputs = document.querySelectorAll('input')
  return [...inputs, ...buttons]
}

const pixabay = document.getElementById('pixabay')
pixabay.setAttribute('src', pixabayImage)
