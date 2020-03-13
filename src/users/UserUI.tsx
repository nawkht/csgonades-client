import { FC } from "react";
import { NadeListGrid } from "../common/NadeListGrid";
import { Dimensions } from "../constants/Constants";
import { NadeLight } from "../models/Nade/Nade";
import { User } from "../models/User";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { UserDetails } from "./UserDetails";

type Props = {
  user: User;
  nades: NadeLight[];
};

export const UserUI: FC<Props> = ({ user, nades }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="user-container">
        <div className="user-details">
          <UserDetails user={user} />
        </div>
        <div className="user-nades">
          <h2>Nades by {user.nickname}</h2>
          <NadeListGrid nades={nades} />
        </div>
      </div>
      <style jsx>{`
        .user-container {
          position: relative;
          margin-top: 50px;
          margin-bottom: 100px;
          display: flex;
          flex-direction: column;
          min-height: 80vh;
        }

        .user-details {
          margin-bottom: ${Dimensions.GUTTER_SIZE};
        }

        .user-nades {
          flex: 1;
        }

        .user-nades h2 {
          font-weight: 300;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
