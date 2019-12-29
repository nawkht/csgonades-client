import { FC } from "react";
import { Popup } from "semantic-ui-react";
import { NadeType } from "../../models/Nade/NadeType";

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
      <div className={className} onClick={onClick}>
        <Popup
          size="mini"
          inverted
          content={type}
          style={{ padding: 6 }}
          offset="0, 6px"
          position="right center"
          trigger={<div className="icon" />}
        />
      </div>
      <style jsx>{`
        .type-toggler {
          padding: 6px;
          display: flex;
          align-items: center;
          opacity: 0.3;
          cursor: pointer;
          transition: opacity 0.3s;
        }

        .type-toggler.active {
          opacity: 1;
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

function iconFromType(type: NadeType) {
  switch (type) {
    case "flash":
      return "/icons/grenades/flash.png";
    case "he-grenade":
      return "/icons/grenades/grenade.png";
    case "molotov":
      return "/icons/grenades/molotov.png";
    case "smoke":
      return "/icons/grenades/smoke.png";
    default:
      console.warn("Provided unsupported type", type);
      return "";
  }
}
