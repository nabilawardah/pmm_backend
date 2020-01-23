import pell, { exec } from 'pell/src/pell'
import striptags from 'striptags'
import { pellActions } from './pell-actions'
import { removeFormatTitle, checkTitleState, cleanupAttributes, cleanupEverything } from './pell-helper'

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
  let sanitizedHTML = cleanupAttributes(clipboardData.getData('text/html'))

  exec('insertHTML', sanitizedHTML)
}

$(function() {
  let eventDataContainer = $('textarea#event-data')
  let articleDataContainer = $('textarea#article-data')

  checkTitleState($('.editor-title'))
  checkTitleState($('.editor-subtitle-preview'))

  if (eventDataContainer.length > 0) {
    let eventData = JSON.parse(eventDataContainer.val())
    if (eventData.html) {
      // console.log('EVENT-DATA: ', eventData.html)
      pellEditor.content.innerHTML = eventData.html
    }
  }

  if (articleDataContainer.length > 0) {
    let articleData = JSON.parse(articleDataContainer.val())
    if (typeof articleData.html !== undefined) {
      // console.log('ARTICLE-DATA: ', articleData.html)
      pellEditor.content.innerHTML = articleData.html
    }
  }

  $(document).on('keyup', '.editor-title', function() {
    checkTitleState($(this))
  })

  $(document).on('keyup', '.editor-subtitle-preview', function() {
    checkTitleState($(this))
  })

  let editorTitle = document.querySelector('#editor-title')
  if (editorTitle) {
    editorTitle.addEventListener('paste', function(e) {
      removeFormatTitle(e, this)
    })
  }

  let editorSubtitle = document.querySelector('#editor-subtitle-preview')
  if (editorSubtitle) {
    editorSubtitle.addEventListener('paste', function(e) {
      removeFormatTitle(e, this)
    })
  }
})
