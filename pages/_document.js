import { Html, Head, Main, NextScript } from 'next/document'

<link rel="icon" href="../assets/favicon.jpg" type="image/x-icon" />

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:title" content="GPT-3 Writer" key="title"/>
        <meta property="og:description" content="Magic by HelloGuru" key="description"/>
        <meta
          property="og:image"
          content="https://s3.amazonaws.com/appforest_uf/f1671651880628x655240204685085800/Screenshot%202022-12-21%20at%2014.43.48.png"
        />
        <meta name="twitter:card" content="summary_large_image"></meta>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
