'use strict';

module.exports = function (hexo) {
    // ATTENTION: This will override the default post generator!
    hexo.extend.generator.register('post', function(locals) {
      let posts = locals.posts.sort('-date').toArray();
      const length = posts.length;
      const list_updated_posts = hexo.extend.helper.get('list_updated_posts').bind(this);

      function needs_update(post) {
        if (hexo.config.incremental) {
          // in incremental mode, update the affected archive pages only
          const updated_posts = list_updated_posts();
          if (updated_posts && updated_posts.length > 0
              && updated_posts.indexOf(post['source']) != -1) {
            return true;
          }
          return false;
        }
        return true;
      }

      return posts.map((post, i) => {
        const layout = post.layout;
        const path = post.path;

        if (!layout || layout === 'false') {
          if (needs_update(post)) {
            return {
              path,
              data: post.content
            };
          } else {
            return {}
          }
        }

        if (i) post.prev = posts[i - 1];
        if (i < length - 1) post.next = posts[i + 1];

        const layouts = ['post', 'page', 'index'];
        if (layout !== 'post') layouts.unshift(layout);

        post.__post = true;

        if (needs_update(post)) {
          return {
            path,
            layout: layouts,
            data: post
          };
        } else {
          return {}
        }
      });
    });
}


