import { FC, memo, useState, useEffect } from "react";
import { PageCentralize } from "../common/PageCentralize";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { SiteStats, StatsApi } from "../api/StatsApi";

type Props = {
  stats: SiteStats | null;
};

export const FrontPageJumbo: FC<Props> = memo(({ stats }) => {
  const [newestStats, setNewestStats] = useState(stats);
  const { colors } = useTheme();

  useEffect(() => {
    StatsApi.getStats()
      .then((res) => {
        if (res.isOk()) {
          setNewestStats(res.value);
        }
      })
      .catch((_) => {
        // no-op
      });
  }, []);

  return (
    <>
      <div id="jumbo">
        <PageCentralize>
          <div id="jumbo-message">
            <h1>
              Hi, welcome to CSGO Nades.
              <br /> A community to learn and share
              <br /> nades for Counter-Strike Global Offensive.
            </h1>
            <div className="illustration" />
          </div>
        </PageCentralize>
        {newestStats && (
          <div className="stats">
            <div className="stat-item">
              <span className="stat-count">{newestStats.numUsers}</span>
              <span className="stat-label">Users</span>
            </div>
            <div className="stat-item">
              <span className="stat-count">{newestStats.numNades}</span>
              <span className="stat-label">Nades</span>
            </div>
          </div>
        )}
      </div>
      <style jsx>{`
        #jumbo {
          position: relative;
          background: linear-gradient(
            252.84deg,
            ${colors.jumboGradientStart} 33.44%,
            ${colors.jumboGradientEnd} 66.89%
          );
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          overflow: hidden;
          margin-bottom: 30px;
          padding-bottom: 60px;
        }

        #jumbo-message {
          position: relative;
          display: block;
          padding-top: 100px;
          padding-bottom: 100px;
        }

        .illustration {
          position: absolute;
          bottom: -75px;
          right: 0;
          width: 350px;
          height: 350px;
          background: url("/images/ilustration.svg");
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          opacity: 0.9;
          z-index: 700;
        }

        h1 {
          color: ${colors.TEXT};
          margin: 0;
          padding: 0;
          font-weight: 300;
          font-size: 2.2rem;
        }

        .stats {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          background: ${colors.DP02};
          color: ${colors.TEXT};
          z-index: 701;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px;
        }

        .stat-count {
          font-size: 20px;
          font-weight: 400;
        }

        .stat-label {
          font-size: 16px;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .illustration {
            width: 150px;
            height: 150px;
            bottom: -40px;
          }
        }
      `}</style>
    </>
  );
});
