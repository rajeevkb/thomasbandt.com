var routes = require("../../../routes"),
    data = require("../../../data"),
    markdown = require("markdown").markdown;

module.exports = {
    init: init
};

function init(app) {
    app.get(routes.admin.editPost, function(request, response) {
        data.posts.findOneById(request.params.id).then(function(post) {
            app.renderAdminView(response, "editPost", {
                post: post
            });
        });
    });

    app.post(routes.admin.editPost, function(request, response) {
        var post = {
            id: request.params.id,
            title: request.body.title,
            abstract: request.body.abstract,
            content: request.body.content,
            contentHtml: markdown.toHTML(request.body.content),
            published: request.body.published === "on"
        };

        data.posts.update(post).done(function() {
            request.flash("post-saved", "Blog Post successfully updated.");
            response.redirect(routes.admin.overview);
        });
    });
}
