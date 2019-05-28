/**
 * Helper functions that help process posts
 *
 * @example
*     <%- list_updated_posts() %>
*     <%- list_updated_tags(url) %>
*     <%- list_updated_categories() %>
*     <%- list_updated_archives() %>
 */


const { execSync } = require('child_process');


module.exports = function (hexo) {
    let Post = hexo.model('Post')
    let _posts = [];
    let _categoreis = []
    let _tags = []

    const _get_list = (data) => {
        const res = []
        if (data && data.length > 0) {
            docs = data['data']
            for (i in docs) {
                d = docs[i]
                res.push(d['name'])
            }
        }
        return res
    }

    const _merge_tags = (data) => {
        _tags = [... new Set(_tags.concat(_get_list(data)))]
        return _tags
    }

    const _merge_categories = (data) => {
        _categoreis = [... new Set(_categoreis.concat(_get_list(data)))]
        return _categoreis
    }

    hexo.extend.helper.register('list_updated_posts', function (link) {
        if (_posts.length == 0) {
            process.chdir("source")
            const res = execSync("git diff --name-only --cached").toString('utf8');
            process.chdir("..")

            const paths = res.split("\n").filter((p)=>(p.length > 0))
            _posts = paths
        }
        return _posts
    });

    hexo.extend.helper.register('list_updated_categories', function (link) {
        if (_categoreis.length == 0) {
            const _list_updated_posts = hexo.extend.helper.get('list_updated_posts').bind(this)
            const updated_posts = _list_updated_posts();

            if (updated_posts.length > 0) {
                for (const path of updated_posts) {
                    let post = Post.findOne({source: path})
                    if (post) {
                        _merge_categories(post.categories);
                    }
                }
            }
        }
        return _categoreis
    });

    hexo.extend.helper.register('list_updated_tags', function (link) {
        if (_tags.length == 0) {
            const _list_updated_posts = hexo.extend.helper.get('list_updated_posts').bind(this)
            const updated_posts = _list_updated_posts();

            if (updated_posts.length > 0) {
                for (const path of updated_posts) {
                    let post = Post.findOne({source: path})
                    if (post) {
                        _merge_tags(post.tags);
                    }
                }
            }
        }
        return _tags
    });

}
