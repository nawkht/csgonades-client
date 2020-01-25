import { FC } from "react";
import { Popup } from "semantic-ui-react";
import { NadeType, nadeTypeString } from "../../../models/Nade/NadeType";
import { iconFromType } from "../../../utils/Common";

type Props = {
  active: boolean;
  type: NadeType;
  onClick: () => void;
};

export const TypeToggler: FC<Props> = ({ type, onClick, active }) => {
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
          background: #292929;
          transition: background 0.2s;
          border-bottom: 1px solid #000;
        }

        .type-toggler:first-child {
          border-top-right-radius: 4px;
        }

        .type-toggler:last-child {
          border-bottom-right-radius: 4px;
          border-bottom: none;
        }

        .type-toggler:hover {
          background: #151515;
        }

        .type-toggler.active {
          background: #151515;
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
