import { FC } from "react";
import { Nade } from "../../models/Nade/Nade";
import { useSimilarNades } from "../../store/NadeStore/NadeHooks";
import { NadeListGrid } from "../../ui-common/NadeListGrid";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";

type Props = {
  nade: Nade;
};

export const SimilarNades: FC<Props> = ({ nade }) => {
  const similarNades = useSimilarNades(nade);

  if (similarNades.length === 0) {
    return null;
  }

  function onNadeItemClickInSimilar() {
    GoogleAnalytics.event("Similar Nades", "Navigated to");
  }

  return (
    <>
      <div className="similar">
        <h3>Similar nades</h3>
        <NadeListGrid
          nades={similarNades}
          onItemClick={onNadeItemClickInSimilar}
        />
      </div>
      <style jsx>{`
        .similar {
          margin-top: 18px;
          padding-top: 18px;
        }

        h3 {
          font-weight: normal;
        }
      `}</style>
    </>
  );
};
