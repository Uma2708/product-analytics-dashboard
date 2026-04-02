declare module 'react/jsx-runtime'

interface ImportMetaEnv {
  readonly VITE_API_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

// Provide a very small JSX fallback only if the compiler lacks types.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
