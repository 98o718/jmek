import smoothscroll from 'smoothscroll-polyfill'
import Glide from '@glidejs/glide'
import baguetteBox from 'baguettebox.js'
import IMask from 'imask'

// Слайдеры

new Glide('.glide', {
  type: 'carousel',
  perView: 4,
  focusAt: 'center',
  autoplay: 4000,
  animationTimingFunc: 'ease',
  breakpoints: {
    640: {
      perView: 1,
    },
    940: {
      perView: 2,
    },
    1300: {
      perView: 3,
    },
  },
}).mount()

new Glide('.glide2', {
  type: 'carousel',
  perView: 3,
  focusAt: 'center',
  autoplay: 4000,
  animationTimingFunc: 'ease',
  breakpoints: {
    850: {
      perView: 1,
    },
    1140: {
      perView: 2,
    },
  },
}).mount()

// Маска ввода

const phoneMask = IMask(document.querySelector('.tel-num'), {
  mask: '+{7}(000)000-00-00',
})

// lightbox

baguetteBox.run('.glide__slide')

// Меню

let toggle = true

const menuToggle = document.querySelector('.mob-menu-toggle')
const menu = document.querySelector('.mob-menu')
const backButton = document.querySelector('.mob-menu-back')

const showMenu = () => {
  toggle = true
  menu.classList.remove('closed')
  setTimeout(() => {
    const scrollY = window.pageYOffset
    const body = document.body
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
  }, 500)
}

const closeMenu = () => {
  const body = document.body
  const scrollY = body.style.top
  body.style.position = ''
  body.style.top = ''
  window.scrollTo(0, parseInt(scrollY || '0') * -1)
  toggle = false
  menu.classList.add('closed')
}

backButton.addEventListener('click', e => {
  e.preventDefault()

  if (toggle) closeMenu()
})

menuToggle.addEventListener('click', e => {
  e.preventDefault()

  showMenu()
})

// Плавный скролл

smoothscroll.polyfill()

const smoothScrollTo = anchor => {
  let el = document.querySelector(anchor)

  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset
  const yOffset = -50

  window.scrollTo({
    top: yCoordinate + yOffset,
    behavior: 'smooth',
  })
}

const scrollLinks = document.querySelectorAll('.scroll-link')

scrollLinks.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault()

    if (toggle) {
      closeMenu()
    }

    let anchor = e.target.getAttribute('href')

    if (anchor == null || anchor === '#') {
      window.history.pushState('', '', '/')

      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      window.history.pushState('', '', anchor)

      smoothScrollTo(anchor)
    }
  })
})

// Контактная форма

const button = document.querySelector('.submit')

const form = document.querySelector('#form')

const submit = form.addEventListener('submit', e => {
  e.preventDefault()

  button.disabled = true

  const { name, tel } = {
    name: form.name.value,
    tel: form.tel.value,
  }

  const data = new FormData()

  data.append('name', name)
  data.append('tel', tel)

  fetch('mail.php', {
    method: 'POST',
    body: data,
  }).then(res =>
    res.json().then(json => {
      if (json.name === name) {
        alert('Заявка принята!')
        button.disabled = false
      }
    })
  )
})
