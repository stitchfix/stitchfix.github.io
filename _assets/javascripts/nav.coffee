window.StitchFix ||= {}
window.StitchFix.Nav =
  init: ->
    $('body').scrollspy({ target: '.top-nav', offset: 100 })
    $('.top-nav').on 'activate.bs.scrollspy', (e)->
      target = $(e.target).children('a').attr('href')
      if target == '#intro'
        $('.top-nav').removeClass('nav-trans')
      else
        $('.top-nav').addClass('nav-trans')


$ ->
  window.StitchFix.Nav.init()