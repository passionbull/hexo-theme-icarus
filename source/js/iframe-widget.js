(function($){
    var iframes = $('iframe');
    function resize() {
      for (var i = 0, j = iframes.length; i < j; i++) {
        var frame = iframes[i];
        var body = frame.contentWindow.document.body;
        // iframes[i].style.height = iframes[i].contentWindow.document.body.offsetHeight + 'px';
        // iframes[i].contentWindow.document.body.style.width = iframes[i].offsetWidth + 'px';
        // console.log("before resized", $(body).width(), $(frame).height());
        $(body).width($(frame).width());
        $(frame).height($(body).height());
        $(body).show();
        // console.log("after resized", $(body).width(), $(frame).height());
      }
    }

    // resize();

    iframes.on("load", function(){
      setTimeout(resize, 0);
      $(window).on("resize", resize);
    });

    $(document).ready(resize);

    // if ($.browser.webkit || $.browser.opera) {
    //   iframes.load(function(){
    //     setTimeout(resize, 0);
    //   });

    //   for (var i = 0, j = iframes.length; i < j; i++) {
    //     var iSource = iframes[i].src;
    //     iframes[i].src = '';
    //     iframes[i].src = iSource;
    //   }
    // } else {
    //   iframes.load(function() {
    //     this.style.height = this.contentWindow.document.body.offsetHeight + 'px';
    //   });
    // }
})(jQuery);
