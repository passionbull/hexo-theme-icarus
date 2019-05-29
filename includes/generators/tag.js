'use strict';

const pagination = require('hexo-pagination');

module.exports = function (hexo) {
    // ATTENTION: This will override the default tag generator!
    hexo.extend.generator.register('tag', function(locals) {
      const config = this.config;
      const perPage = config.tag_generator.per_page;
      const paginationDir = config.pagination_dir || 'page';
      const list_updated_tags = hexo.extend.helper.get('list_updated_tags').bind(this)
      const tags = locals.tags;
      let tagDir;

      function needs_update(tag) {
        if (config.incremental) {
          // in incremental mode, update the affected tag pages only
          const updated_tags = list_updated_tags();
          if (updated_tags && updated_tags.length > 0
              && updated_tags.indexOf(tag['name']) != -1) {
              return true;
          }
          return false;
        }
        return true;
      }


      const pages = tags.reduce((result, tag) => {
        if (!tag.length) return result;

        if (! needs_update(tag)) {
            return result;
        }

        const posts = tag.posts.sort('-date');
        const data = pagination(tag.path, posts, {
          perPage: perPage,
          layout: ['tag', 'archive', 'index'],
          format: paginationDir + '/%d/',
          data: {
            tag: tag.name
          }
        });

        return result.concat(data);
      }, []);

      // generate tag index page, usually /tags/index.html
      if (config.tag_generator.enable_index_page) {
        tagDir = config.tag_dir;
        if (tagDir[tagDir.length - 1] !== '/') {
          tagDir += '/';
        }

        pages.push({
          path: tagDir,
          layout: ['tag-index', 'tag', 'archive', 'index'],
          posts: locals.posts,
          data: {
            base: tagDir,
            total: 1,
            current: 1,
            current_url: tagDir,
            posts: locals.posts,
            prev: 0,
            prev_link: '',
            next: 0,
            next_link: '',
            tags: tags
          }
        });
      }

      return pages;
    });
}
