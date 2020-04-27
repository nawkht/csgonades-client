import { FC, useMemo } from "react";
import { UserLight } from "../models/User";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { NadeLight } from "../models/Nade/Nade";

interface UserContribution extends UserLight {
  nadeCount: number;
  favCount: number;
}

type ContListProps = {
  nades: NadeLight[];
};

export const TopContributorList: FC<ContListProps> = ({ nades }) => {
  const contributors = useMemo(() => {
    const contCount: { [key: string]: UserContribution } = {};
    nades.forEach((nade) => {
      const steamId = nade.user.steamId;
      const currentUser = contCount[steamId];
      if (currentUser) {
        contCount[steamId] = {
          ...currentUser,
          nadeCount: currentUser.nadeCount + 1,
          favCount: currentUser.favCount + nade.favoriteCount,
        };
      } else {
        contCount[steamId] = {
          ...nade.user,
          nadeCount: 1,
          favCount: nade.favoriteCount,
        };
      }
    });
    let sortedContributors = Object.values(contCount);
    sortedContributors = sortedContributors.filter(
      (n) => n.steamId !== "76561198026064832"
    );
    sortedContributors.sort((a, b) => b.favCount - a.favCount);
    sortedContributors = sortedContributors.slice(0, 3);

    const gold = sortedContributors.shift();
    const silver = sortedContributors.shift();
    const bronce = sortedContributors.shift();

    return {
      gold,
      silver,
      bronce,
    };
  }, [nades]);

  return (
    <>
      <div className="cont-list">
        {contributors.gold && (
          <>
            <div id="gold">
              <span>🏆</span>
              <TopContributor user={contributors.gold} />
            </div>
          </>
        )}

        {contributors.silver && (
          <>
            <div id="silver">
              <span>🥈</span>
              <TopContributor user={contributors.silver} />
            </div>
          </>
        )}

        {contributors.bronce && (
          <>
            <div id="bronze">
              <span>🥉</span>
              <TopContributor user={contributors.bronce} />
            </div>
          </>
        )}
        <div id="cont-desc">Based on number of favorites recieved.</div>
      </div>
      <style jsx>{`
        #cont-desc {
          font-size: 12px;
          color: #bbb;
          text-align: center;
          grid-area: desc;
        }

        .cont-list {
          display: grid;
          grid-template-columns: 1fr;
          grid-row-gap: 10px;
          grid-template-areas:
            "gold"
            "silver"
            "bronze"
            "desc";
        }

        #gold,
        #silver,
        #bronze {
          display: flex;
          align-items: center;
        }

        .cont-list span {
          font-size: 1.5em;
          margin-right: 10px;
          display: block;
        }

        #gold {
          grid-area: gold;
        }
        #silver {
          grid-area: silver;
        }
        #bronze {
          grid-area: bronze;
        }

        #gold-ped {
          grid-area: gold-ped;
        }

        #silver-ped {
          grid-area: silver-ped;
        }

        #bronze-ped {
          grid-area: bronze-ped;
        }

        #mid {
          grid-area: mid;
        }
      `}</style>
    </>
  );
};

type Props = {
  user: UserContribution;
};

const TopContributor: FC<Props> = ({ user }) => {
  const { colors } = useTheme();
  return (
    <>
      <div className="contributor-wrap">
        <div className="contributor">
          <img src={user.avatar} />
          <span>{user.nickname}</span>
        </div>
        <span className="nade-count">{user.nadeCount} NADES</span>
      </div>
      <style jsx>{`
        .contributor-wrap {
          display: flex;
          width: 100%;
          justify-content: space-between;
        }

        .nade-count {
          font-size: 10px;
          color: ${colors.TEXT};
        }

        .contributor {
          display: flex;
          align-items: center;
          background: ${colors.DP00};
          color: ${colors.TEXT};
          overflow: hidden;
          border-radius: 10px;
        }

        .contributor img {
          height: 20px;
          width: 20px;
          border-radius: 50%;
        }

        span {
          display: block;
          padding-left: 5px;
          padding-right: 10px;
          font-size: 12px;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
};
