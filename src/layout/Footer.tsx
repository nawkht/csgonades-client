import Link from "next/link";
import { FC, memo } from "react";
import { APP_VERSION, Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { FaDiscord, FaPaypal } from "react-icons/fa";
import { Popup } from "semantic-ui-react";

export const Footer: FC = memo(() => {
  const { colors } = useTheme();

  const year = new Date().getFullYear();

  return (
    <>
      <div className="footer">
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
        <div className="powered-by">
          Powered by{" "}
          <a href="https://steamcommunity.com/" rel="nofollow">
            Steam
          </a>
        </div>
        <div className="social">
          <Popup
            content={"Join Discord"}
            inverted
            size="tiny"
            position="left center"
            trigger={
              <a
                className="social-action"
                href="https://discord.gg/010h0KFCBNASyMUKv"
                rel="nofollow"
              >
                <FaDiscord />
              </a>
            }
          />

          <Popup
            content={"Donate Paypal"}
            inverted
            size="tiny"
            position="left center"
            trigger={
              <a
                className="social-action"
                href="https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=XHPRF8RJZKBHS&item_name=CSGO+Nades&currency_code=USD&source=url"
                rel="nofollow"
              >
                <FaPaypal />
              </a>
            }
          />
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
          display: grid;
          grid-template-columns: 1fr 1fr 200px;
          grid-template-columns: auto auto;
          grid-template-areas:
            "links  . powered"
            "copyright . social";
          grid-column-gap: ${Dimensions.GUTTER_SIZE}px;
          grid-row-gap: ${Dimensions.GUTTER_SIZE}px;
          color: ${colors.footerColor};
        }

        .social {
          grid-area: social;
          justify-self: end;
          display: flex;
        }

        .social-action {
          margin-left: 15px;
          width: 40px;
          height: 40px;
          background: #222;
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 19px;
          border-radius: 5px;
        }

        .social-action:hover {
          background: #121212;
        }

        .copyright {
          grid-area: copyright;
        }

        .footer-links {
          grid-area: links;
        }

        .footer-links a {
          margin-right: 10px;
          padding-right: 10px;
          border-right: 1px solid ${colors.footerColor};
        }

        .footer-links a:last-child {
          margin-right: 0;
          padding-right: 0;
          border-right: 0px;
        }

        .powered-by {
          grid-area: powered;
          flex: 1;
          justify-self: end;
        }

        .version {
          opacity: 0.2;
          font-size: 0.75rem;
          margin-left: 6px;
        }
      `}</style>
    </>
  );
});
