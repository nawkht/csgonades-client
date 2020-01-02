import { FC, useMemo, useRef } from "react";
import { NadeItem } from "./NadeItem";
import { NadeLight } from "src/models/Nade/Nade";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import useComponentSize from "@rehooks/component-size";
import { useIsLoadingNade } from "../store/NadeStore/NadeSelectors";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  nades: NadeLight[];
  numItemsPerRow?: number;
  emptyMessage?: string;
  disableLoader?: boolean;
}

const NadeList: FC<Props> = ({
  nades,
  numItemsPerRow = 4,
  emptyMessage = "No nades found",
  disableLoader
}) => {
  const isLoading = useIsLoadingNade();
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

  const loading = disableLoader ? false : isLoading;

  return (
    <>
      <div id="nadelist" ref={ref}>
        {!hasNades && <div className="nadelist-nonades">{emptyMessage}</div>}
        {hasNades &&
          !loading &&
          nades.map(nade => (
            <NadeItem key={nade.id} nade={nade} itemWidth={nadeItemWidth} />
          ))}
        {loading && (
          <div style={{ marginTop: "30vh", width: "100%" }}>
            <Loader active inline="centered" />
          </div>
        )}
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
