import { FC } from "react";
import { Nade } from "../../models/Nade/Nade";
import { useCanEditNade } from "../../store/NadeStore/hooks/useCanEditNade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { EditButton } from "./EditButton";
import { NadeDescriptionDisplay } from "./NadeDescriptionDisplay";
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
          <EditButton
            allowEdit={allowEdit}
            onClick={onEditMeta}
            offsetTop={5}
            offsetRight={5}
          >
            <NadeMeta nade={nade} />
          </EditButton>

          <EditButton
            allowEdit={allowEdit}
            onClick={onEditTitle}
            offsetTop={5}
            offsetRight={5}
          >
            <NadeDescriptionDisplay value={nade.description} />
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
      `}</style>
    </>
  );
};
