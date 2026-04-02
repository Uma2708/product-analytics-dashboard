declare module 'react/jsx-runtime'

// Provide a very small JSX fallback only if the compiler lacks types.
declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any
  }
}
