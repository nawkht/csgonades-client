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
    sortedContributors = sortedContributors.slice(0, 6);

    return sortedContributors;
  }, [nades]);

  return (
    <>
      <div className="cont-list">
        {contributors.map((c) => (
          <TopContributor key={c.steamId} user={c} />
        ))}
      </div>
      <style jsx>{`
        .cont-list {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
        }

        span {
          font-weight: 300;
          margin-bottom: 10px;
          display: block;
          font-size: 14px;
          font-weight: normal;
          background: ${colors.DP01};
          padding: 15px 30px;
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
          background: ${colors.DP01};
          color: ${colors.TEXT};
          overflow: hidden;
          margin-bottom: 10px;
          height: 25px;
          border-radius: 5px;
        }

        .contributor img {
          height: 90%;
          border-radius: 50%;
        }

        span {
          padding: 5px;
          display: block;
          font-size: 12px;
        }
      `}</style>
    </>
  );
};
