import { FC } from "react";
import { NadeItem } from "./NadeItem";
import { NadeLight } from "src/models/Nade/Nade";
import { redirectNadePage } from "../utils/Common";
import { useTheme } from "../store/LayoutStore/LayoutHooks";

interface Props {
  nades: NadeLight[];
}

const NadeList: FC<Props> = ({ nades }) => {
  const { uiDimensions } = useTheme();

  function onNadeClick(id: string) {
    redirectNadePage(id);
  }

  if (nades.length === 0) {
    return (
      <>
        <div className="nadelist-nonade-container">
          <div className="nadelist-nonades">NO NADES FOUND</div>
        </div>
        <style jsx>{`
          .nadelist-nonade-container {
            padding: ${uiDimensions.OUTER_GUTTER_SIZE}px;
            min-height: calc(100vh - ${uiDimensions.HEADER_HEIGHT}px);
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
            flex-wrap: wrap;
          }
        `}
      </style>
    </>
  );
};

export { NadeList };
