# nuxt-microcms-module

Nuxt.js プロジェクトで [microCMS](https://microcms.io/) を利用するためのモジュール  


## はじめる

### インストール

```bash
$ npm install -S microcms-js-sdk nuxt-microcms-module

# OR

$ yarn add microcms-js-sdk nuxt-microcms-module
```


### セットアップ

```js
// nuxt.config.js

export default {
  modules: ['nuxt-microcms-module'],

  microcms: {
    // 参考 https://github.com/wantainc/microcms-js-sdk#how-to-use
    client: {
      serviceDomain: "YOUR_DOMAIN", // YOUR_DOMAIN is the XXXX part of XXXX.microcms.io
      apiKey: "YOUR_API_KEY",
      globalDraftKey: "YOUR_GLOBAL_DRAFT_KEY", // If need 
    },
  },
};
```


#### globalDraftKey を利用してビルド・生成する場合

すべての下書き記事が閲覧できる危険なビルドのため、  
危険性を理解して実行する際は、環境変数 `DANGEROUSLY_SET_MICROCMS_GLOBAL_DRAFT_KEY=true` を設定してください


```bash
# 例

# Linux 系
$ DANGEROUSLY_SET_MICROCMS_GLOBAL_DRAFT_KEY=true yarn generate

# Windows にも対応
# cross-env のインストールが必要
$ cross-env DANGEROUSLY_SET_MICROCMS_GLOBAL_DRAFT_KEY=true yarn generate
```


## 使い方

### SSR

```vue
<template>
  <div>
    <p v-for="item in items" :key="item.id">{{ item.title }}</p>
  </div>
</template>

<script>
export default {
  async asyncData({ $microcms }) {
    // 参考 https://github.com/wantainc/microcms-js-sdk#how-to-use
    const res = await $microcms.client
      .get({
        endpoint: 'endpoint',
        queries: { limit: 20, filters: 'createdAt[greater_than]2021' },
        useGlobalDraftKey: false, // This is an option if your have set the globalDraftKey. Default value true.
      })
      .catch((err) => console.error(err));

    return {
      items: res.contents,
    };
  },
  data() {
    return {
      items: [],
    };
  },
};
</script>
```


### CSR

```vue
<template>
  <div>
    <p v-for="item in items" :key="item.id">{{ item.title }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },
  async fetch() {
    // 参考 https://github.com/wantainc/microcms-js-sdk#how-to-use
    const res = await this.$microcms.client
      .get({
        endpoint: 'endpoint',
        queries: { limit: 20, filters: 'createdAt[greater_than]2021' },
        useGlobalDraftKey: false, // This is an option if your have set the globalDraftKey. Default value true.
      })
      .then((res) => {
        this.items = res.contents;
      })
      .catch((err) => console.error(err));
  },
  fetchOnServer: false,
};
</script>
```
