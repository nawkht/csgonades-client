import { FC } from "react";

type Props = {
  icon: any;
  label?: string;
  color: string;
};

export const NadeSpecial: FC<Props> = ({ color, label, icon }) => {
  return (
    <>
      <div className="special">
        <div className="icon">{icon}</div>
        {!!label && <div className="label">{label}</div>}
      </div>
      <style jsx>{`
        .special {
          color: ${color};
          display: flex;
          font-size: 11px;
          font-weight: 400;
          border: 1px solid red;
        }

        .icon {
          position: relative;
          font-size: 12px;
          top: 1px;
          margin-right: 2px;
        }
      `}</style>
    </>
  );
};
