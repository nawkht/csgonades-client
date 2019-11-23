import { FC } from "react";
import { NadeItem } from "./NadeItem";
import { Nade } from "src/models/Nade";

interface Props {
  nades: Nade[];
}

const NadeList: FC<Props> = ({ nades }) => {
  return (
    <>
      <div id="nadelist">
        {nades.map(nade => (
          <NadeItem key={nade.title} nade={nade} />
        ))}
      </div>
      <style jsx>
        {`
          #nadelist {
            display: flex;
            margin-right: -16px;
            margin-bottom: -16px;
          }
        `}
      </style>
    </>
  );
};

export { NadeList };
