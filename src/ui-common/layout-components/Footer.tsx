import Link from "next/link";
import { FC } from "react";
import { Dimensions } from "../../constants/Constants";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

export const Footer: FC = () => {
  const { colors } = useTheme();

  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer">
        <div className="copyright">© {year} CSGO Nades</div>
        <div className="footer-links">
          <Link href="/about" as="/about">
            <a>About</a>
          </Link>{" "}
          |{" "}
          <Link href="/privacypolicy" as="/privacypolicy">
            <a>Privacy Policy</a>
          </Link>{" "}
          |{" "}
          <Link href="/contact" as="/contact">
            <a>Contact</a>
          </Link>
        </div>
        <div className="powered-by">
          Powered by{" "}
          <a href="https://steamcommunity.com/" rel="nofollow">
            Steam
          </a>
        </div>
      </div>
      <style jsx>{`
        .footer {
          background: ${colors.footerBg};
          color: ${colors.footerColor};
          display: flex;
          height: 100%;
          margin-left: ${Dimensions.SIDEBAR_WIDTH};
        }

        .footer .copyright {
          padding: ${Dimensions.PADDING_MEDIUM};
        }

        .footer .footer-links {
          flex: 1;
          text-align: center;
          padding: ${Dimensions.PADDING_MEDIUM};
          text-align: center;
        }

        .footer .footer-links a {
          color: ${colors.footerColor};
        }

        .footer .footer-links a:hover {
          text-decoration: underline;
        }

        .powered-by {
          padding: ${Dimensions.PADDING_MEDIUM};
        }

        .powered-by a {
          color: ${colors.footerColor};
        }

        .powered-by a:hover {
          text-decoration: underline;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .footer {
            flex-direction: column;
            margin-left: 0;
          }
          .footer .copyright {
            text-align: center;
          }

          .powered-by {
            text-align: center;
          }
        }
      `}</style>
    </>
  );
};
