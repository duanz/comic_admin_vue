module.exports = {
  devServer: {
    // proxy: 'http://api.douban.com/v2'
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8001/api',
        // target: 'http://47.105.183.104/api',
        ws: true,
        changeOrigin: true,
        autoRewrite: true,
        cookieDomainRewirte: true,
        pathRewrite: {
          '^/api/': '/'
        }
      }
    }
  }
}