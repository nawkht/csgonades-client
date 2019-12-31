import { FC } from "react";
import { Statistic } from "semantic-ui-react";
import { useSiteStats } from "../../store/NadeStore/NadeSelectors";

const FrontPageStats: FC = () => {
  const stats = useSiteStats();

  return (
    <>
      <div id="stats">
        <div id="stats-container">
          <Statistic.Group size="mini" widths="one">
            <Statistic>
              <Statistic.Value>{stats.numNades}</Statistic.Value>
              <Statistic.Label>Nades</Statistic.Label>
            </Statistic>

            {false && (
              <Statistic>
                <Statistic.Value>{stats.numUsers}</Statistic.Value>
                <Statistic.Label>Users</Statistic.Label>
              </Statistic>
            )}
          </Statistic.Group>
        </div>
      </div>
      <style jsx>{`
        #stats {
          padding: 16px;
          background: #fff;
          display: flex;
          justify-content: space-around;
        }

        #stats-container {
          width: 200px;
        }
      `}</style>
    </>
  );
};

export { FrontPageStats };
