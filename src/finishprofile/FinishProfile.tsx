import Router from "next/router";
import { FC, useState } from "react";
import { PageCentralize } from "../common/PageCentralize";
import { User } from "../models/User";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { useFinishProfile } from "../store/UsersStore/hooks/useFinishProfile";

type Props = { user: User };

export const FinishProfile: FC<Props> = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const finishProfile = useFinishProfile();
  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);
  const [bio, setBio] = useState(user.bio);
  const [error, setError] = useState<string | undefined>();
  const { colors } = useTheme();

  function onSubmit() {
    if (nickname.includes("@")) {
      setError(
        "It looks like you put your e-mail as your nickname. This is not very smart as it will be visible to anyone."
      );
      return;
    }

    setLoading(true);
    finishProfile(user.steamId, {
      nickname,
      email,
      bio,
    });
    Router.push("/");
  }

  return (
    <>
      <div className="finish-profile">
        <PageCentralize>
          <div className="welcome">
            <h1>Hi {user.nickname}, let&apos;s finish your profile!</h1>
            <h2>Then go favorite some nades or add your own 👊</h2>
          </div>
        </PageCentralize>
      </div>
      <PageCentralize>
        {!!error && (
          <div className="error">
            <h3>Error</h3>
            <p>{error}</p>
          </div>
        )}
        <div className="profile-form">
          <span className="label">
            Nickname <span className="require">*</span>
          </span>
          <input
            value={nickname}
            placeholder="Nickname"
            onChange={(e) => setNickname(e.target.value)}
          />
          <span className="label">E-mail</span>
          <input
            value={email}
            placeholder="E-mail"
            onChange={(e) => setEmail(e.target.value)}
          />
          <span className="label">Bio</span>
          <textarea
            value={bio}
            placeholder="Write something funny... Or keep it blank if your mysterious."
            onChange={(e) => setBio(e.target.value)}
            rows={10}
          />
          <button disabled={loading} className="save-btn" onClick={onSubmit}>
            SAVE
          </button>
        </div>
      </PageCentralize>
      <style jsx>{`
        .finish-profile {
          background: linear-gradient(
            252.84deg,
            ${colors.jumboGradientStart} 33.44%,
            ${colors.jumboGradientEnd} 66.89%
          );
        }

        .welcome {
          padding-top: 50px;
          padding-bottom: 50px;
          color: ${colors.TEXT};
        }

        .error {
          background: #800d0d;
          color: white;
          max-width: 400px;
          margin: 30px auto;
          padding: 20px;
          border-radius: 5px;
        }

        .profile-form {
          display: flex;
          flex-direction: column;
          padding-top: 40px;
          padding-bottom: 40px;
          min-height: 70vh;
        }

        .label {
          margin-bottom: 5px;
          margin-top: 30px;
          font-size: 18px;
          color: ${colors.TEXT};
        }

        .require {
          color: maroon;
        }

        input,
        textarea {
          margin-bottom: 20px;
          border: 1px solid ${colors.BORDER};
          padding: 15px;
          font-size: 16px;
          font-weight: 300;
          outline: none;
          border-radius: 5px;
          background: transparent;
          color: ${colors.TEXT};
        }

        .save-btn {
          border: none;
          outline: none;
          cursor: pointer;
          padding: 15px 20px;
          background: ${colors.PRIMARY};
          color: white;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
};
