import { FC } from "react";
import { FrontPageStats } from "./FrontPageStats";
import { Layout } from "../../ui-common/layout/layout";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { NadeList } from "../../ui-common/NadeList";
import { useSelector } from "react-redux";
import { nadesSelector } from "../../store/NadeStore/NadeSelectors";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

export const FrontPage: FC = () => {
  const { uiDimensions } = useTheme();
  const nades = useSelector(nadesSelector);

  return (
    <Layout>
      <FrontPageJumbo />
      <FrontPageStats />
      <div className="recent-nades">
        <h3>Most recent nades</h3>
        <NadeList nades={nades} />
      </div>
      <style jsx>{`
        .recent-nades {
          margin: ${uiDimensions.OUTER_GUTTER_SIZE}px;
        }
      `}</style>
    </Layout>
  );
};
