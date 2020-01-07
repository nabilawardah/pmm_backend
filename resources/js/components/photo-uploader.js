import axios from 'axios'
import { showSecondaryModal, hidePrimaryModal, showPrimaryModal, hideSecondaryModal } from './modals/index'
import { generateToast } from './toast'

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

export function readSingleFileUrl({ input, container }, cb) {
  let reader
  if (input.files && input.files[0]) {
    reader = new FileReader()
    reader.onload = function(e) {
      if (cb) {
        cb(e.target.result)
      } else {
        container.style.backgroundImage = `url(${e.target.result})`
      }
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
  readSingleFileUrl({ input: input[0], container: container[0] })
  hidePrimaryModal()
  showSecondaryModal()
}

export function saveProfilePhoto(id, cb) {
  let input = $('.photo-upload-container')
  let data = new FormData()
  let file = input[0].files[0]

  data.append('photo', file, file.name)
  const config = {
    headers: { 'content-type': 'multipart/form-data' },
  }

  return axios
    .post(`/api/photo/${id}`, data, config)
    .then(res => {
      if (res.status === 200) {
        cb()
        generateToast('success', 'Photo Saved', 'Cheers! Your profile photo has been saved successfully.')
        changeProfilePicture(res.data)
      }
    })
    .catch(err => console.log('ERR: ', err))
}

export function changeProfilePicture(name) {
  let container = $('.edit-profile-photo')
  container.css('background-image', `url('/images/users/${name}')`)
  hideSecondaryModal()
  showPrimaryModal()
}
