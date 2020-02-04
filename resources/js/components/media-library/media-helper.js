import { exec } from 'pell/src/pell'

export function processVideoUrl(url) {
  let str = String(url)
  let modified, newUrl

  if (str.includes('youtube.com/watch?v=')) {
    modified = str.split('youtube.com/watch?v=')
    newUrl = `https://youtube.com/embed/${modified[1]}`
    return { type: 'iframe', host: 'youtube', url: newUrl }
  } else if (str.includes('youtube.com/embed/')) {
    modified = str.split('youtube.com/embed/')
    newUrl = `https://youtube.com/embed/${modified[1]}`
    return { type: 'iframe', host: 'youtube', url: newUrl }
  } else if (str.includes('youtu.be/')) {
    modified = str.split('youtu.be/')
    newUrl = `https://youtube.com/embed/${modified[1]}`
    return { type: 'iframe', host: 'youtube', url: newUrl }
  } else if (str.includes('/player.vimeo.com/video/')) {
    modified = str.split('/player.vimeo.com/video/')
    newUrl = `https://player.vimeo.com/video/${modified[1]}`
    return { type: 'iframe', host: 'vimeo', url: newUrl }
  } else if (str.includes('/vimeo.com/')) {
    modified = str.split('/vimeo.com/')
    newUrl = `https://player.vimeo.com/video/${modified[1]}`
    return { type: 'iframe', host: 'vimeo', url: newUrl }
  } else if (str.match(/\.(mp4|webm|ogv|ogg)$/) != null) {
    return { type: 'video', host: 'local', url }
  } else {
    return { type: 'iframe', host: 'unknown', url }
  }
}

export function generateVideoElement(video, filetype) {
  let markup = ``

  if (video.type === 'iframe') {
    markup = `&nbsp;<p><iframe class="pell-video" src=${video.url} frameborder="0" allowfullscreen="true" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" autoplay="false"></iframe></p><p>&nbsp;</p>`
  } else {
    markup = `&nbsp;<p><video class="pell-video" loop="true" controls="true"><source src="${video.url}" type="${filetype}"/></video></p><p>&nbsp;</p>`
  }

  globalSelection.collapse(savedSelection[0], savedSelection[1])
  exec('insertHTML', markup)
}
