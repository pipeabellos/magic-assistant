import './styles.css';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script'
import * as snippet from '@segment/snippet'

// This write key is associated with https://segment.com/nextjs-example/sources/nextjs.
const DEFAULT_WRITE_KEY = 'uE3DG7bggbhCgXmIjqdhpcqq2QJ23ecr'

function renderSnippet() {
  const opts = {
    apiKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY || DEFAULT_WRITE_KEY,
    // note: the page option only covers SSR tracking.
    // Page.js is used to track other events using `window.analytics.page()`
    page: true,
  }

  if (process.env.NODE_ENV === 'development') {
    return snippet.max(opts)
  }

  return snippet.min(opts)
}

function App({ Component, pageProps }) {
  
  return (
    <>
      <Script
        id="segment-script"
        dangerouslySetInnerHTML={{ __html: renderSnippet() }}
      /> 
      <Script src="https://arc.io/widget.min.js#5QGNEEZJ" />    
      <Component {...pageProps} />
      <Analytics />
    </>
  )
  
}
export default App;
