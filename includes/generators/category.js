const pagination = require('hexo-pagination');

module.exports = function (hexo) {
    // ATTENTION: This will override the default category generator!
    hexo.extend.generator.register('category', function(locals) {
        const config = this.config;
        const perPage = config.category_generator.per_page;
        const paginationDir = config.pagination_dir || 'page';
        const list_updated_categories = hexo.extend.helper.get('list_updated_categories').bind(this)

        function findParent(category) {
            let parents = [];
            if (category && category.hasOwnProperty('parent')) {
                const parent = locals.categories.filter(cat => cat._id === category.parent).first();
                parents = [parent].concat(findParent(parent));
            }
            return parents;
        }

        function needs_update(category) {
            if (config.incremental) {
                // in incremental mode, update the affected category pages only
                const updated_categories = list_updated_categories();
                if (updated_categories && updated_categories.length > 0 &&
                    updated_categories.indexOf(category['name']) != -1) {
                    return true;
                }
                return false;
            }
            return true;
        }

        return locals.categories.reduce(function(result, category){
            if (! needs_update(category)) {
                return result;
            }

            const posts = category.posts.sort('-date');
            const data = pagination(category.path, posts, {
                perPage: perPage,
                layout: ['category', 'archive', 'index'],
                format: paginationDir + '/%d/',
                data: {
                    category: category.name,
                    parents: findParent(category)
                }
            });

            return result.concat(data);
        }, []);
    });
}
