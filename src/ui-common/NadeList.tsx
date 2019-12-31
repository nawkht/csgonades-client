import { FC, useMemo, useRef } from "react";
import { NadeItem } from "./NadeItem";
import { NadeLight } from "src/models/Nade/Nade";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import useComponentSize from "@rehooks/component-size";

interface Props {
  nades: NadeLight[];
  numItemsPerRow?: number;
  emptyMessage?: string;
}

const NadeList: FC<Props> = ({
  nades,
  numItemsPerRow = 4,
  emptyMessage = "No nades found"
}) => {
  const { uiDimensions, colors } = useTheme();
  const ref = useRef(null);
  const { width } = useComponentSize(ref);

  function nadeItemWidthCalc(totalWidth: number) {
    const totalSizeWithoutGutters =
      totalWidth - numItemsPerRow * uiDimensions.INNER_GUTTER_SIZE;
    return totalSizeWithoutGutters / numItemsPerRow;
  }

  const nadeItemWidth = nadeItemWidthCalc(width);
  const hasNades = nades.length > 0;

  return (
    <>
      <div id="nadelist" ref={ref}>
        {!hasNades && <div className="nadelist-nonades">{emptyMessage}</div>}
        {hasNades &&
          nades.map(nade => (
            <NadeItem key={nade.id} nade={nade} itemWidth={nadeItemWidth} />
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

          .nadelist-nonades {
            background: ${colors.WARNING};
            color: white;
            text-align: center;
            padding: 12px;
            font-size: 1.2em;
            border-radius: 3px;
            width: 100%;
          }
        `}
      </style>
    </>
  );
};

export { NadeList };
