import { FC, useMemo } from "react";
import { Dimensions } from "../../constants/Constants";
import { NadeLight } from "../../models/Nade/Nade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { iconFromType } from "../../utils/Common";

type Props = {
  nade: NadeLight;
};

export const NadeItemTitle: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();
  const iconUrl = iconFromType(nade.type);
  const title = nade.title || "No title...";

  const titleClassName = useMemo(() => {
    const classNames = ["title"];
    if (nade.status === "pending") {
      classNames.push("pending");
    }
    if (nade.status === "declined") {
      classNames.push("declined");
    }
    return classNames.join(" ");
  }, [nade.status]);

  return (
    <>
      <div className={titleClassName}>
        {iconUrl && (
          <img
            className="nade-type-icon"
            src={iconUrl}
            alt={`nade icon ${nade.type}`}
          />
        )}

        <span className="title-text">{title}</span>
      </div>
      <style jsx>{`
        .title {
          padding: 6px 12px;
          display: block;
          background: ${colors.nadeItemHeadingBg};
          color: ${colors.TEXT};
          display: flex;
          align-items: center;
          justify-content: center;
          border-bottom: 1px solid ${colors.BORDER};
        }

        .title-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .nade-type-icon {
          width: 15px;
          margin-right: ${Dimensions.PADDING_SMALL};
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
