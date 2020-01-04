import axios from 'axios'
import Quill from 'quill'

import { generateMedia } from '../media-uploader'

const Delta = Quill.import('delta')

export function imageHandler() {
  generateMedia(handleUpload.bind(this))
}

function handleUpload() {
  let fileInput = this.container.querySelector('input.ql-image[type=file]')

  if (fileInput == null) {
    fileInput = document.createElement('input')
    fileInput.setAttribute('type', 'file')
    fileInput.setAttribute(
      'accept',
      'image/png, image/gif, image/jpeg, image/bmp, image/x-icon, video/mp4, video/3gpp, video/quicktime, video/x-msvideo, video/x-ms-wmv, video/mpeg, video/webm'
    )
    fileInput.classList.add('ql-image')

    fileInput.addEventListener('change', () => {
      if (fileInput.files != null && fileInput.files[0] != null) {
        let articleId = $('#article-id').val()
        let data = new FormData()
        const config = {
          headers: { 'content-type': 'multipart/form-data' },
        }
        data.append('media', fileInput.files[0])

        axios
          .post(`/articles/${articleId}/media`, data, config)
          .then(res => {
            console.log('RES: ', res.data)

            let quillInstance = this.quill
            let range = quillInstance.getSelection(true)

            if (res.status === 200) {
              quillInstance.updateContents(
                new Delta()
                  .retain(range.index)
                  .delete(range.length)
                  .insert({ image: res.data.url }),
                Quill.sources.USER
              )
              fileInput.value = ''
            } else {
              let reader = new FileReader()
              reader.onload = function(e) {
                quillInstance.updateContents(
                  new Delta()
                    .retain(range.index)
                    .delete(range.length)
                    .insert({ image: e.target.result }),
                  Quill.sources.USER
                )
                fileInput.value = ''
              }
              reader.readAsDataURL(fileInput.files[0])
            }
          })
          .catch(err => console.log(err))
      }
    })
    this.container.appendChild(fileInput)
  }
  fileInput.click()
}
