import Vue from 'vue';
import type { createClient } from 'microcms-js-sdk';

interface MicrocmsModule {
  client: ReturnType<typeof createClient>;
}

interface MicrocmsOptions {
  client: Parameters<typeof createClient>[0];
}

declare module '@nuxt/vue-app' {
  interface Context {
    $microcms: MicrocmsModule;
  }

  interface NuxtAppOptions {
    $microcms: MicrocmsModule;
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $microcms: MicrocmsModule;
  }

  interface NuxtAppOptions {
    $microcms: MicrocmsModule;
  }

  interface Configuration {
    microcms?: MicrocmsOptions;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $microcms: MicrocmsModule;
  }
}
