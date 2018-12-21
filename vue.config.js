module.exports = {
  devServer: {
    // proxy: 'http://api.douban.com/v2'
    proxy: {
      '/api': {
        target: 'http://www-local.comic.com/api',
        // target: 'http://47.105.183.104:8001/api',
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