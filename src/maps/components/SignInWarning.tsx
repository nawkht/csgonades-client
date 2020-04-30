import { FC, useMemo } from "react";
import { CSGNModal } from "../../common/CSGNModal";
import { Config } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { useAnalytics } from "../../utils/Analytics";

type FavMessage = "filter" | "favorite";

type Props = {
  visible: boolean;
  onDismiss: () => void;
  message: FavMessage;
};

export const SignInWarning: FC<Props> = ({ visible, onDismiss, message }) => {
  const { event } = useAnalytics();
  const { colors } = useTheme();

  const warningMessage = useMemo(() => {
    if (message === "favorite") {
      return "You need to be signed in to favorite nades.";
    } else {
      return "You need to be signed in to filter by your favorites.";
    }
  }, [message]);

  function onSignIn() {
    event({
      category: "Sign In Warning",
      action: "Sign In Clicked",
    });
  }

  return (
    <>
      <CSGNModal title="Woops!" visible={visible} onDismiss={onDismiss}>
        <div className="sign-in-warning">
          <p>{warningMessage}</p>
          <a
            onClick={onSignIn}
            className="sign-in-btn"
            href={Config.SIGN_IN_URL}
          >
            Sign in with steam
          </a>
        </div>
      </CSGNModal>
      <style jsx>{`
        .sign-in-warning {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 40px;
          max-width: 300px;
        }
        .sign-in-btn {
          color: white;
          background: ${colors.PRIMARY};
          padding: 10px;
          border-radius: 5px;
          margin-top: 5px;
        }
      `}</style>
    </>
  );
};
