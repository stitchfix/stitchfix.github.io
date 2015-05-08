window.StitchFix ||= {}
window.StitchFix.Nav =
  init: ->
    navHeight = $('.top-nav').height()

    $('.js-scrolling-nav a').click (e)->
      $('html, body').animate
        scrollTop: $( $.attr(this, 'href') ).offset().top - navHeight,
        500

    $('body.home').scrollspy({ target: '.top-nav .js-scrollspy', offset: 200 })

    $('.top-nav .js-scrollspy').on 'activate.bs.scrollspy', (e)->
      target = $(e.target).children('a').attr('href')
      if target == '#intro'
        $('.top-nav').removeClass('nav-trans')
      else
        $('.top-nav').addClass('nav-trans')

$ ->
  window.StitchFix.Nav.init()