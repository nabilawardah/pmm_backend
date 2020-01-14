import Quill from 'quill'
import { processVideoUrl } from './../quill-helper'

let BlockEmbed = Quill.import('blots/block/embed')

class VideoBlot extends BlockEmbed {
  static create(value) {
    let node = super.create()
    let children

    let className = `section--inset ${value.class ? value.class : ''}`.trim()

    let video = processVideoUrl(value.url)
    console.log('VIDEO: ', video)

    if (video.type === 'iframe') {
      children = document.createElement('iframe')
      children.setAttribute('frameborder', '0')
      children.setAttribute('allowfullscreen', 'true')
      children.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture')
      children.setAttribute('autoplay', 'false')
      children.setAttribute('src', video.url)
    } else {
      children = document.createElement('video')
      children.setAttribute('loop', 'true')
      children.setAttribute('controls', 'true')
      children.setAttribute('autplay', 'false')
      children.setAttribute('autostart', 'false')

      let source = document.createElement('source')
      source.setAttribute('src', video.url)
      source.setAttribute('type', value.type)

      children.appendChild(source)
    }

    children.setAttribute('class', 'ql-video')
    children.setAttribute('alt', value.alt)

    node.appendChild(children)
    node.setAttribute('class', className)
    return node
  }

  static value(node) {
    return {
      alt: node.firstChild.getAttribute('alt') || '',
      url: node.firstChild.firstChild.getAttribute('src'),
      classList: node.getAttribute('class'),
    }
  }

  static formats(node) {
    // We still need to report unregistered embed formats
    let format = {}
    if (node.hasAttribute('height')) {
      format.height = node.getAttribute('height')
    }
    if (node.hasAttribute('width')) {
      format.width = node.getAttribute('width')
    }
    return format
  }
}

VideoBlot.blotName = 'customVideo'
VideoBlot.tagName = 'div'

export { VideoBlot as default }
