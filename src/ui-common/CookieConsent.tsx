import { FC } from "react";

export const CookieConsent: FC = () => {
  return (
    <div>
      <div className="cookie-icon"></div>
      <span>
        In order to give you a better service CSGO Nades uses{" "}
        <a href="/policy">cookies</a>. By continuing to browse the site you are
        agreeing to our use of cookies.
      </span>
      <a>I agree.</a>
      <div className="close-button"></div>
    </div>
  );
};
