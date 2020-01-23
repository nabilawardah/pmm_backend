import Quill from 'quill'
import { imageHandler } from './quill-image-handler'
import { CustomClipboard, generateIcon, removeFormatTitle, checkTitleState } from './quill-helper'

import CustomImage from './custom-blots/Image'
import CustomVideo from './custom-blots/Video'

const icons = Quill.import('ui/icons')
const Parchment = Quill.import('parchment')
const Block = Quill.import('blots/block')

// Block.className = 'section--inset'
// Quill.register({ 'formats/customImage': CustomImage }, true)
// Quill.register({ 'formats/customVideo': CustomVideo }, true)
// Quill.register(Block, true)

// Register solution for scroll issue on paste
// Quill.register('modules/clipboard', CustomClipboard, true)

let wysiwyg = $('#wysiwyg-editor')

if (wysiwyg.length > 0) {
  $(function() {
    wysiwygEditor.root.addEventListener('click', function(ev) {
      let image = Parchment.find(ev.target.parentNode)
      if (image instanceof CustomImage || image instanceof CustomVideo) {
        wysiwygEditor.setSelection(image.offset(wysiwygEditor.scroll), 1, 'user')
      }
    })
  })
}
