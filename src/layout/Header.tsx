import { FC, memo } from "react";
import { PageCentralize } from "../common/PageCentralize";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { Hamburger } from "./Misc/Hamburger";
import { Logo } from "./Misc/Logo";
import { MapNav } from "./Navigation/MapNav";
import { SiteNav } from "./Navigation/SiteNav";
import { UserNav } from "./Navigation/UserNav";

type Props = {};

export const Header: FC<Props> = memo(({}) => {
  const { colors } = useTheme();

  return (
    <>
      <header>
        <PageCentralize>
          <div className="header-wrap">
            <Hamburger />
            <Logo />
            <SiteNav />
            <div className="spacer"></div>
            <UserNav />
          </div>
        </PageCentralize>
      </header>
      <MapNav />
      <style jsx>{`
        header {
          padding: 10px;
          padding-left: 0;
          padding-right: 0;
          background: ${colors.DP01};
          min-height: 65px;
        }

        .header-wrap {
          display: flex;
          align-items: center;
          height: 100%;
          min-height: 47px;
        }

        .spacer {
          flex: 1;
          display: flex;
          justify-content: space-around;
          height: 60px;
          margin-top: -10px;
          margin-bottom: -10px;
        }
      `}</style>
    </>
  );
});
