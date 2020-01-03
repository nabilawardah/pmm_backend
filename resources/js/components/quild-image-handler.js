import axios from 'axios'

export function imageHandler(image, callback) {
  var data = new FormData()
  data.append('image', image)

  var xhr = new XMLHttpRequest()
  xhr.open('POST', IMGUR_API_URL, true)
  xhr.setRequestHeader('Authorization', 'Client-ID ' + IMGUR_CLIENT_ID)
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var response = JSON.parse(xhr.responseText)
      if (response.status === 200 && response.success) {
        callback(response.data.link)
      } else {
        var reader = new FileReader()
        reader.onload = function(e) {
          callback(e.target.result)
        }
        reader.readAsDataURL(image)
      }
    }
  }
  xhr.send(data)
}
