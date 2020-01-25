import { FC } from "react";
import { Flag, Icon } from "semantic-ui-react";
import { Tournament } from "../../models/Tournament";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { prettyDate } from "../../utils/DateUtils";

type Props = {
  tournament: Tournament;
};

export const TournamentItem: FC<Props> = ({ tournament }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="tournament">
        <div className="tournament-header">
          <h3>{tournament.name}</h3>
        </div>
        <div className="tournament-body">
          <table>
            <tbody>
              <tr>
                <td>Location</td>
                <td>
                  {tournament.city} <Flag name={tournament.country} />
                </td>
              </tr>
              <tr>
                <td>Start date</td>
                <td>{prettyDate(tournament.startDate)}</td>
              </tr>
              <tr>
                <td>End date</td>
                <td>{prettyDate(tournament.endDate)}</td>
              </tr>
            </tbody>
          </table>
          <div className="tournament-btns">
            <a href={tournament.eventUrl} rel="nofollow" target="_blank">
              <Icon name="home" size="large" />
            </a>
            <a href={tournament.twitchUrl} target="_blank">
              <Icon name="twitch" size="large" />
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        .tournament {
          background: ${colors.UI_BG};
          color: ${colors.TEXT};
          border-radius: 4px;
          overflow: hidden;
          border: 1px solid ${colors.BORDER};
        }

        .tournament-header {
          display: flex;
          min-height: 200px;
          background: #1f2125 url(${tournament.iconUrl});
          background-repeat: no-repeat;
          background-position: center;
          background-size: 20%;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .tournament-header h3 {
          color: white;
          align-self: flex-end;
          width: 100%;
          text-align: center;
          padding: 24px;
          font-weight: normal;
          font-size: 1.2em;
        }

        .tournament-body {
          position: relative;
          padding: 12px 12px;
        }

        .tournament-btns {
          position: absolute;
          bottom: 12px;
          right: 12px;
          display: flex;
          flex-direction: column;
          margin-right: -3px;
        }

        .tournament-btns a {
          margin-top: 6px;
          color: ${colors.TEXT};
        }

        .tournament-btns a:hover {
          color: ${colors.PRIMARY};
        }

        table {
          border-collapse: collapse;
        }

        table td:first-child {
          font-weight: normal;
          padding-right: 6px;
        }

        table td {
          padding-bottom: 6px;
        }
      `}</style>
    </>
  );
};
