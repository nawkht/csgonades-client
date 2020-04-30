import { FC } from "react";
import { DBNadeList } from "./DBNadeList";
import { useIsSignedIn } from "../store/AuthStore/AuthHooks";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {};

export const DashboardPage: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const isSignedIn = useIsSignedIn();

  if (!isSignedIn) {
    return null;
  }

  return (
    <>
      <div id="dashboard-page">
        <h1 id="title">Your nades</h1>
        <div id="newnade"></div>
        <div id="nade-list">
          <DBNadeList />
        </div>
      </div>
      <style jsx>{`
        #dashboard-page {
          grid-area: main;
          margin: ${Dimensions.GUTTER_SIZE}px;
          background: ${colors.DP02};
          padding: 20px 30px;
          border-radius: 5px;
          max-width: 1000px;
          display: grid;
          grid-template-columns: 1fr 1fr min-content;
          grid-template-rows: min-content min-content;
          grid-template-areas:
            "title title newnade"
            "nades nades nades";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          margin-bottom: 100px;
        }

        #title {
          grid-area: title;
          margin: 0;
          padding: 0;
          font-size: 32px;
        }

        #newnade {
          grid-area: newnade;
        }

        #nade-list {
          grid-area: nades;
        }
      `}</style>
    </>
  );
};
