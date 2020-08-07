$(window).load(function(){
  $(document).keydown(function(e) {
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
      console.log(nextList.length);
      if(nextList.length != 0){
        console.log(nextList[0]);
        nextList[0].click();
      }
    }
  });
});