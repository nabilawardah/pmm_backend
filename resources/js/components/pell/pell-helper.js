import striptags from 'striptags'

// Generate icons for custom handler and others
export function generateIcon(name) {
  switch (name) {
    case 'paragraph':
      return `
      <svg viewBox="0 0 18 18">
        <path d="M9.39648438,15.8535156 L9.39648438,3.29199219 L11.0664062,3.29199219 L11.0664062,15.8535156 L12.7451172,15.8535156 L12.7451172,2 L8.17480469,2 C6.91503906,2 5.90429688,2.33984375 5.14257812,3.01953125 C4.38085938,3.69921875 4,4.59570312 4,5.70898438 C4,6.75195312 4.32373047,7.59423828 4.97119141,8.23583984 C5.61865234,8.87744141 6.54296875,9.27148438 7.74414062,9.41796875 L7.74414062,9.41796875 L7.74414062,15.8535156 L9.39648438,15.8535156 Z" fill="currentColor" class="pell-fill" fill-rule="nonzero"></path>
      </svg>
      `

    case 'bold':
      return `
        <svg viewbox="0 0 18 18" fill="none">
          <path class="pell-stroke" d="M5,4H9.5A2.5,2.5,0,0,1,12,6.5v0A2.5,2.5,0,0,1,9.5,9H5A0,0,0,0,1,5,9V4A0,0,0,0,1,5,4Z"></path>
          <path class="pell-stroke" d="M5,9h5.5A2.5,2.5,0,0,1,13,11.5v0A2.5,2.5,0,0,1,10.5,14H5a0,0,0,0,1,0,0V9A0,0,0,0,1,5,9Z"></path>
        </svg>
      `

    case 'media':
      return `
        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 640 512"><path class="pell-fill" fill="currentColor" d="M608 0H160a32 32 0 0 0-32 32v96h160V64h192v320h128a32 32 0 0 0 32-32V32a32 32 0 0 0-32-32zM232 103a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9V73a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm352 208a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-30a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm0-104a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9v-30a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm0-104a9 9 0 0 1-9 9h-30a9 9 0 0 1-9-9V73a9 9 0 0 1 9-9h30a9 9 0 0 1 9 9zm-168 57H32a32 32 0 0 0-32 32v288a32 32 0 0 0 32 32h384a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32zM96 224a32 32 0 1 1-32 32 32 32 0 0 1 32-32zm288 224H64v-32l64-64 32 32 128-128 96 96z"></path></svg>
      `

    case 'header-1':
      return `
        <svg viewBox="0 0 18 18">
          <path class="pell-fill" d="M10,4V14a1,1,0,0,1-2,0V10H3v4a1,1,0,0,1-2,0V4A1,1,0,0,1,3,4V8H8V4a1,1,0,0,1,2,0Zm6.06787,9.209H14.98975V7.59863a.54085.54085,0,0,0-.605-.60547h-.62744a1.01119,1.01119,0,0,0-.748.29688L11.645,8.56641a.5435.5435,0,0,0-.022.8584l.28613.30762a.53861.53861,0,0,0,.84717.0332l.09912-.08789a1.2137,1.2137,0,0,0,.2417-.35254h.02246s-.01123.30859-.01123.60547V13.209H12.041a.54085.54085,0,0,0-.605.60547v.43945a.54085.54085,0,0,0,.605.60547h4.02686a.54085.54085,0,0,0,.605-.60547v-.43945A.54085.54085,0,0,0,16.06787,13.209Z"/>
        </svg>
      `

    case 'header-2':
      return `
        <svg viewBox="0 0 18 18">
          <path class="pell-fill" d="M16.73975,13.81445v.43945a.54085.54085,0,0,1-.605.60547H11.855a.58392.58392,0,0,1-.64893-.60547V14.0127c0-2.90527,3.39941-3.42187,3.39941-4.55469a.77675.77675,0,0,0-.84717-.78125,1.17684,1.17684,0,0,0-.83594.38477c-.2749.26367-.561.374-.85791.13184l-.4292-.34082c-.30811-.24219-.38525-.51758-.1543-.81445a2.97155,2.97155,0,0,1,2.45361-1.17676,2.45393,2.45393,0,0,1,2.68408,2.40918c0,2.45312-3.1792,2.92676-3.27832,3.93848h2.79443A.54085.54085,0,0,1,16.73975,13.81445ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/>
        </svg>
      `

    case 'header-3':
      return `
        <svg viewBox="0 0 18 18">
          <path class="pell-fill" d="M16.65186,12.30664a2.6742,2.6742,0,0,1-2.915,2.68457,3.96592,3.96592,0,0,1-2.25537-.6709.56007.56007,0,0,1-.13232-.83594L11.64648,13c.209-.34082.48389-.36328.82471-.1543a2.32654,2.32654,0,0,0,1.12256.33008c.71484,0,1.12207-.35156,1.12207-.78125,0-.61523-.61621-.86816-1.46338-.86816H13.2085a.65159.65159,0,0,1-.68213-.41895l-.05518-.10937a.67114.67114,0,0,1,.14307-.78125l.71533-.86914a8.55289,8.55289,0,0,1,.68213-.7373V8.58887a3.93913,3.93913,0,0,1-.748.05469H11.9873a.54085.54085,0,0,1-.605-.60547V7.59863a.54085.54085,0,0,1,.605-.60547h3.75146a.53773.53773,0,0,1,.60547.59375v.17676a1.03723,1.03723,0,0,1-.27539.748L14.74854,10.0293A2.31132,2.31132,0,0,1,16.65186,12.30664ZM9,3A.99974.99974,0,0,0,8,4V8H3V4A1,1,0,0,0,1,4V14a1,1,0,0,0,2,0V10H8v4a1,1,0,0,0,2,0V4A.99974.99974,0,0,0,9,3Z"/>
        </svg>
      `

    case 'divider':
      return `
        <svg viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.75,8.25 C8.16421356,8.25 8.5,8.58578644 8.5,9 C8.5,9.41421356 8.16421356,9.75 7.75,9.75 L3.25,9.75 C2.83578644,9.75 2.5,9.41421356 2.5,9 C2.5,8.58578644 2.83578644,8.25 3.25,8.25 L7.75,8.25 Z M14.75,8.25 C15.1642136,8.25 15.5,8.58578644 15.5,9 C15.5,9.41421356 15.1642136,9.75 14.75,9.75 L10.25,9.75 C9.83578644,9.75 9.5,9.41421356 9.5,9 C9.5,8.58578644 9.83578644,8.25 10.25,8.25 L14.75,8.25 Z"
            class="pell-fill"></path>
        </svg>
      `

    case 'ol':
      return `
        <svg viewbox="0 0 18 18">
          <line class="pell-stroke" x1="7" x2="15" y1="4" y2="4"></line>
          <line class="pell-stroke" x1="7" x2="15" y1="9" y2="9"></line>
          <line class="pell-stroke" x1="7" x2="15" y1="14" y2="14"></line>
          <line class="pell-stroke pell-thin" x1="2.5" x2="4.5" y1="5.5" y2="5.5"></line>
          <path class="pell-fill" d="M3.5,6A0.5,0.5,0,0,1,3,5.5V3.085l-0.276.138A0.5,0.5,0,0,1,2.053,3c-0.124-.247-0.023-0.324.224-0.447l1-.5A0.5,0.5,0,0,1,4,2.5v3A0.5,0.5,0,0,1,3.5,6Z"></path>
          <path class="pell-stroke pell-thin" d="M4.5,10.5h-2c0-.234,1.85-1.076,1.85-2.234A0.959,0.959,0,0,0,2.5,8.156"></path>
          <path class="pell-stroke pell-thin" d="M2.5,14.846a0.959,0.959,0,0,0,1.85-.109A0.7,0.7,0,0,0,3.75,14a0.688,0.688,0,0,0,.6-0.736,0.959,0.959,0,0,0-1.85-.109"></path>
        </svg>
      `

    case 'ul':
      return `
        <svg viewbox="0 0 18 18" fill="none">
          <line class="pell-stroke" x1="6" x2="15" y1="4" y2="4"></line>
          <line class="pell-stroke" x1="6" x2="15" y1="9" y2="9"></line>
          <line class="pell-stroke" x1="6" x2="15" y1="14" y2="14"></line>
          <line class="pell-stroke" x1="3" x2="3" y1="4" y2="4"></line>
          <line class="pell-stroke" x1="3" x2="3" y1="9" y2="9"></line>
          <line class="pell-stroke" x1="3" x2="3" y1="14" y2="14"></line>
        </svg>
      `

    case 'italic':
      return `
        <svg viewbox="0 0 18 18">
          <line class="pell-stroke" x1="7" x2="13" y1="4" y2="4"></line>
          <line class="pell-stroke" x1="5" x2="11" y1="14" y2="14"></line>
          <line class="pell-stroke" x1="8" x2="10" y1="14" y2="4"></line>
        </svg>
      `

    case 'underline':
      return `
        <svg viewbox="0 0 18 18">
          <path class="pell-stroke" d="M5,3V9a4.012,4.012,0,0,0,4,4H9a4.012,4.012,0,0,0,4-4V3"></path>
          <rect class="pell-fill" height="1" rx="0.5" ry="0.5" width="12" x="3" y="15"></rect>
        </svg>
      `

    case 'quote':
      return `
        <svg viewbox="0 0 18 18">
          <rect class="pell-fill pell-stroke" height="3" width="3" x="4" y="5"></rect>
          <rect class="pell-fill pell-stroke" height="3" width="3" x="11" y="5"></rect>
          <path class="pell-even pell-fill pell-stroke" d="M7,8c0,4.031-3,5-3,5"></path>
          <path class="pell-even pell-fill pell-stroke" d="M14,8c0,4.031-3,5-3,5"></path>
        </svg>
      `

    case 'link':
      return `
        <svg viewbox="0 0 18 18" fill="none">
          <line class="pell-stroke" x1="7" x2="11" y1="7" y2="11"></line>
          <path class="pell-even pell-stroke" d="M8.9,4.577a3.476,3.476,0,0,1,.36,4.679A3.476,3.476,0,0,1,4.577,8.9C3.185,7.5,2.035,6.4,4.217,4.217S7.5,3.185,8.9,4.577Z"></path>
          <path class="pell-even pell-stroke" d="M13.423,9.1a3.476,3.476,0,0,0-4.679-.36,3.476,3.476,0,0,0,.36,4.679c1.392,1.392,2.5,2.542,4.679.36S14.815,10.5,13.423,9.1Z"></path>
        </svg>
      `

    case 'image':
      return `
        <svg viewbox="0 0 18 18" fill="none">
          <rect class="pell-stroke" height="10" width="12" x="3" y="4"></rect>
          <circle class="pell-fill" cx="6" cy="7" r="1"></circle>
          <polyline class="pell-even pell-fill" points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"></polyline>
        </svg>
      `

    case 'clear':
      return `
      <svg viewbox="0 0 18 18">
        <line class="pell-stroke" x1="5" x2="13" y1="3" y2="3"></line>
        <line class="pell-stroke" x1="6" x2="9.35" y1="12" y2="3"></line>
        <line class="pell-stroke" x1="11" x2="15" y1="11" y2="15"></line>
        <line class="pell-stroke" x1="15" x2="11" y1="11" y2="15"></line>
        <rect class="pell-fill" height="1" rx="0.5" ry="0.5" width="7" x="2" y="14"></rect>
      </svg>`

    default:
      break
  }
}

// Remove format when pasting text to article title content-editable
export function removeFormatTitle(event, element) {
  let clipboardData
  event.stopPropagation()
  event.preventDefault()

  clipboardData = event.clipboardData || window.clipboardData
  element.innerText = clipboardData.getData('Text')
}

export function checkTitleState(element) {
  if (element.text().trim() === '' || element.html().trim() === '') {
    // console.log('EMPTY: ', element)
    element.addClass('empty')
  } else {
    element.removeClass('empty')
  }
}

export function cleanupEverything(text) {
  text = striptags(text, []) // remove all html except the listed tags

  let wrapper = document.createElement('div')
  wrapper.innerHTML = text

  let allChildren = wrapper.getElementsByTagName('*')
  for (let index = 0; index < allChildren.length; index++) {
    const element = allChildren[index]
    element.removeAttribute('id')
    element.removeAttribute('class')
    element.removeAttribute('style')
  }

  return wrapper.innerText
}

export function cleanupAttributes(text) {
  text = striptags(text, ['h3', 'h2', 'h1', 'a', 'p', 'br', 'ul', 'ol', 'li'])

  let wrapper = document.createElement('div')
  wrapper.innerHTML = text

  let allChildren = wrapper.getElementsByTagName('*')
  for (let index = 0; index < allChildren.length; index++) {
    const element = allChildren[index]
    element.removeAttribute('id')
    element.removeAttribute('class')
    element.removeAttribute('style')
  }

  return wrapper.innerHTML
}
