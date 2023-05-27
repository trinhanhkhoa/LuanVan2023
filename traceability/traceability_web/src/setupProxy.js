const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/signin',
    createProxyMiddleware({
      target: 'http://backend.teamluanvan.software',
      changeOrigin: true,
    })
  );
};
