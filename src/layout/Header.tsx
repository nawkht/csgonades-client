import { FC, memo } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { Hamburger } from "./Misc/Hamburger";
import { Logo } from "./Misc/Logo";
import { SiteNav } from "./Navigation/SiteNav";
import { UserNav } from "./Navigation/UserNav";
import { ThemeToggler } from "./Misc/ThemeToggler";

type Props = {};

export const Header: FC<Props> = memo(({}) => {
  const { colors } = useTheme();

  return (
    <>
      <div id="header">
        <div className="header-wrap">
          <Hamburger />
          <Logo />
          <ThemeToggler />
          <div className="spacer"></div>
          <SiteNav />
          <UserNav />
        </div>
      </div>
      <style jsx>{`
        #header {
          padding: 10px;
          padding-left: 30px;
          padding-right: 30px;
          background: ${colors.DP03};
          height: 65px;
        }

        .header-wrap {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .spacer {
          flex: 1;
          display: flex;
          justify-content: space-around;
          height: 60px;
          margin-top: -10px;
          margin-bottom: -10px;
        }

        @media only screen and (max-width: 910px) {
          #header {
            padding-left: 15px;
            padding-right: 15px;
          }
        }
      `}</style>
    </>
  );
});
