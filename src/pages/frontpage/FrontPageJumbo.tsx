import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

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
          <h1 id="jumpo-title-container">
            <img src="/logo-horizontal.png" />
          </h1>
          <h2 className="subtitle">
            Find the perfect smoke, flashbang, HE grenade or molotov!
          </h2>
          <p>
            We got something for every active duty maps in CS:GO and some more.
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
          position: relative;
          padding: 16px;
          background: linear-gradient(
            rgba(38, 38, 38, 1),
            rgba(38, 38, 38, 0.9)
          );
          background-position: center;
          background-size: cover;
          display: flex;
          flex-direction: column;
          padding-top: 5rem;
          padding-bottom: 5rem;
        }

        #jumbo-message {
          display: inline-flex;
          align-self: center;
          flex-direction: column;
          align-items: center;
        }

        #jumpo-title-container {
          height: 50px;
          margin-bottom: 24px;
        }

        #jumpo-title-container img {
          display: block;
          height: 100%;
        }

        .jumbo-cta-link {
          margin-top: 24px;
        }

        .illustration {
          position: absolute;
          right: ${Dimensions.GUTTER_SIZE};
          top: calc(100% - 240px);
          height: 300px;
          width: 300px;
          background: url("/images/ilustration.svg");
          background-position: center;
          background-size: contain;
          background-repeat: no-repeat;
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
        }

        .jumbo-cta:hover {
          background: ${colors.primaryBtnHover};
        }

        h2 {
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          padding: 0;
          margin-bottom: 24px;
        }

        p {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 300;
          font-size: 1.1em;
          margin-bottom: 6px;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .illustration {
            width: 120px;
            height: 120px;
            top: calc(100% - 90px);
            right: ${Dimensions.PADDING_MEDIUM};
          }
        }
      `}</style>
    </>
  );
};

export { FrontPageJumbo };
