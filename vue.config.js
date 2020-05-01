module.exports = {
  transpileDependencies: ['vuetify'],
  outputDir: './docs',
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  pluginOptions: {
    i18n: {
      locale: 'zh-TW',
      fallbackLocale: 'zh-TW',
      localeDir: 'locales',
      enableInSFC: true,
    },
  },
};
