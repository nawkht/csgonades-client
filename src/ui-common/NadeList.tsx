import { FC } from "react";
import { NadeItem } from "./NadeItem";
import { NadeLight } from "src/models/Nade";
import { useRouter } from "next/router";

interface Props {
  nades: NadeLight[];
  padding?: number;
}

const NadeList: FC<Props> = ({ nades, padding }) => {
  const router = useRouter();

  const nadeListPadding = typeof padding === "undefined" ? 18 : padding;

  function onNadeClick(id: string) {
    router.push(`/nades/${id}`);
  }

  if (nades.length === 0) {
    return (
      <>
        <div className="nadelist-nonades">No nades :(</div>
        <style jsx>{`
          .nadelist-nonades {
            background: white;
            text-align: center;
            padding: ${nadeListPadding}px;
            font-size: 1.4em;
          }
        `}</style>
      </>
    );
  }

  return (
    <>
      <div id="nadelist">
        {nades.map(nade => (
          <NadeItem onClick={onNadeClick} key={nade.title} nade={nade} />
        ))}
      </div>
      <style jsx>
        {`
          #nadelist {
            display: flex;
            padding: ${nadeListPadding}px;
          }
        `}
      </style>
    </>
  );
};

export { NadeList };
