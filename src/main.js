import smoothscroll from 'smoothscroll-polyfill'
import Glide from '@glidejs/glide'

if (window.matchMedia('(max-width: 575.98px)').matches) {
  new Glide('.glide', {
    type: 'carousel',
    perView: 1,
    focusAt: 'center',
    autoplay: 4000,
    animationTimingFunc: 'ease',
  }).mount()

  new Glide('.glide2', {
    type: 'carousel',
    perView: 1,
    focusAt: 'center',
    autoplay: 4000,
    animationTimingFunc: 'ease',
  }).mount()
} else {
  new Glide('.glide', {
    type: 'carousel',
    perView: 4,
    focusAt: 'center',
    autoplay: 4000,
    animationTimingFunc: 'ease',
  }).mount()

  new Glide('.glide2', {
    type: 'carousel',
    perView: 3,
    focusAt: 'center',
    autoplay: 4000,
    animationTimingFunc: 'ease',
  }).mount()
}

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
