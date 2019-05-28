(function($){
    function resize(frame) {
        const body = frame.contentWindow.document.body;
        // iframes[i].style.height = iframes[i].contentWindow.document.body.offsetHeight + 'px';
        // iframes[i].contentWindow.document.body.style.width = iframes[i].offsetWidth + 'px';
        // console.log("before resized", $(body).width(), $(frame).height());
        $(body).width($(frame).width());
        $(frame).height($(body).height());
        $(body).show();
        // console.log('resized', frame, body);
    }

    function resizeAll() {
        const iframes = $('iframe');
        iframes.each(function() {
            resize(this);
        })
    }

    // function add_dom_mutation_observer(frame, selector, func) {
    //     const observer = new MutationObserver(function(mutations){
    //       for (var i=0; i < mutations.length; i++){
    //         for (var j=0; j < mutations[i].addedNodes.length; j++){
    //           // We're iterating through _all_ the elements as the parser parses them,
    //           // deciding if they're the one we're looking for.
    //           if (mutations[i].addedNodes[j].matches(selector)){
    //             func();

    //             // We found our element, we're done:
    //             observer.disconnect();
    //           };
    //         }
    //       }
    //     });
    //     observer.observe(frame.contentWindow.document.documentElement, {
    //       childList: true,
    //       subtree: true
    //     });
    // }

    function add_dom_render_observer(frame, selector, func) {
        const i = setInterval(function(){
            if ($(selector, frame.contentWindow.document).length != 0) {
                func();
                clearInterval(i);
            }
        }, 100);
    }


    function add_resize_listeners() {
        const iframes = $('iframe');
        // iframes.on("load", resizeAll);
        iframes.each(function(index) {
            // $(this.contentWindow.document).ready(() => {
            //     console.log("ready", this);
            //     resize(this);
            // })
            $(this).on('load', () => {
                console.log("loaded", this);
                resize(this);
            })
            add_dom_render_observer(this, "#content", () => {
                console.log("rendered", this);
                resize(this);
            })
        })
        $(window).on("resize", resizeAll);
    }

    add_resize_listeners()

    // $(document).ready(function(){
    //     resize();
    // });

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
