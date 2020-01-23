import pell, { exec } from 'pell/src/pell'
import striptags from 'striptags'
import { pellActions } from './pell-actions'

let pellEditor = pell.init({
  element: document.getElementById('pell-editor'),
  onChange: html => html,
  defaultParagraphSeparator: 'p',
  styleWithCSS: false,
  actions: pellActions,
  classes: {
    actionbar: 'pell-actionbar section--inset',
    button: 'pell-button',
    content: 'pell-content section--inset',
    selected: 'pell-button-selected',
  },
})

window.pell = pellEditor

pellEditor.onpaste = function(event) {
  event.stopPropagation()
  event.preventDefault()

  const clipboardData = event.clipboardData || window.clipboardData
  let pastedData = clipboardData.getData('text/html')
  pastedData = striptags(pastedData, ['h3', 'h2', 'h1', 'p', 'br', 'ul', 'ol', 'li']) // remove all html except the listed tags

  let wrapper = document.createElement('div')
  wrapper.innerHTML = pastedData

  let allChildren = wrapper.getElementsByTagName('*')
  for (let index = 0; index < allChildren.length; index++) {
    const element = allChildren[index]
    element.removeAttribute('id')
    element.removeAttribute('class')
    element.removeAttribute('style')
  }

  pastedData = wrapper.innerHTML

  exec('insertHTML', pastedData)
}

$(function() {
  let eventDataContainer = $('textarea#event-data')
  if (eventDataContainer.length > 0 && eventDataContainer.val()) {
    let eventData = JSON.parse(eventDataContainer.val())
    if (!typeof eventData === undefined) {
      // console.log('EVENT-DATA: ', eventData.html)
      pellEditor.content.innerHTML = eventData.html
    }
  }
})
