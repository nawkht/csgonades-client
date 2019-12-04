import { FC } from "react";
import { Icon } from "semantic-ui-react";

type Props = {
  title: string;
};

export const NadeTitlebar: FC<Props> = ({ title }) => {
  const nadeTile = title.length > 0 ? title : "No title";

  return (
    <>
      <div className="nade-title">
        <Icon className="back-icon" name="chevron left" size="large" />
        <h1>{nadeTile}</h1>

        <Icon className="favorite-icon" name="heart outline" size="large" />
      </div>
      <style jsx>{`
        .nade-title {
          display: flex;
          align-items: center;
          padding: 12px;
        }

        .nade-title h1 {
          display: inline-block;
          padding: 0;
          margin: 0;
          font-size: 1.9em;
          margin-left: 12px;
          font-weight: normal;
          flex: 1;
        }
      `}</style>
    </>
  );
};
