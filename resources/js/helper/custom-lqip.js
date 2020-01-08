$(function() {
  let images = document.querySelectorAll('.lazyload')
  images.forEach(img => {
    let src = img.getAttribute('data-src')
    let container = document.createElement('img')
    container.setAttribute('src', src)
    container.onload = img.setAttribute('src', src)
    img.classList.add('lazyloaded')
  })
})
