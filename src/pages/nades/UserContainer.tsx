import { FC } from "react";
import { UserLight } from "../../models/User";
import Link from "next/link";

type Props = {
  user: UserLight;
  marginTop?: number;
};

export const UserContainer: FC<Props> = ({ user, marginTop }) => {
  const { avatar, nickname } = user;
  return (
    <>
      <div className="user-container">
        <Link href={`/users/${user.steamId}`}>
          <a className="user-link">
            <img
              className="user-avatar"
              src={
                avatar
                  ? avatar
                  : "https://www.prndl.co/assets/user-placeholder-54d9b5720151ac85adf20a7dbef2a11821b1c35b64d40f32e928974c2c2abd6b.png"
              }
            />
            <span className="user-nickname">{nickname}</span>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .user-container {
          margin-top: ${marginTop || 0}px;
          display: flex;
          justify-content: flex-end;
        }

        .user-link {
          display: flex;
          align-items: center;
          color: #444;
        }

        .user-container:hover .user-nickname {
          text-decoration: underline;
        }

        .user-avatar {
          width: 30px;
          margin-right: 6px;
          border-radius: 50%;
        }
      `}</style>
    </>
  );
};
