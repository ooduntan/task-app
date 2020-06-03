const path = require('path');
module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        "@components": path.resolve(__dirname, 'src/components/'),
        "@containers": path.resolve(__dirname, 'src/containers/'),
      }
    }
  },
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    port: process.env.PORT || 8081,
  }
}