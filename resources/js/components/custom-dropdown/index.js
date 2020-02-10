function toggleDropdown() {
  let trigger = $(this)
  let wrapper = trigger.parents('.custom-dropdown-wrapper')
  let area = wrapper.find('.custom-dropdown-menu-wrapper')
  if (area.hasClass('hidden')) {
    wrapper.addClass('active-popout')
    area.removeClass('hidden')
    area.slideDown(100)
  } else {
    area.slideUp(100)
    area.addClass('hidden')
    wrapper.removeClass('active-popout')
  }
}

export function blurDropdown(e) {
  let active = $('.active-popout')

  if (active.length > 0) {
    let popout = active.find('.popout')
    if (
      !popout.hasClass('hidden') &&
      !$.contains(document.querySelector('.active-popout'), e.target) &&
      !$.contains(document.querySelector('.active-popout').querySelectorAll('li'), e.target) &&
      !$.contains(document.querySelector('.active-popout').querySelectorAll('a'), e.target)
    ) {
      popout.addClass('hidden').hide()
      // console.log(popout.parents('.active-popout'))
      popout.parents('.active-popout').removeClass('active-popout')
    }
  }
}

$(function() {
  $(document).on('click', '.custom-dropdown-trigger', toggleDropdown)
  $(document).on('click', blurDropdown)
})
