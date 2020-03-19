import "../utils/css/normalize.css";
import "../utils/css/Global.css";
import "semantic-ui-css/semantic.min.css";
import "react-image-crop/dist/ReactCrop.css";
import { Layout2 } from "../layout/Layout2";
import { withRedux } from "../utils/WithRedux";

const App = ({ Component, pageProps }: any) => {
  return (
    <Layout2 {...pageProps}>
      <Component {...pageProps} />
    </Layout2>
  );
};

export default withRedux(App);
