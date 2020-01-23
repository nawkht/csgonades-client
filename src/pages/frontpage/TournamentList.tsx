import { FC } from "react";
import { Tournament } from "../../models/Tournament";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { TournamentItem } from "./TournamentItem";

type Props = {
  tournaments: Tournament[];
};

export const TournamentList: FC<Props> = ({ tournaments }) => {
  const { uiDimensions } = useTheme();
  if (tournaments.length === 0) {
    return null;
  }

  return (
    <div>
      <h3>Tournaments</h3>
      <div className="table-container">
        {tournaments.map(t => (
          <TournamentItem key={t.id} tournament={t} />
        ))}
      </div>
      <style jsx>{`
        .table-container {
          display: grid;
          grid-template-columns: repeat(3, minmax(250px, 1fr));
          grid-column-gap: ${uiDimensions.INNER_GUTTER_SIZE}px;
          grid-row-gap: ${uiDimensions.INNER_GUTTER_SIZE}px;
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
          .table-container {
            grid-template-columns: repeat(1, minmax(250px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};
