import { FC } from "react";
import { Layout } from "../../ui-common/layout/layout";
import { NadeFilter } from "./NadeFilter";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { capitalize } from "../../utils/Common";
import { useSelector } from "react-redux";
import { nadesSelector } from "../../store/NadeStore/NadeSelectors";
import { NadeListGrid } from "../../ui-common/NadeListGrid";

type Props = {
  map: CsgoMap;
};

export const MapPage: FC<Props> = ({ map }) => {
  const { uiDimensions } = useTheme();
  const nades = useSelector(nadesSelector);

  return (
    <Layout title={capitalize(map)}>
      <NadeFilter map={map} />
      <div className="nade-list">
        <NadeListGrid
          nades={nades}
          emptyMessage={`No nades found for ${capitalize(
            map
          )} on these settings, maybe you can add some!`}
        />
      </div>
      <style jsx>{`
        .nade-list {
          margin: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          margin-left: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          margin-top: ${uiDimensions.OUTER_GUTTER_SIZE}px;
          min-height: 100%;
        }
      `}</style>
    </Layout>
  );
};
