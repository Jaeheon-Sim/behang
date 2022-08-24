const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    `/v1`,
    createProxyMiddleware({
      target: `http://35.247.33.79:8080`,
      changeOrigin: true,
    })
  );
  app.use(
    `/locationBasedList`,
    createProxyMiddleware({
      target: `http://apis.data.go.kr/B551011/KorService`,
      changeOrigin: true,
    })
  );
};
