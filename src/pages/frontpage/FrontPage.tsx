import { FC } from "react";
import { useSelector } from "react-redux";
import { Dimensions } from "../../constants/Constants";
import { recentNadesSelector } from "../../store/NadeStore/NadeSelectors";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { Layout } from "../../ui-common/Layout";
import { NadeListGrid } from "../../ui-common/NadeListGrid";
import { FrontPageJumbo } from "./FrontPageJumbo";
import { FrontPageStats } from "./FrontPageStats";
import { TournamentsContainer } from "./Tournaments";

export const FrontPage: FC = () => {
  const { colors } = useTheme();
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
          margin: ${Dimensions.GUTTER_SIZE};
        }

        .recent-nades h3 {
          color: ${colors.TEXT};
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .recent-nades {
            margin: ${Dimensions.PADDING_MEDIUM};
          }

          .recent-nades h3 {
            margin-top: ${Dimensions.PADDING_HUGE};
          }
        }
      `}</style>
    </Layout>
  );
};
