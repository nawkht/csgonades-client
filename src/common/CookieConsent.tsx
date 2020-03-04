import { FC, memo, useMemo } from "react";
import { FaCookieBite } from "react-icons/fa";
import { useCookieConcent } from "../store/GlobalStore/GlobalHooks";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

export const CookieConsent: FC = memo(() => {
  const { colors } = useTheme();
  const { acceptCookieConcent, acceptedCookieConsent } = useCookieConcent();

  const wrapperClassName = useMemo(() => {
    const classNames = ["cookie-consent-wrapper"];
    if (!acceptedCookieConsent) {
      classNames.push("visible");
    }
    return classNames.join(" ");
  }, [acceptedCookieConsent]);

  return (
    <>
      <div className={wrapperClassName}>
        <div className="cookie-consent">
          <div className="cookie-icon">
            <FaCookieBite />
          </div>

          <div className="consent-txt">
            In order to give you a better service CSGO Nades uses{" "}
            <a href="/policy">cookies</a>. By continuing to browse the site you
            are agreeing to our use of cookies. We may also earn money when you
            click on <a href="/policy">links</a> on the site.
          </div>

          <div className="close-button">
            <button className="accept-btn" onClick={acceptCookieConcent}>
              I agree.
            </button>
          </div>
        </div>
      </div>
      <style jsx>{`
        .cookie-consent-wrapper {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 999;
          display: flex;
          justify-content: space-around;
          transform: translateY(100%);
          transition: all 0.2s;
        }

        .visible {
          transform: translateY(0);
        }

        .cookie-consent {
          max-width: 600px;
          border: 1px solid ${colors.BORDER};
          border-top-left-radius: 5px;
          border-top-right-radius: 5px;
          background: ${colors.DP01};
          color: ${colors.TEXT};
          padding: 6px;
          font-size: 0.75em;
          display: flex;
        }

        .cookie-icon {
          display: flex;
          align-items: center;
          font-size: 2em;
          margin-right: 6px;
        }

        .consent-txt {
          margin-right: 6px;
        }

        .close-button {
          display: flex;
          align-items: center;
        }

        .accept-btn {
          appearance: none;
          border: none;
          background: transparent;
          white-space: nowrap;
          padding: 6px;
          color: ${colors.TEXT};
          border-radius: 4px;
          font-weight: 300;
          border: 1px solid ${colors.TEXT};
          cursor: pointer;
          font-size: 1.2em;
          outline: none;
        }

        .accept-btn:hover {
          border: 1px solid ${colors.PRIMARY};
          color: ${colors.PRIMARY};
        }
      `}</style>
    </>
  );
});
