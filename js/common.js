$(document).ready(function(){
    $(".description a").click(function(event){   
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top -20}, 700);
    });

});

konami = new Konami();
konami.load();

konami.code = function(){
  if ( $("body").attr("id") == "lynx-fuck-yeah") {
    $('body').attr('id','');
  }
  else {
    $('body').attr('id','lynx-fuck-yeah');
  }
}

konami.iphone.code = function(){
  $("body").attr('id', 'lynx-fuck-yeah');
}
