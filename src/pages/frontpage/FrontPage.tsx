import { FC } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { recentNadesSelector } from "../../store/NadeStore/NadeSelectors";
import { Layout } from "../../ui-common/layout/layout";
import { NadeListGrid } from "../../ui-common/NadeListGrid";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { FrontPageStats } from "./FrontPageStats";
import { TournamentsContainer } from "./Tournaments";

export const FrontPage: FC = () => {
  const { uiDimensions } = useTheme();
  const nades = useSelector(recentNadesSelector);

  return (
    <Layout canonical="">
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
            margin: 0;
          }
        }
      `}</style>
    </Layout>
  );
};
