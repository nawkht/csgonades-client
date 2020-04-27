import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {};

export const BlogAuthor: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const defaultName = "Mellet Solbakk";
  const defaultAvatar = "/mellet.jpeg";

  return (
    <>
      <div className="author">
        <img src={defaultAvatar} />
        <div className="author-details">
          <span>WRITTEN BY</span>
          <p>{defaultName}</p>
        </div>
      </div>
      <style jsx>{`
        .author {
          background: ${colors.DP02};
          padding: 20px;
          border-radius: 5px;
          margin-top: 100px;
          display: flex;
        }

        .author img {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          margin-right: 20px;
        }

        .author-details {
        }

        .author-details span {
          display: block;
          margin-bottom: 6px;
          color: #bbb;
          font-size: 16px;
        }

        .author-details p {
          font-size: 18px;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
};
