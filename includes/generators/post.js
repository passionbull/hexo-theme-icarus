'use strict';

module.exports = function (hexo) {
    // ATTENTION: This will override the default post generator!
    hexo.extend.generator.register('post', function(locals) {
      let posts = locals.posts.sort('-date').toArray();
      const length = posts.length;
      const list_updated_posts = hexo.extend.helper.get('list_updated_posts').bind(this);

      function filter_posts(posts) {
        if (hexo.config.incremental) {
          // in incremental mode, update the affected archive pages only
          const updated_posts = list_updated_posts();
          if (updated_posts && updated_posts.length > 0) {
            return posts.filter((p)=>(updated_posts.indexOf(p['source']) != -1));
          }
        }
        return posts;
      }

      if (hexo.config.incremental) {
        posts = filter_posts(posts);
      }

      return posts.map((post, i) => {
        const layout = post.layout;
        const path = post.path;

        if (!layout || layout === 'false') {
          return {
            path,
            data: post.content
          };
        }

        if (i) post.prev = posts[i - 1];
        if (i < length - 1) post.next = posts[i + 1];

        const layouts = ['post', 'page', 'index'];
        if (layout !== 'post') layouts.unshift(layout);

        post.__post = true;

        return {
          path,
          layout: layouts,
          data: post
        };
      });
    });
}


