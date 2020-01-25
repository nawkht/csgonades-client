import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { Tournament } from "../../models/Tournament";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { TournamentItem } from "./TournamentItem";

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
        {tournaments.map(t => (
          <TournamentItem key={t.id} tournament={t} />
        ))}
      </div>
      <style jsx>{`
        h3 {
          color: ${colors.TEXT};
        }

        .table-container {
          display: grid;
          grid-template-columns: repeat(3, minmax(250px, 1fr));
          grid-column-gap: ${Dimensions.GUTTER_SIZE};
          grid-row-gap: ${Dimensions.GUTTER_SIZE};
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .table-container {
            grid-template-columns: repeat(1, minmax(250px, 1fr));
          }
        }
      `}</style>
    </div>
  );
};
