window.ENV = window.ENV || {};

window.ENV.API_HOST = window.localStorage.API_HOST || window.ENV.HOST;
window.ENV.API_NAMESPACE = 'api/v1';

window.ENV.canvasUserId = window.ENV.custom_canvas_user_id;

module.exports = window.ENV;
