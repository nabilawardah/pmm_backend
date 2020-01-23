$(function() {
  generateThumbnail()
})

function generateThumbnail() {
  let canvases = document.querySelectorAll('canvas.gallery-item-video')

  canvases.forEach(canvas => {
    let container = canvas.parentNode
    let video = canvas.parentNode.querySelector('video')
    let img = document.createElement('IMG')

    video.play()
    setTimeout(() => {
      video.pause()
      canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
      img.setAttribute('src', canvas.toDataURL())
      img.classList.add('gallery-item-image')
      img.onload = container.appendChild(img)
      canvas.remove()
    }, 200)
  })
}
