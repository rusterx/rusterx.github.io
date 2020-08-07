$(window).load(function(){
  $(document).keydown(function(e) {
    // left
    if(e.keyCode == 37) {
      var preList = $('previous');
      if(preList.length != 0){
        var path = $(preList[0]).attr('href');
        window.location = 'https://xingtingyang.com' + path;
      }
    }
    // right
    if(e.keyCode == 39) {
      var nextList = $('next');
      console.log(nextList.length);
      if(nextList.length != 0){
        var path = $(nextList[0]).attr('href');
        window.location = 'https://xingtingyang.com' + path;
      }
    }
  });
});