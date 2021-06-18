const path = require('path');
const consola = require('consola').withTag('nuxt-microcms-module');

module.exports = function (moduleOptions) {
  const options = {
    ...this.options.microcms,
    ...moduleOptions,
    client: {
      ...this.options.microcms.client,
      ...moduleOptions.client,
    },
  };

  this.addPlugin({
    src: path.resolve(__dirname, 'plugin.js'),
    fileName: 'microcms.js',
    options,
  });

  this.nuxt.hook('build:before', async () => {
    if (options.client.globalDraftKey && process.env.DANGEROUSLY_SET_MICROCMS_GLOBAL_DRAFT_KEY !== 'true') {
      consola.fatal(`globalDraftKey が入力されいるため、すべての下書き記事が閲覧できる危険なビルドです。
危険性を理解している場合は、\n環境変数 DANGEROUSLY_SET_MICROCMS_GLOBAL_DRAFT_KEY=true を設定して再実行してください。`);
    }
  });

  this.nuxt.hook('generate:before', async () => {
    if (options.client.globalDraftKey && process.env.DANGEROUSLY_SET_MICROCMS_GLOBAL_DRAFT_KEY !== 'true') {
      consola.fatal(`globalDraftKey が入力されいるため、すべての下書き記事が閲覧できる危険な生成です。
危険性を理解している場合は、\n環境変数 DANGEROUSLY_SET_MICROCMS_GLOBAL_DRAFT_KEY=true を設定して再実行してください。`);
    }
  });
};

module.exports.meta = require('../package.json');
