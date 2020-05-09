import { FC, memo, useEffect } from "react";
import { CSGNModal } from "../../common/CSGNModal";
import { useAnalytics } from "../../utils/Analytics";
import { SignInnButton } from "../../layout/Misc/SignInnButton";
import { useSignInWarning } from "../../store/GlobalStore/hooks/useSignInWarning";
import { Twemoji } from "../../common/Twemoji";

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

  function onDismiss() {
    clearSignInWarning();
    event({
      category: "Sign In Warning",
      action: "Dismiss",
    });
  }

  return (
    <>
      <CSGNModal
        title="Not Signed In"
        visible={!!signInWarning}
        onDismiss={onDismiss}
      >
        <div className="sign-in-warning">
          <div className="section">
            I see you&apos;re not signed in <Twemoji emoji="😥" />
            <br />
            That&apos;s ok. But if you sign in, you can:
          </div>
          <div className="section">
            <Twemoji emoji="🤩" /> Favorite nades
          </div>
          <div className="section">
            <Twemoji emoji="🧐" /> Comment on nades
          </div>
          <div className="section">
            <Twemoji emoji="🤤" /> Filter nades by your favorite ones
          </div>
          <div className="btn" onClick={onSignIn}>
            <SignInnButton />
          </div>
        </div>
      </CSGNModal>
      <style jsx>{`
        .sign-in-warning {
          padding: 20px;
        }

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
