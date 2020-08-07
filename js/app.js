$(window).load(function(){
  $("body").keydown(function(e) {
    // left
    if(e.keyCode == 37) {
      var preList = $('previous');
      if(preList.length != 0){
        preList[0].click();
      }
    }
    // right
    if(e.keyCode == 39) {
      var nextList = $('next');
      if(nextList.length != 0){
        nextList[0].click();
      }
    }
  });
});