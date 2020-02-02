import { FC } from "react";
import { Nade } from "../../models/Nade/Nade";
import { useIsAdmin } from "../../store/AuthStore/AuthHooks";
import { useSimilarNades } from "../../store/NadeStore/NadeHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { NadeListGrid } from "../../ui-common/NadeListGrid";
import { GoogleAnalytics } from "../../utils/GoogleAnalytics";

type Props = {
  nade: Nade;
};

export const SimilarNades: FC<Props> = ({ nade }) => {
  const isAdmin = useIsAdmin();
  const { colors } = useTheme();
  const similarNades = useSimilarNades(nade);

  if (similarNades.length === 0) {
    return null;
  }

  function onNadeItemClickInSimilar() {
    GoogleAnalytics.event({
      category: "Similar Nades",
      action: "Navigated to",
      label: nade.id,
      ignore: isAdmin
    });
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
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
