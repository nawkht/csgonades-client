import { FC, memo, useEffect } from "react";
import { CSGNModal } from "../../common/CSGNModal";
import { useAnalytics } from "../../utils/Analytics";
import { SignInnButton } from "../../layout/Misc/SignInnButton";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";

type Props = {};

export const SignInWarning: FC<Props> = memo(() => {
  const { signInWarning, clearSignInWarning } = useSignInWarning();
  const { event } = useAnalytics();

  useEffect(() => {
    if (signInWarning) {
      event({
        category: "Sign In Warning",
        action: "Displayed",
      });
    }
  }, [signInWarning, event]);

  function onSignIn() {
    event({
      category: "Sign In Warning",
      action: "Sign In Clicked",
    });
  }

  return (
    <>
      <CSGNModal
        title="Not Signed In"
        visible={!!signInWarning}
        onDismiss={clearSignInWarning}
      >
        <div className="sign-in-warning">
          <div className="section">
            I see you&apos;re not signed in 😥
            <br />
            That&apos;s ok. But if you sign in, you can:
          </div>
          <div className="section">🤩 Favorite nades</div>
          <div className="section">🧐 Comment on nades</div>
          <div className="section">🤤 Filter nades by your favorite ones</div>
          <div className="btn" onClick={onSignIn}>
            <SignInnButton />
          </div>
        </div>
      </CSGNModal>
      <style jsx>{`
        .btn {
          display: flex;
          justify-content: space-around;
        }

        .section {
          margin-bottom: 10px;
        }

        .btn {
          margin-top: 20px;
        }
      `}</style>
    </>
  );
});
