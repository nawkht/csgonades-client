import { FC, useMemo } from "react";
import { UserLight } from "../models/User";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { NadeLight } from "../models/Nade/Nade";
import { Twemoji } from "../common/Twemoji";
import { DiscordJoinAction } from "../frontpage/FrontpageActions";
import { pluralize } from "../utils/Common";
import Link from "next/link";

interface UserContribution extends UserLight {
  nadeCount: number;
  bestScore: number;
  totalScore: number;
  score: number;
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
      const currentUser = contCount[steamId];
      if (currentUser) {
        contCount[steamId] = {
          ...currentUser,
          nadeCount: currentUser.nadeCount + 1,
          bestScore: Math.max(currentUser.bestScore, nade.favoriteCount),
          totalScore: currentUser.totalScore + nade.favoriteCount,
        };
      } else {
        contCount[steamId] = {
          ...nade.user,
          nadeCount: 1,
          bestScore: nade.favoriteCount,
          score: 0,
          totalScore: nade.favoriteCount,
        };
      }
    });
    let sortedContributors = Object.values(contCount);
    sortedContributors = sortedContributors.filter(
      (n) => n.steamId !== "76561198026064832"
    );
    sortedContributors = sortedContributors.map((u) => {
      return {
        ...u,
        score: u.bestScore + u.nadeCount,
      };
    });
    sortedContributors.sort((a, b) => {
      const aScore =
        Math.log(a.totalScore || 2) + Math.log(a.nadeCount || 2) / 4;
      const bScore =
        Math.log(b.totalScore || 2) + Math.log(b.nadeCount || 2) / 4;
      return bScore - aScore;
    });
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
        <div className="label">TOP NADE CONTRIBUTORS</div>
        {contributors.gold && (
          <>
            <div className="gold">
              <span>
                <Twemoji emoji="🐔" />
              </span>
              <TopContributor user={contributors.gold} />
            </div>
          </>
        )}

        {contributors.silver && (
          <>
            <div className="silver">
              <span>
                <Twemoji emoji="🐥" />
              </span>
              <TopContributor user={contributors.silver} />
            </div>
          </>
        )}

        {contributors.bronce && (
          <>
            <div className="bronze">
              <span>
                <Twemoji emoji="🥚" />
              </span>
              <TopContributor user={contributors.bronce} />
            </div>
          </>
        )}
        <DiscordJoinAction />
      </div>
      <style jsx>{`
        .cont-list {
        }

        .cont-desc {
          font-size: 12px;
          color: #bbb;
          text-align: center;
          padding: 10px 20px;
        }

        .label {
          background: ${colors.DP01};
          border-bottom: 1px solid ${colors.BORDER};
          color: ${colors.TEXT};
          padding: 10px 20px;
          margin-bottom: 10px;
          text-align: center;
          font-size: 16px;
        }

        .gold,
        .silver,
        .bronze {
          display: flex;
          align-items: center;
          padding: 10px 20px;
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
        <Link href={"/users/[user]"} as={`/users/${user.steamId}`}>
          <a className="contributor">
            <img src={user.avatar} />
            <span className="nickname">{user.nickname}</span>
          </a>
        </Link>
        <div className="nade-count">
          {pluralize(user.totalScore, "favorite")} on{" "}
          {pluralize(user.nadeCount, "nade")}
        </div>
      </div>

      <style jsx>{`
        .contributor-wrap {
          display: flex;
          width: 100%;
          justify-content: space-between;
        }

        .nade-count {
          font-size: 10px;
          color: ${colors.GREY};
        }

        .contributor {
          display: flex;
          align-items: center;
          background: ${colors.DP01};
          color: ${colors.TEXT};
          overflow: hidden;
          border-radius: 10px;
        }

        .contributor:hover {
          background: ${colors.DP00};
        }

        .contributor img {
          height: 20px;
          width: 20px;
          border-radius: 50%;
        }

        .nickname {
          display: block;
          padding-left: 5px;
          padding-right: 15px;
          font-size: 12px;
          white-space: nowrap;
        }
      `}</style>
    </>
  );
};
