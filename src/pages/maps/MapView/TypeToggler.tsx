import { FC } from "react";
import { Popup } from "semantic-ui-react";
import { NadeType, nadeTypeString } from "../../../models/Nade/NadeType";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { iconFromType } from "../../../utils/Common";

type Props = {
  active: boolean;
  type: NadeType;
  onClick: () => void;
};

export const TypeToggler: FC<Props> = ({ type, onClick, active }) => {
  const { colors } = useTheme();
  const iconUrl = iconFromType(type);

  const className = `type-toggler ${active ? "active" : ""}`;

  return (
    <>
      <Popup
        content={nadeTypeString(type)}
        hoverable
        position="right center"
        inverted
        mouseEnterDelay={500}
        openOnTriggerClick={false}
        size="tiny"
        trigger={
          <div className={className} onClick={onClick}>
            <div className="icon" />
          </div>
        }
      />

      <style jsx>{`
        .type-toggler {
          display: flex;
          height: 45px;
          width: 45px;
          justify-content: space-around;
          padding-right: 3px;
          align-items: center;
          cursor: pointer;
          background: ${colors.filterBg};
          transition: background 0.2s;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .type-toggler:first-child {
          border-top-right-radius: 4px;
        }

        .type-toggler:last-child {
          border-bottom-right-radius: 4px;
          border-bottom: none;
        }

        .type-toggler:hover {
          background: ${colors.filterBgHover};
        }

        .type-toggler.active {
          background: ${colors.filterBgHover};
        }

        .icon {
          display: block;
          width: 25px;
          height: 25px;
          background: url(${iconUrl});
          background-size: 25px;
          background-position: center;
        }
      `}</style>
    </>
  );
};
