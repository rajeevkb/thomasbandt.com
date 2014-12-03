var routes = require("../../../routes"),
    routeUtilities = require("../../utilities/routeUtilities");

module.exports = {
    init: init
};

function init(app) {
    app.get(routes.admin.logout, function(request, response) {
        request.logout();
        response.redirect(routes.admin.login);
    });
}