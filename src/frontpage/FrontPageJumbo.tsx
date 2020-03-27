import { FC, memo } from "react";
import { PageCentralize } from "../common/PageCentralize";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

export const FrontPageJumbo: FC = memo(() => {
  const { colors } = useTheme();
  return (
    <>
      <div id="jumbo">
        <PageCentralize>
          <div id="jumbo-message">
            <h1>
              Hi, welcome to CSGO Nades.
              <br /> A community to learn and share
              <br /> nades for Counter-Strike Global Offensive.
            </h1>
            <div className="illustration" />
          </div>
        </PageCentralize>
      </div>
      <style jsx>{`
        #jumbo {
          background: linear-gradient(
            252.84deg,
            ${colors.jumboGradientStart} 33.44%,
            ${colors.jumboGradientEnd} 66.89%
          );
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          overflow: hidden;
          margin-bottom: 30px;
        }

        #jumbo-message {
          position: relative;
          display: block;
          padding-top: 100px;
          padding-bottom: 100px;
        }

        .illustration {
          position: absolute;
          bottom: -75px;
          right: 0;
          width: 350px;
          height: 350px;
          background: url("/images/ilustration.svg");
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          opacity: 0.9;
        }

        h1 {
          color: ${colors.TEXT};
          margin: 0;
          padding: 0;
          font-weight: 300;
          font-size: 2.2rem;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .illustration {
            width: 150px;
            height: 150px;
            bottom: -40px;
          }
        }
      `}</style>
    </>
  );
});
