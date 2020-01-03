import { FC } from "react";
import { Layout } from "../../ui-common/layout/layout";
import { NadeList } from "../../ui-common/NadeList";
import { NadeFilter } from "./NadeFilter";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { capitalize } from "../../utils/Common";
import { useSelector } from "react-redux";
import { nadesSelector } from "../../store/NadeStore/NadeSelectors";

type Props = {
  map: CsgoMap;
};

export const MapPage: FC<Props> = ({ map }) => {
  const { isMobile, uiDimensions } = useTheme();
  const nades = useSelector(nadesSelector);
  const numItemsPerRow = isMobile ? 1 : 4;

  return (
    <Layout title={capitalize(map)}>
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
