import { FC, useMemo } from "react";
import { Status } from "../../models/Nade/Nade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { iconFromType, generateTitle } from "../../utils/Common";
import { NadeType } from "../../models/Nade/NadeType";

type Props = {
  type?: NadeType;
  title?: string;
  oneWay?: boolean;
  startPosition?: string;
  endPosition?: string;
  status: Status;
};

export const NadeItemTitle: FC<Props> = ({
  title,
  type,
  status,
  startPosition,
  endPosition,
  oneWay,
}) => {
  const { colors } = useTheme();
  const iconUrl = iconFromType(type);
  const generatedTitle = generateTitle(
    title,
    startPosition,
    endPosition,
    type,
    oneWay
  );

  const titleClassName = useMemo(() => {
    const classNames = ["title"];
    if (status === "pending") {
      classNames.push("pending");
    }
    if (status === "declined") {
      classNames.push("declined");
    }
    return classNames.join(" ");
  }, [status]);

  return (
    <>
      <div className={titleClassName}>
        {iconUrl && (
          <img
            className="nade-type-icon"
            src={iconUrl}
            alt={`nade icon ${type}`}
          />
        )}

        <div className="title-text">{generatedTitle}</div>
      </div>
      <style jsx>{`
        .title {
          position: relative;
          background: ${colors.DP02};
          color: ${colors.TEXT};
          padding: 10px;
          overflow: hidden;
        }

        .nade-type-icon {
          position: absolute;
          bottom: 0;
          right: 0;
          transform: scale(1.1) translateY(20px) translateX(10px);
          opacity: 0.5;
        }

        .title-text {
          grid-area: title;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          font-size: 17px;
          text-align: center;
        }

        .title.pending {
          border: 1px solid ${colors.WARNING};
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }

        .title.declined {
          border: 1px solid ${colors.ERROR};
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
        }
      `}</style>
    </>
  );
};
