import Link from "next/link";
import { FC } from "react";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

export const Footer: FC = () => {
  const { colors, uiDimensions } = useTheme();

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
          background: ${colors.PRIMARY};
          color: white;
          display: flex;
          height: 100%;
          margin-left: ${uiDimensions.SIDEBAR_WIDTH}px;
        }

        .footer .copyright {
          padding: ${uiDimensions.PADDING_MEDIUM}px;
        }

        .footer .footer-links {
          flex: 1;
          text-align: center;
          padding: ${uiDimensions.PADDING_MEDIUM}px;
          text-align: center;
        }

        .footer .footer-links a {
          color: white;
        }

        .footer .footer-links a:hover {
          color: white;
          text-decoration: underline;
        }

        .powered-by {
          padding: ${uiDimensions.PADDING_MEDIUM}px;
        }

        .powered-by a {
          color: white;
        }

        .powered-by a:hover {
          text-decoration: underline;
        }

        @media only screen and (max-width: ${uiDimensions.MOBILE_THRESHHOLD}px) {
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
