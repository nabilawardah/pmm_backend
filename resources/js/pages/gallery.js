// import lazyload from 'lazyload'
import LazyLoad from 'vanilla-lazyload'
import { showModal } from '../components/modals/base-modal'
import axios from 'axios'
import { generateTemporaryPlaceholder, VALID_VIDEOS, generateThumbnail } from '../components/gallery'
import slick from 'slick-carousel'

$(function() {
  let lazyloadInstance = new LazyLoad({ elements_selector: '.lazy', threshold: 2000 })

  $(document).on('click', '.add-new-gallery-item', showAddNewGalleryItem)
  $(document).on('click', '.add-new-album', showAddNewAlbum)

  $(document).on('click', '.trigger-upload-gallery-item', triggerUploadGalleryItem)
  $('input.upload-gallery-item-input').on('change', uploadGalleryItem)

  $(document).on('click', '.upload-gallery-item-remove', removeGalleryItem)

  $(document).on('click', '.trigger-embed-gallery-item', handleEmbed)
  $(document).on('click', '.publish-photos-videos', handlePublishGalleryItem)

  $(document).on('click', '.gallery-item', function() {
    let el = $(this)
    let index = el.data('index')
    let slickContainer = $('.slick-fullscreen-wrapper')
    slickContainer.fadeIn(250)
    $('.slick-fullscreen').slick('slickGoTo', index, true)
  })

  $(document).on('click', '.slick-close', function() {
    let slickContainer = $('.slick-fullscreen-wrapper')
    let currentIndex = $('.slick-fullscreen').slick('slickCurrentSlide')
    let el = $('.gallery-container').find(`[data-index=${currentIndex}]`)
    el[0].focus()
    el[0].scrollIntoView()
    slickContainer.fadeOut(250)
  })

  const slickConfig = {
    infinite: false,
    lazyLoad: 'ondemand',
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: $('.slick-prev'),
    nextArrow: $('.slick-next'),
  }

  $('[data-lazy],[data-poster]').each(function() {
    let $el = $(this)

    if (this.tagName.match(/img/gi)) {
      $el.attr('src', $el.data('lazy'))
    }

    if (this.tagName.match(/video/gi)) {
      let $videoSrc = $el.find('source')

      $el.attr('poster', $el.data('poster'))
      $videoSrc.each(function() {
        $(this).attr('src', $(this).data('lazy'))
      })
    }
  })

  $('.slick-fullscreen').on('init', function(event, slick) {
    let slide = $.map(slick.$slides, function(slide, index) {
      if ($(slide).hasClass('slick-current')) return slide
    })
    let $slide = $(slide)
      .children()
      .first()

    if ($slide.length > 0) {
      if ($slide.get(0).tagName.match(/video/gi)) {
        $slide.load()
        $slide.get(0).play()
      }
    }
  })

  $('.slick-fullscreen').slick(slickConfig)

  $('.slick-fullscreen').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
    let $elNext = $(slick.$slides[nextSlide])
        .children()
        .first(),
      $elCur = $(slick.$slides[currentSlide])
        .children()
        .first()

    if ($elNext.length > 0) {
      if ($elNext.get(0).tagName.match(/video/gi)) {
        $elNext.load()
        $elNext.get(0).play()
      }
    }

    if ($elCur.length > 0) {
      if ($elCur.get(0).tagName.match(/video/gi)) {
        $elCur.get(0).pause()
      }
    }

    $('.slick-current iframe').attr('src', $('.slick-current iframe').attr('src'))

    let player = $('.slick-current video')
    if (player.length > 0) {
      player[0].pause()
    }
  })
})

function showAddNewAlbum() {
  showModal('#add-new-album')
}

function showAddNewGalleryItem() {
  showModal('#add-new-gallery-item')
}

function triggerUploadGalleryItem() {
  let el = $(this)
  let container = el.parents('section.upload-gallery-item')
  let input = container.find('input.upload-gallery-item-input')
  input.trigger('click')
}

function uploadGalleryItem() {
  let container = $('#upload-gallery-item-outer-wrapper')
  let el = $(this)
  let files = el[0].files
  if (files.length > 0) {
    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      let reader = new FileReader()
      reader.onload = function(e) {
        let url = e.target.result
        let image = document.createElement('IMG')
        image.src = url
        image.onload = console.log(image)
      }
      reader.readAsDataURL(file)

      let userId = $('#user-id').val()
      let data = new FormData()
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
      }
      data.append('gallery', file)
      data.append('type', file.type)

      setTimeout(() => {
        axios
          .post(`/api/gallery/${userId}`, data, config)
          .then(res => {
            if (res.status === 200) {
              console.log('RES: ', res.data)
              let gallerySection = generateTemporaryPlaceholder({
                file,
                name: res.data.name,
                src: res.data.url,
                fileType: res.data.type,
              })
              $(gallerySection)
                .appendTo(container)
                .hide()
                .slideDown(500)

              // If the file is video
              if ($.inArray(res.data.type, VALID_VIDEOS) >= 0) {
                generateThumbnail()
              }
            }
          })
          .catch(err => console.log('ERROR UPLOADING GALLERY ITEM: ', err))
      }, 3000)
    }
  }
}

function removeGalleryItem() {
  let el = $(this)
  let container = el.parents('li.upload-gallery-item-container')
  container.slideUp(300)
  setTimeout(() => {
    container.remove()
  }, 300)
}

function handleEmbed() {
  let input = $('input#embed-gallery-item-link')
  let url = input.val()

  let container = $('#upload-gallery-item-outer-wrapper')
  let iframeSection = generateTemporaryPlaceholder({ src: url, external: true })
  $(iframeSection)
    .appendTo(container)
    .hide()
    .slideDown(500)
  input.val('')
}

function handlePublishGalleryItem() {
  let galleryItems = []
  let items = document
    .querySelector('#upload-gallery-item-outer-wrapper')
    .querySelectorAll('.upload-gallery-item-container')
  let userId = $('#user-id').val()

  items.forEach(item => {
    let data = {
      attribute: {},
    }
    let el = $(item)
    let thumbnailContainer = el.find('.gallery-item-video-thumbnail')
    let thumbnail
    if (thumbnailContainer.length > 0) {
      thumbnail = JSON.parse($(thumbnailContainer[0]).val()).name
    } else {
      thumbnail = ''
    }

    data.author = userId
    data.caption = el.find('.input-gallery-caption').val()
    data.attribute.type = el.data('type')
    data.attribute.origin = el.data('origin')
    data.attribute.filetype = el.data('filetype')
    data.attribute.src = el.data('src')
    data.attribute.thumbnail = thumbnail

    galleryItems.push(data)
  })

  if (galleryItems.length > 0) {
    console.log('ITEMS: ', galleryItems)
    axios
      .post(`/api/gallery/post/${userId}`, { data: galleryItems })
      .then(res => {
        if (res.status === 200) {
          console.log(res.data)
          window.location.reload()
        }
      })
      .catch(err => console.log('ERR POST:', err))
  }
}
