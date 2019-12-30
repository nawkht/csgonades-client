import { FC, useMemo, useRef } from "react";
import { NadeItem } from "./NadeItem";
import { NadeLight } from "src/models/Nade/Nade";
import { redirectNadePage } from "../utils/Common";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import useComponentSize from "@rehooks/component-size";

interface Props {
  nades: NadeLight[];
}

const NadeList: FC<Props> = ({ nades }) => {
  const { uiDimensions } = useTheme();
  const ref = useRef(null);
  const { width } = useComponentSize(ref);
  const numItemsPerRow = 4;

  const nadeItemWidth = useMemo(() => {
    const totalSizeWithoutGutters =
      width - numItemsPerRow * uiDimensions.INNER_GUTTER_SIZE;
    return totalSizeWithoutGutters / numItemsPerRow;
  }, [width]);

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
      <div id="nadelist" ref={ref}>
        {nades.map(nade => (
          <NadeItem
            onClick={onNadeClick}
            key={nade.title}
            nade={nade}
            itemWidth={nadeItemWidth}
          />
        ))}
      </div>
      <style jsx>
        {`
          #nadelist {
            display: flex;
            flex-wrap: wrap;
            flex-direction: row;
            margin-right: -${uiDimensions.INNER_GUTTER_SIZE / 2}px;
            margin-left: -${uiDimensions.INNER_GUTTER_SIZE / 2}px;
          }
        `}
      </style>
    </>
  );
};

export { NadeList };
