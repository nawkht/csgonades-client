import { FC } from "react";
import { Nade } from "../../models/Nade/Nade";
import { NadeDescriptionDisplay } from "../../nades/NadeDescription/NadeDescriptionDisplay";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { NadeDetails } from "./NadeDetails";
import { NadeMeta } from "./NadeMeta";

type Props = {
  nade: Nade;
};

export const NadeInfo: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="nade-info">
        <NadeDetails nade={nade} />
        <div className="nade-desc-meta">
          <div className="nade-desc">
            <NadeDescriptionDisplay value={nade.description} />
          </div>
          <div className="nade-meta">
            <NadeMeta nade={nade} />
          </div>
        </div>
      </div>
      <style jsx>{`
        .nade-info {
          box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
          background: ${colors.boxBg};
          border-radius: 5px;
          overflow: hidden;
        }

        .nade-desc-meta {
          display: flex;
        }

        .nade-desc {
          padding: 30px 40px;
          flex: 1;
          color: ${colors.TEXT};
        }
      `}</style>
    </>
  );
};
