import { FC } from "react";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

const AUTH_URL =
  process.env.NODE_ENV === "production"
    ? "https://api.csgonades.com/auth/steam"
    : "http://localhost:5000/auth/steam";

const FrontPageJumbo: FC = () => {
  const { colors } = useTheme();
  return (
    <>
      <div id="jumbo">
        <div id="jumbo-message">
          <h2 className="subtitle">
            Find the perfect smoke, flashbang, HE grenade or molotov!
          </h2>
          <p>
            We got something for every active duty map in CS:GO and some more.
          </p>
          <p>Are you a nade wizard? Then sign in and add your own.</p>
          <a className="jumbo-cta-link" href={AUTH_URL} rel="nofollow">
            <button className="jumbo-cta">Sign In</button>
          </a>
        </div>
        <div className="illustration" />
      </div>
      <style jsx>{`
        #jumbo {
          background: url("/images/hero.svg");
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          display: flex;
          flex-direction: row;
        }

        #jumbo-message {
          display: inline-block;
          background: rgba(255, 255, 255, 0.75);
          padding: 48px 100px 48px ${Dimensions.GUTTER_SIZE};
          clip-path: polygon(0 0, 90% 0, 100% 100%, 0 100%);
        }

        .illustration {
          position: relative;
          top: 50px;
          flex: 1;
          background: url("/images/ilustration.svg");
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
          margin-right: ${Dimensions.GUTTER_SIZE};
        }

        .jumbo-cta {
          outline: none;
          background: ${colors.primaryBtnBg};
          border: none;
          padding: 12px 18px;
          font-size: 1.2em;
          border-radius: 8px;
          color: white;
          font-weight: 300;
          cursor: pointer;
          transition: background 0.15s;
          margin-top: 24px;
        }

        .jumbo-cta:hover {
          background: ${colors.primaryBtnHover};
        }

        h2 {
          color: #121212;
          margin: 0;
          padding: 0;
          margin-bottom: 24px;
          font-size: 2em;
          font-weight: 300;
        }

        p {
          color: #121212;
          font-weight: 300;
          font-size: 1.1em;
          margin-bottom: 6px;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          #jumbo {
            flex-direction: column;
          }

          #jumbo-message {
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
            padding: ${Dimensions.PADDING_MEDIUM};
          }
        }
      `}</style>
    </>
  );
};

export { FrontPageJumbo };
