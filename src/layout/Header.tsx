import { FC } from "react";
import { PageCentralize } from "../common/PageCentralize";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { Hamburger } from "./Misc/Hamburger";
import { Logo } from "./Misc/Logo";
import { MapNav } from "./Navigation/MapNav";
import { SiteNav } from "./Navigation/SiteNav";
import { UserNav } from "./Navigation/UserNav";

type Props = {};

export const Header: FC<Props> = ({}) => {
  const { colors } = useTheme();

  return (
    <>
      <header>
        <PageCentralize>
          <div className="header-wrap">
            <Hamburger />
            <Logo />
            <div className="spacer" />
            <SiteNav />
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
        }

        .header-wrap {
          display: flex;
          align-items: center;
        }

        .spacer {
          flex: 1;
        }
      `}</style>
    </>
  );
};
