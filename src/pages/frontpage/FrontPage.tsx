import { FC } from "react";
import { FrontPageStats } from "./FrontPageStats";
import { Layout } from "../../ui-common/layout/layout";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { useSelector } from "react-redux";
import { recentNadesSelector } from "../../store/NadeStore/NadeSelectors";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { NadeListGrid } from "../../ui-common/NadeListGrid";
import { TournamentsContainer } from "./Tournaments";

export const FrontPage: FC = () => {
  const { isMobile, uiDimensions } = useTheme();
  const nades = useSelector(recentNadesSelector);

  return (
    <Layout>
      <FrontPageJumbo />
      <FrontPageStats />
      <TournamentsContainer />
      <div className="recent-nades">
        <h3>Most recent nades</h3>
        <NadeListGrid nades={nades} />
      </div>
      <style jsx>{`
        .recent-nades {
          margin: ${uiDimensions.OUTER_GUTTER_SIZE}px;
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
          .recent-nades {
            margin-bottom: 50vh;
          }
        }
      `}</style>
    </Layout>
  );
};
