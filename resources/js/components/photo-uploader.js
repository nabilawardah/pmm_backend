import axios from 'axios'
import { showSecondaryModal, hidePrimaryModal } from './modals'

export function generateImageContainer({ label, src }) {
  let photo = src || 'default.png'
  let markup = `
    <fieldset class="input">
      <label class="input-label">${label}</label>
      <div class="edit-profile-photo" style="background-image: url('/images/users/${photo}')"></div>
    </fieldset>
    <button class="button button--medium default stretch upload-profile-picture">Upload an Image</button>
  `
  return markup
}

function readUrl(input, container) {
  let reader

  if (input.files && input.files[0]) {
    reader = new FileReader()
    reader.onload = function(e) {
      container.css('background-image', `url(${e.target.result})`)
    }
    return reader.readAsDataURL(input.files[0])
  }
}

export function uploadProfilePhoto(e) {
  let inputFile = $('.photo-upload-container')
  inputFile.trigger('click')
}

export function processPhotoUploading() {
  let input = $('.photo-upload-container')
  let container = $('.preview-photo-container')
  readUrl(input[0], container)
  hidePrimaryModal()
  showSecondaryModal()
}

export function saveProfilePhoto(id) {
  let input = $('.photo-upload-container')
  let data = new FormData()
  let file = input[0].files[0]

  data.append('photo', file, file.name)

  console.log('File: ', file)
  console.log('DATA: ', data)

  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  }

  return axios
    .post(`/api/photo/${id}`, data, config)
    .then(res => console.log('RES: ', res))
    .catch(err => console.log('ERR: ', err))
}
