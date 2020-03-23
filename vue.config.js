module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www-local.comic.com/api',
        ws: true,
        changeOrigin: true,
        autoRewrite: true,
        cookieDomainRewirte: true,
        publicPath:"/",
        pathRewrite: {
          '^/api/': '/'
        }
      }
    }
  }
}