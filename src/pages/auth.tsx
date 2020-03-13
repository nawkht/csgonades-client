import { NextPage } from "next";
import { useOnSignIn } from "../store/AuthStore/AuthHooks";
import { withRedux } from "../utils/WithRedux";

const Auth: NextPage = () => {
  useOnSignIn();

  return (
    <>
      <div className="loading">
        <p>Signing in... Please wait.</p>
      </div>
      <style jsx>{`
        .loading {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .loading {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default withRedux(Auth, { ssr: false });
