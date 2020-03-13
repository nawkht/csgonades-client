import Document, { Head, Html, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <>
        <Html lang="en">
          <Head>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
            <meta charSet="utf-8" />
            <link
              rel="shortcut icon"
              href="/icons/favicon.ico"
              type="image/x-icon"
            />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/favicon/apple-touch-icon.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favicon/favicon-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favicon/favicon-16x16.png"
            />
            <link rel="manifest" href="/favicon/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/favicon/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff"></meta>
            <link
              rel="icon"
              href="/favicon/icons/favicon.ico"
              type="image/x-icon"
            />
            <link
              href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900&display=swap"
              rel="stylesheet"
              key="google-font-roboto"
              media="all"
            />
            <link
              rel="stylesheet"
              href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
            />
          </Head>
          <body>
            <Main />
            <NextScript />
          </body>
        </Html>
        <style global jsx>{`
          html {
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            -webkit-box-sizing: inherit;
            -moz-box-sizing: inherit;
            box-sizing: inherit;
          }

          body {
            font-family: "Roboto", Helvetica, sans-serif;
            font-weight: 300;
            color: #212529;
            font-size: 16px;
          }

          h1,
          h2,
          h3,
          h4,
          h5 {
            font-family: "Roboto", Helvetica, sans-serif;
            font-weight: 300;
          }

          h1 {
            font-size: 2rem;
          }

          h2 {
            font-size: 1.8rem;
          }

          h3,
          h4,
          h5 {
            font-size: 1.6rem;
          }

          p {
            font-size: 1.2rem;
          }

          input {
            font-family: "Roboto", sans-serif;
          }
        `}</style>
      </>
    );
  }
}

export default MyDocument;
