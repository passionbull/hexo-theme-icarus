/*
  Figure out the posts, tags, categories and archives that needs to be updated

  @deprecated this module is deprecated to process the posts to find the impacted tags and categories
*/

let postProcessor = require(`hexo/lib/plugins/processor/post`)

module.exports = function (hexo) {

  hexo.extend.processor.register('_posts/*.md', (file, done) => {
    if (!hexo.config.incremental)
      return

    const _list_updated_posts = hexo.extend.helper.get('list_updated_posts').bind(this)
    const updated_posts = _list_updated_posts();
    const {params, path, type} = file;

    if (updated_posts && updated_posts.length > 0 && updated_posts.indexOf(path) != -1) {
      // don't skip it in `postProcessor`
      if (type === 'skip') {
        delete file.type
      }

      const pp = postProcessor(hexo)

      // give `process` the needed context
      file.params.renderable = true
      file.params.path = path

      const op = pp
        .process(file)
        .then(res => {
          let post = Post.findOne({source: path})

          // hexo.locals.set('updated_categories', function(){
          //   return _merge_categories(post.categories)
          // });
          // hexo.locals.set('updated_tags', function(){
          //   return _merge_tags(post.tags)
          // });

          // console.log('callback', done)

          // post.save(done)
          // done()
        })
        .catch(err => {
          // done(err)
        })
    }
  })
}
