import { FC } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {};

export const BlogAuthor: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const defaultName = "Mellet";
  const defaultAvatar = "/mellet.jpeg";

  return (
    <>
      <div className="author">
        <h4>Author</h4>
        <div className="author-details">
          <img src={defaultAvatar} />
          <p>{defaultName}</p>
        </div>
      </div>
      <style jsx>{`
        .author {
          background: ${colors.DP02};
          padding: 20px;
          border-radius: 5px;
          margin-top: 100px;
        }

        .author-details {
          display: flex;
          align-items: center;
        }

        .author-details img {
          width: 50px;
          border-radius: 50%;
          margin-right: 10px;
        }
      `}</style>
    </>
  );
};
