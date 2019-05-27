(function($){
    var iFrames = $('iframe');
    function iResize() {
      for (var i = 0, j = iFrames.length; i < j; i++) {
        var frame = iFrames[i]
        var body = frame.contentWindow.document.body
        // iFrames[i].style.height = iFrames[i].contentWindow.document.body.offsetHeight + 'px';
        // iFrames[i].contentWindow.document.body.style.width = iFrames[i].offsetWidth + 'px';
        $(body).width($(frame).width())
        $(frame).height($(body).height())
      }
    }

    iFrames.on("load", function(){
      setTimeout(iResize, 0);
    });

    // if ($.browser.webkit || $.browser.opera) {
    //   iFrames.load(function(){
    //     setTimeout(iResize, 0);
    //   });

    //   for (var i = 0, j = iFrames.length; i < j; i++) {
    //     var iSource = iFrames[i].src;
    //     iFrames[i].src = '';
    //     iFrames[i].src = iSource;
    //   }
    // } else {
    //   iFrames.load(function() {
    //     this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
    //   });
    // }
})(jQuery);
