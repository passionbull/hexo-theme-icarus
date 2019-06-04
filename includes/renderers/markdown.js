/*
  The module is created to disable the tag plugins (https://hexo.io/docs/tag-plugins)
  and nunjucks syntax, which causes troubles in parsing markdown often
*/

'use strict';

const markdown_extensions = ['md', 'markdown', 'mkd', 'mkdn', 'mdwn', 'mdtxt', 'mdtext']

module.exports = function (hexo) {

  if (!! hexo.config.disable_tag_plugins) {
    for (let ext of markdown_extensions) {
      let renderer = hexo.render.renderer.get(ext);
      if (renderer) {
        renderer.disableNunjucks = true;
        hexo.extend.renderer.register(ext, 'html', renderer);
      }
    }
  }

}
