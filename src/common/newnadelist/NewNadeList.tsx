import { FC } from "react";
import { NadeLight } from "../../models/Nade/Nade";
import { NadeItem } from "../nadeitem/NadeItem";

type Props = {
  ssrNades: NadeLight[];
};

const maxWidth = 1200;
const spacing = 60;
const width = (maxWidth - 2 * spacing) / 3;

// itemWidth spacing itemWidth spacing itemWidth

export const NewNadeList: FC<Props> = ({ ssrNades }) => {
  console.log({
    width,
    spacing,
  });
  return (
    <>
      <div className="new-nade-list">
        {ssrNades.map(n => (
          <div key={n.id} className="nade-item">
            <NadeItem nade={n} />
          </div>
        ))}
      </div>
      <style jsx>{`
        .new-nade-list {
          display: flex;
          flex-wrap: wrap;
        }

        .nade-item {
          width: 30%;
        }
      `}</style>
    </>
  );
};
