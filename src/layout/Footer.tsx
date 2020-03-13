import Link from "next/link";
import { FC } from "react";
import { PageCentralize } from "../common/PageCentralize";
import { APP_VERSION, Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

export const Footer: FC = () => {
  const { colors } = useTheme();

  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer">
        <PageCentralize>
          <div className="footer-content">
            <div className="copyright">
              © {year} CSGO Nades <span className="version">{APP_VERSION}</span>
            </div>
            <div className="footer-links">
              <Link href="/privacypolicy" as="/privacypolicy" prefetch={false}>
                <a>Privacy Policy</a>
              </Link>{" "}
              |{" "}
              <Link href="/contact" as="/contact" prefetch={false}>
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
        </PageCentralize>
      </div>
      <style jsx>{`
        .footer {
          background: ${colors.footerBg};
          padding-top: 20px;
          padding-bottom: 20px;
        }

        .footer-content {
          display: flex;
          color: ${colors.footerColor};
        }

        .footer .copyright {
          flex: 1;
        }

        .footer .footer-links {
          flex: 2;
          text-align: center;
        }

        .footer .footer-links a {
          color: ${colors.footerColor};
        }

        .footer .footer-links a:hover {
          text-decoration: underline;
        }

        .powered-by {
          flex: 1;
          text-align: right;
        }

        .powered-by a {
          color: ${colors.footerColor};
        }

        .powered-by a:hover {
          text-decoration: underline;
        }

        .version {
          opacity: 0.2;
          font-size: 0.75rem;
          margin-left: 6px;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .footer-content {
            flex-direction: column;
            align-items: center;
          }

          .copyright,
          .footer-links {
            margin-bottom: 20px;
          }
        }
      `}</style>
    </>
  );
};
