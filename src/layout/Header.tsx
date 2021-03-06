import { FC, memo } from "react";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { Hamburger } from "./Misc/Hamburger";
import { Logo } from "./Misc/Logo";
import { SiteNav } from "./Navigation/SiteNav";
import { UserNav } from "./Navigation/UserNav";
import { ThemeToggler } from "./Misc/ThemeToggler";
import { Dimensions } from "../constants/Constants";
import { PageCentralize } from "../common/PageCentralize";

type Props = {};

export const Header: FC<Props> = memo(({}) => {
  const { colors } = useTheme();

  return (
    <>
      <div id="header">
        <PageCentralize>
          <div className="header-wrap">
            <Hamburger />
            <Logo />
            <div id="theme-toggle">
              <ThemeToggler />
            </div>
            <div className="spacer"></div>
            <SiteNav />
            <UserNav />
          </div>
        </PageCentralize>
      </div>

      <style jsx>{`
        #header {
          padding: 10px;
          padding-left: ${Dimensions.GUTTER_SIZE}px;
          padding-right: ${Dimensions.GUTTER_SIZE}px;
          background: ${colors.DP03};
          height: ${Dimensions.HEADER_HEIGHT}px;
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

          #theme-toggle {
            display: none;
          }
        }
      `}</style>
    </>
  );
});
