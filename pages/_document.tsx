import Document, {
  Html,
  Main,
  NextScript,
  DocumentContext,
  Head
} from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
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
          <link rel="icon" href="/icons/favicon.ico" type="image/x-icon" />
          <link
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,700,900&display=swap"
            rel="stylesheet"
            key="google-font-roboto"
            media="all"
          />
          <link
            rel="stylesheet"
            href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.11/semantic.min.css"
            media="all"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
