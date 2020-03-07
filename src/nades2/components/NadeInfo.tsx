import { FC } from "react";
import { Nade } from "../../models/Nade/Nade";
import { NadeDescriptionDisplay } from "../../nades/NadeDescription/NadeDescriptionDisplay";
import { useCanEditNade } from "../../store/NadeStore/NadeHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { EditButton } from "./EditButton";
import { NadeDetails } from "./NadeDetails";
import { NadeMeta } from "./NadeMeta";

type Props = {
  nade: Nade;
  onEditTitle: () => void;
  onEditMeta: () => void;
};

export const NadeInfo: FC<Props> = ({ nade, onEditTitle, onEditMeta }) => {
  const allowEdit = useCanEditNade(nade);
  const { colors } = useTheme();

  return (
    <>
      <div className="nade-info">
        <NadeDetails nade={nade} />
        <div className="nade-desc-meta">
          <div className="nade-desc">
            <EditButton
              allowEdit={allowEdit}
              onClick={onEditTitle}
              offsetTop={0}
              offsetRight={0}
            >
              <NadeDescriptionDisplay value={nade.description} />
            </EditButton>
          </div>
          <EditButton
            allowEdit={allowEdit}
            onClick={onEditMeta}
            offsetTop={30}
            offsetRight={40}
          >
            <div className="nade-meta">
              <NadeMeta nade={nade} />
            </div>
          </EditButton>
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
