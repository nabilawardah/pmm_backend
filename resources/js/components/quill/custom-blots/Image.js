import Quill from 'quill'
let BlockEmbed = Quill.import('blots/block/embed')

class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create()
    let image = document.createElement('img')

    let className = `section--outset ${value.class ? value.class : ''}`.trim()

    image.setAttribute('alt', value.alt)
    image.setAttribute('src', value.url)
    node.setAttribute('class', className)
    node.appendChild(image)
    return node
  }

  static value(node) {
    return {
      alt: node.getAttribute('alt'),
      url: node.firstChild.getAttribute('src'),
      classList: node.getAttribute('class'),
    }
  }
}

ImageBlot.blotName = 'customImage'
ImageBlot.tagName = 'div'

export { ImageBlot as default }
