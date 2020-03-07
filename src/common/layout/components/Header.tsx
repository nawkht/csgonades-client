import { FC } from "react";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { UserNav } from "../../layout-components/UserNav";
import { PageCentralize } from "../../PageCentralize";
import { Logo } from "./Logo";
import { MapNav } from "./MapNav";
import { SiteNav } from "./SiteNav";

type Props = {};

export const Header: FC<Props> = ({}) => {
  const { colors } = useTheme();
  return (
    <>
      <header>
        <PageCentralize>
          <div className="header-wrap">
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
