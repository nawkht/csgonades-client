import { FC } from "react";
import { Statistic } from "semantic-ui-react";

const Stats: FC = () => {
  return (
    <>
      <div id="stats">
        <div id="stats-container">
          <Statistic.Group size="mini" widths="two">
            <Statistic>
              <Statistic.Value>321</Statistic.Value>
              <Statistic.Label>Nades</Statistic.Label>
            </Statistic>

            <Statistic>
              <Statistic.Value>7520</Statistic.Value>
              <Statistic.Label>Users</Statistic.Label>
            </Statistic>
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

export { Stats };
