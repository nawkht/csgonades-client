import { FC } from "react";
import { NadeItem } from "./NadeItem";
import { NadeLight } from "src/models/Nade";
import { useRouter } from "next/router";
import { UiConstants } from "../../constants/ui";

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
        <div className="nadelist-nonade-container">
          <div className="nadelist-nonades">NO NADES FOUND</div>
        </div>
        <style jsx>{`
          .nadelist-nonade-container {
            padding: ${nadeListPadding}px;
            min-height: calc(100vh - ${UiConstants.HEADER_HEIGHT}px);
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-around;
          }
          .nadelist-nonades {
            background: white;
            text-align: center;
            padding: 12px;
            font-size: 1.2em;
            border-radius: 3px;
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
