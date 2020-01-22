import { FC } from "react";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { useTournaments } from "../../store/TournamentStore/TournamentHooks";
import { TournamentList } from "./TournamentList";

export const TournamentsContainer: FC = () => {
  const { uiDimensions } = useTheme();
  const { tournaments, fetchTournaments } = useTournaments();

  return (
    <>
      <div className="tournaments">
        <TournamentList tournaments={tournaments} />
      </div>
      <style jsx>{`
        .tournaments {
          margin: ${uiDimensions.INNER_GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
