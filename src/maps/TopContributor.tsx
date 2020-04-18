import { FC, useMemo } from "react";
import { UserLight } from "../models/User";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { NadeLight } from "../models/Nade/Nade";

interface UserContribution extends UserLight {
  nadeCount: number;
}

type ContListProps = {
  nades: NadeLight[];
};

export const TopContributorList: FC<ContListProps> = ({ nades }) => {
  const { colors } = useTheme();

  const contributors = useMemo(() => {
    const contCount: { [key: string]: UserContribution } = {};
    nades.forEach((nade) => {
      const steamId = nade.user.steamId;
      const currentDate = contCount[steamId];
      if (currentDate) {
        contCount[steamId] = {
          ...currentDate,
          nadeCount: currentDate.nadeCount + 1,
        };
      } else {
        contCount[steamId] = {
          ...nade.user,
          nadeCount: 1,
        };
      }
    });
    let sortedContributors = Object.values(contCount);
    sortedContributors = sortedContributors.filter(
      (n) => n.steamId !== "76561198026064832"
    );
    sortedContributors.sort((a, b) => b.nadeCount - a.nadeCount);
    sortedContributors = sortedContributors.slice(0, 3);

    return sortedContributors;
  }, [nades]);

  return (
    <>
      <div className="cont-wrap">
        <div className="cont-cont">
          <span>Top contributors</span>
          <div className="cont-list">
            {contributors.map((c) => (
              <TopContributor key={c.steamId} user={c} />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .cont-wrap {
          display: flex;
          margin-top: 30px;
          color: ${colors.TEXT};
        }

        .cont-list {
          display: flex;
          align-items: center;
        }

        span {
          font-weight: 300;
          margin-bottom: 10px;
          display: block;
          font-size: 16px;
        }
      `}</style>
    </>
  );
};

type Props = {
  user: UserLight;
};

const TopContributor: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="contributor">
        <img src={user.avatar} />
        <span>{user.nickname}</span>
      </div>
      <style jsx>{`
        .contributor {
          display: flex;
          align-items: center;
          margin-right: 15px;
          background: ${colors.DP02};
          border-radius: 10px;
          overflow: hidden;
        }

        .contributor img {
          width: 25px;
          border-radius: 50%;
        }

        span {
          padding: 5px;
          display: block;
        }
      `}</style>
    </>
  );
};
