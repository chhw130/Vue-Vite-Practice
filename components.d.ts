declare module '@vule/runtime-core' {
  export interface GlobalComponents {
    RouterLink: (typeof import('vue-router'))['RouterLink']
    RouterView: (typeof import('vue-router'))['RouterView']
    // env: {
    //   VITE_APP_API_URL: string
    // }
  }
}

export {}
