import { FC } from "react";
import { Layout } from "../../ui-common/layout/layout";
import { NadeLight } from "../../models/Nade/Nade";
import { NadeList } from "../../ui-common/NadeList";
import { NadeFilter } from "./NadeFilter";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { capitalize } from "../../utils/Common";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapPage: FC<Props> = ({ nades, map }) => {
  const { isMobile, uiDimensions } = useTheme();

  const numItemsPerRow = isMobile ? 1 : 4;

  return (
    <Layout>
      <NadeFilter map={map} />
      <div className="nade-list">
        <NadeList
          numItemsPerRow={numItemsPerRow}
          nades={nades}
          emptyMessage={`No nades found for ${capitalize(
            map
          )}, maybe you can add some!`}
        />
      </div>
      <style jsx>{`
        .nade-list {
          margin: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          margin-left: ${isMobile ? 0 : uiDimensions.OUTER_GUTTER_SIZE + 35}px;
          margin-top: ${isMobile ? 50 : uiDimensions.OUTER_GUTTER_SIZE}px;
        }
      `}</style>
    </Layout>
  );
};
