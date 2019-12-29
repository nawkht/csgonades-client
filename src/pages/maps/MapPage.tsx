import { FC } from "react";
import { Layout } from "../../ui-common/layout/layout";
import { NadeLight } from "../../models/Nade/Nade";
import { NadeList } from "../../ui-common/NadeList";
import { NadeFilter } from "./NadeFilter";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { CsgoMap } from "../../models/Nade/CsGoMap";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapPage: FC<Props> = ({ nades, map }) => {
  const theme = useTheme();

  return (
    <Layout>
      <NadeFilter map={map} />
      <div className="nade-list">
        <NadeList nades={nades} />
      </div>
      <style jsx>{`
        .nade-list {
          margin: ${theme.uiDimensions.OUTER_GUTTER_SIZE}px;
          margin-left: ${theme.isMobile
            ? 0
            : theme.uiDimensions.OUTER_GUTTER_SIZE + 35}px;
          margin-top: ${theme.isMobile
            ? 50
            : theme.uiDimensions.OUTER_GUTTER_SIZE}px;
        }
      `}</style>
    </Layout>
  );
};
