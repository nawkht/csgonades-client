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
        position="bottom center"
        inverted
        mouseEnterDelay={500}
        size="tiny"
        trigger={
          <div className={className} onClick={onClick}>
            <div className="icon" />
          </div>
        }
      />

      <style jsx>{`
        .type-toggler {
          padding: 6px 10px;
          display: flex;
          align-items: center;
          cursor: pointer;
          background: #e0e1e2;
          transition: background 0.2s;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          margin-right: 3px;
        }

        .type-toggler:last-child {
          border-right: none;
        }

        .type-toggler:hover {
          background: #c0c1c2;
        }

        .type-toggler.active {
          background: #c0c1c2;
        }

        .icon {
          display: inline-block;
          width: 25px;
          height: 25px;
          background: url(${iconUrl});
          background-size: 25px;
        }
      `}</style>
    </>
  );
};
