import { FC } from "react";
import { Tournament } from "../../models/Tournament";
import { prettyDate } from "../../utils/DateUtils";
import { Flag, Icon } from "semantic-ui-react";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

type Props = {
  tournaments: Tournament[];
};

export const TournamentList: FC<Props> = ({ tournaments }) => {
  const { colors } = useTheme();
  if (tournaments.length === 0) {
    return null;
  }

  return (
    <div>
      <h3>Tournaments</h3>
      <div className="table-container">
        <table>
          <tbody>
            <tr>
              <td className="icon"></td>
              <td className="name">Name</td>
              <td>Start date</td>
              <td>End date</td>
              <td>Location</td>
            </tr>
            {tournaments.map(t => (
              <tr key={t.id}>
                <td className="icon">
                  <img src={t.iconUrl} />
                </td>
                {t.eventUrl ? (
                  <td className="name link">
                    <a href={t.eventUrl} target="_blank">
                      {t.name}
                    </a>
                  </td>
                ) : (
                  <td className="name">{t.name}</td>
                )}
                <td>{prettyDate(t.startDate)}</td>
                <td>{prettyDate(t.endDate)}</td>
                <td>
                  <Flag name={t.country} /> {t.city}
                </td>
                <td>
                  {t.twitchUrl && (
                    <a href={t.twitchUrl} target="_blank" rel="nofollow">
                      <Icon name="twitch" size="large" />
                    </a>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <style jsx>{`
        .table-container {
          background: white;
          border: 1px solid ${colors.PRIMARY_BORDER};
          border-radius: 4px;
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        .icon {
          width: 25px;
        }

        tr {
          border-bottom: 1px solid ${colors.PRIMARY_BORDER};
        }

        tr:last-child {
          border-bottom: none;
        }

        tr td {
          padding: 6px 12px;
        }

        tr:first-child {
          font-weight: bold;
        }

        .link a {
          color: ${colors.PRIMARY};
        }

        .link a:hover {
          text-decoration: underline;
        }

        .icon img {
          width: 16px;
        }

        .name {
          flex: 1;
        }
      `}</style>
    </div>
  );
};
