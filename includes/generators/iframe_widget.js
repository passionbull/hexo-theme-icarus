/**
 * Tag list page generator
 */
module.exports = function (hexo) {
  hexo.extend.generator.register('widget', function (locals) {
    const widgets = hexo.extend.helper.get('get_config').bind(this)('widgets');
    const iframe_widgets = widgets.filter((w) => (w.iframe))

    return iframe_widgets.map(function(widget){
      return {
        path: `widgets/${widget.type}.html`,
        layout: 'component/iframe_widget_src',
        data: {
          widget: widget,
          __widget: true
        }
      };
    });
  });
}
