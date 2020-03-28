import { FC, memo, useEffect, useMemo, useState } from "react";
import { FaCookieBite } from "react-icons/fa";
import { Dimensions } from "../constants/Constants";
import { useCookieConcent } from "../store/GlobalStore/GlobalHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { ezFirstInit } from "../layout/useAdRefresher";

export const CookieConsent: FC = memo(() => {
  const [render, setRender] = useState(false);
  const { colors } = useTheme();
  const { acceptCookieConcent, acceptedCookieConsent } = useCookieConcent();

  useEffect(() => {
    const renderTimer = setTimeout(() => {
      setRender(true);
    }, 2000);
    return () => clearTimeout(renderTimer);
  }, []);

  const wrapperClassName = useMemo(() => {
    const classNames = ["cookie-consent-wrapper"];
    if (!acceptedCookieConsent && render) {
      classNames.push("visible");
    }
    return classNames.join(" ");
  }, [acceptedCookieConsent, render]);

  function onCookieConsentAccept() {
    ezFirstInit();
    acceptCookieConcent();
  }

  return (
    <>
      <div className={wrapperClassName}>
        <div className="cookie-consent">
          <div className="cookie-icon">
            <FaCookieBite />
          </div>

          <div className="consent-txt">
            In order to give you a better service CSGO Nades uses{" "}
            <a href="/policy">cookies</a> for analytics and advertising. By
            continuing to browse the site you are agreeing to our use of
            cookies.
          </div>

          <div className="close-button">
            <button className="accept-btn" onClick={onCookieConsentAccept}>
              I Accept
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cookie-consent-wrapper {
          position: fixed;
          bottom: 50px;
          left: 0;
          right: 0;
          z-index: 999;
          display: flex;
          justify-content: space-around;
          display: flex;
          transform: translateY(200%);
          transition: transform 0.15s;
          margin-left: 20px;
          margin-right: 20px;
        }

        .visible {
          transform: translateY(0);
        }

        .cookie-consent {
          max-width: 500px;
          border-radius: 5px;
          background: rgba(0, 0, 0, 0.95);
          color: #fff;
          padding: 20px 30px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 18px;
        }

        .cookie-icon {
          display: flex;
          align-items: center;
          font-size: 2em;
          margin-bottom: 10px;
        }

        .consent-txt {
          margin-bottom: 20px;
        }

        .close-button {
          display: flex;
          align-items: center;
        }

        .accept-btn {
          appearance: none;
          border: none;
          background: ${colors.PRIMARY};
          white-space: nowrap;
          padding: 10px 20px;
          color: #fff;
          border-radius: 5px;
          font-weight: 300;
          border: none;
          cursor: pointer;
          font-size: 1em;
          outline: none;
        }

        .accept-btn:hover {
          border: 1px solid ${colors.PRIMARY};
          color: ${colors.PRIMARY};
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
        }
      `}</style>
    </>
  );
});
