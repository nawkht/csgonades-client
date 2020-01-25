import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTournaments } from "../../store/TournamentStore/TournamentHooks";
import { TournamentList } from "./TournamentList";

export const TournamentsContainer: FC = () => {
  const { tournaments } = useTournaments();

  return (
    <>
      <div className="tournaments">
        <TournamentList tournaments={tournaments} />
      </div>
      <style jsx>{`
        .tournaments {
          margin: ${Dimensions.GUTTER_SIZE};
        }
      `}</style>
    </>
  );
};
