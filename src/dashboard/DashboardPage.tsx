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
        <h1 id="title">DASHBOARD</h1>
        <div id="nade-list">
          <h2>Your nades</h2>
          <DBNadeList />
        </div>
      </div>
      <style jsx>{`
        #dashboard-page {
          grid-area: main;
          margin: ${Dimensions.GUTTER_SIZE}px;
          background: ${colors.DP02};
          border-radius: 5px;
          max-width: 1200px;
          display: grid;
          grid-template-columns: 1fr 1fr min-content;
          grid-template-rows: min-content min-content;
          grid-template-areas:
            "title title title"
            "nades nades nades";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          margin-bottom: 100px;
          overflow: hidden;
        }

        #title {
          grid-area: title;
          margin: 0;
          padding: 0;
          font-size: 20px;
          padding: 20px 30px;
          background: ${colors.PRIMARY};
          color: white;
        }

        h2 {
          font-size: 20px;
          margin: 0;
          padding: 0;
          margin-bottom: 20px;
        }

        #nade-list {
          grid-area: nades;
          padding: 0px 30px 20px 30px;
        }
      `}</style>
    </>
  );
};
