import Link from "next/link";
import { FC } from "react";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

export const Footer: FC = () => {
  const { colors, uiDimensions, durations, layers } = useTheme();

  return (
    <>
      <div className="footer">
        <div className="copyright">© 2019 CSGO Nades</div>
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
          <a href="" rel="nofollow">
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
            font-size: 0.7em;
          }
        }
      `}</style>
    </>
  );
};
