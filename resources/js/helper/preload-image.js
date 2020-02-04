// function preloadImages(urls, allImagesLoadedCallback) {
//   var loadedCounter = 0
//   var toBeLoadedNumber = urls.length
//   urls.forEach(function(url) {
//     preloadImage(url, function() {
//       loadedCounter++
//       console.log('Number of loaded images: ' + loadedCounter)
//       if (loadedCounter == toBeLoadedNumber) {
//         allImagesLoadedCallback()
//       }
//     })
//   })
//   function preloadImage(url, anImageLoadedCallback) {
//     var img = new Image()
//     img.onload = anImageLoadedCallback
//     img.src = url
//   }
// }

// // Let's call it:
// preloadImages(['/images/users/default.png', '/images/users/ongki.jpg', '/images/cover.png'], function() {
//   console.log('All images were loaded')
// })
