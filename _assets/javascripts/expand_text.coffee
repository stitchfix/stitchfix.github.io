window.StitchFix ||= {}
window.StitchFix.ExpandText =
  init: ->
    $('.read-more a').click (e)->
      e.preventDefault();
      console.dir($(e.target).parent())
      $(e.target).parents('.expandable').css( { maxHeight: 'inherit' })
      $(e.target).parents('.read-more').hide()

$ ->
  window.StitchFix.ExpandText.init()