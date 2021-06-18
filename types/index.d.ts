import { createClient, ClientParams } from 'microcms-js-sdk';

interface MicrocmsOptions {
  client: ClientParams;
}

interface MicrocmsFunc {
  client: ReturnType<typeof createClient>;
}

declare module '@nuxt/types' {
  interface Context {
    $microcms: MicrocmsFunc;
  }

  interface NuxtAppOptions {
    $microcms: MicrocmsFunc;
  }

  interface Configuration {
    microcms?: MicrocmsOptions;
  }
}

declare module '@nuxt/vue-app' {
  interface Context {
    $microcms: MicrocmsFunc;
  }

  interface NuxtAppOptions {
    $microcms: MicrocmsFunc;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $microcms: MicrocmsFunc;
  }
}
