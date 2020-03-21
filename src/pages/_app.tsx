import "../utils/css/normalize.css";
import "../utils/css/Global.css";
import "semantic-ui-css/semantic.min.css";
import "react-image-crop/dist/ReactCrop.css";
import { Layout2 } from "../layout/Layout2";
import { withRedux } from "../utils/WithRedux";
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://da6e22eac1a8487484fb116b8640e3f8@sentry.io/1871885",
  enabled: true,
});

const App = ({ Component, pageProps, err }: any) => {
  // Workaround for https://github.com/zeit/next.js/issues/8592
  const modifiedPageProps = { ...pageProps, err };

  return (
    <Layout2 {...modifiedPageProps}>
      <Component {...modifiedPageProps} />
    </Layout2>
  );
};

export default withRedux(App);
