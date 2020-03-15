import { NextPage } from "next";
import { useOnSignIn } from "../store/AuthStore/AuthHooks";
import { SEO } from "../layout/SEO2";

const Auth: NextPage = () => {
  useOnSignIn();

  return (
    <>
      <SEO title="Signing in" canonical="/auth" />
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
          z-index: 999;
          background: rgba(0, 0, 0, 0.95);
        }

        .loading {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default Auth;
