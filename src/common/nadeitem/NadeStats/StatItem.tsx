import { FC } from "react";
import { kFormatter } from "../../../utils/Common";

type Props = {
  alwaysShow?: boolean;
  hidden?: boolean;
  count: number;
  icon: any;
  color: string;
  iconColor?: string;
};

export const StatItem: FC<Props> = ({
  count,
  icon,
  color,
  hidden,
  iconColor,
  alwaysShow,
}) => {
  if ((hidden || !count) && !alwaysShow) {
    return null;
  }

  return (
    <>
      <div className="stat">
        <div className="icon">{icon}</div>
        <div className="count">{kFormatter(count)}</div>
      </div>
      <style jsx>{`
        .stat {
          color: ${color};
          display: flex;
          font-size: 11px;
          font-weight: 400;
          margin-right: 15px;
        }

        .icon {
          position: relative;
          font-size: 12px;
          top: 1px;
          margin-right: 2px;
          color: ${iconColor || color};
        }
      `}</style>
    </>
  );
};
