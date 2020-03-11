import { FC } from "react";
import { NadeListGrid } from "../common/NadeListGrid";
import { Nade } from "../models/Nade/Nade";
import { useSimilarNades } from "../store/NadeStore/NadeHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

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
        }

        h3 {
          font-weight: 300;
          color: ${colors.TEXT};
          margin-bottom: 30px;
          font-size: 24px;
        }
      `}</style>
    </>
  );
};
