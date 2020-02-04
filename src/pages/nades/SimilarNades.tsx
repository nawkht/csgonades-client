import { FC } from "react";
import { Nade } from "../../models/Nade/Nade";
import { useSimilarNades } from "../../store/NadeStore/NadeHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { NadeListGrid } from "../../ui-common/NadeListGrid";

type Props = {
  nade: Nade;
};

export const SimilarNades: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  const similarNades = useSimilarNades(nade);

  if (similarNades.length === 0) {
    return null;
  }

  return (
    <>
      <div className="similar">
        <h3>Similar nades</h3>
        <NadeListGrid nades={similarNades} />
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
