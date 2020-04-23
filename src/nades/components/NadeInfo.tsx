import { FC } from "react";
import { Nade } from "../../models/Nade/Nade";
import { useCanEditNade } from "../../store/NadeStore/hooks/useCanEditNade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { EditButton } from "./EditButton";
import { NadeDescriptionDisplay } from "./NadeDescriptionDisplay";
import { NadeDetails } from "./NadeDetails";

type Props = {
  nade: Nade;
  onEditTitle: () => void;
};

export const NadeInfo: FC<Props> = ({ nade, onEditTitle }) => {
  const allowEdit = useCanEditNade(nade);
  const { colors } = useTheme();

  return (
    <>
      <div className="nade-info">
        <NadeDetails nade={nade} />
        <div className="nade-desc-meta">
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
          background: ${colors.DP03};
          border-radius: 5px;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
