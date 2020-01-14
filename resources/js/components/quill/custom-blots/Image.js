import Quill from 'quill'
let BlockEmbed = Quill.import('blots/block/embed')

const ATTRIBUTES = ['alt', 'height', 'width']

class ImageBlot extends BlockEmbed {
  static create(value) {
    let node = super.create()
    let image = document.createElement('img')

    let className = `section--outset ${value.class ? value.class : ''}`.trim()

    image.setAttribute('src', value.url)
    node.setAttribute('class', className)
    node.appendChild(image)
    return node
  }

  static value(node) {
    return {
      url: node.firstChild.getAttribute('src'),
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

  // static value(domNode) {
  //   return domNode.getAttribute('src')
  // }

  // static formats(domNode) {
  //   return ATTRIBUTES.reduce(function(formats, attribute) {
  //     if (domNode.hasAttribute(attribute)) {
  //       formats[attribute] = domNode.getAttribute(attribute)
  //     }
  //     return formats
  //   }, {})
  // }

  // static match(url) {
  //   return /\.(jpe?g|gif|png)$/.test(url) || /^data:image\/.+;base64/.test(url)
  // }

  // static sanitize(url) {
  //   return sanitize(url, ['http', 'https', 'data']) ? url : '//:0'
  // }

  // format(name, value) {
  //   console.log('FORMQTTING')
  //   if (ATTRIBUTES.indexOf(name) > -1) {
  //     if (value) {
  //       this.domNode.setAttribute(name, value)
  //     } else {
  //       this.domNode.removeAttribute(name)
  //     }
  //   } else {
  //     super.format(name, value)
  //   }
  // }
}

ImageBlot.blotName = 'customImage'
ImageBlot.tagName = 'div'

export { ImageBlot as default }
