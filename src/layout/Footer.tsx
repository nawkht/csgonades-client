import Link from "next/link";
import { FC, memo } from "react";
import { APP_VERSION, Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

export const Footer: FC = memo(() => {
  const { colors } = useTheme();

  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer">
        <div className="footer-content">
          <div className="left-content">
            <div className="copyright">
              © {year} CSGO Nades <span className="version">{APP_VERSION}</span>
            </div>
            <div className="footer-links">
              <Link href="/privacypolicy" as="/privacypolicy" prefetch={false}>
                <a>Privacy Policy</a>
              </Link>
              <Link href="/contact" as="/contact" prefetch={false}>
                <a>Contact</a>
              </Link>
            </div>
          </div>

          <div className="powered-by">
            Powered by{" "}
            <a href="https://steamcommunity.com/" rel="nofollow">
              Steam
            </a>
          </div>
        </div>
      </div>
      <style jsx>{`
        a {
          color: white;
        }

        a:hover {
          text-decoration: underline;
        }

        .footer {
          background: ${colors.PRIMARY};
          padding: 50px ${Dimensions.GUTTER_SIZE}px;
        }

        .footer-content {
          display: flex;
          color: ${colors.footerColor};
        }

        .copyright {
          margin-bottom: 30px;
        }

        .footer-links {
          display: flex;
          flex-direction: column;
        }

        .footer-links a {
          margin-bottom: 10px;
        }

        .powered-by {
          flex: 1;
          text-align: right;
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
});
