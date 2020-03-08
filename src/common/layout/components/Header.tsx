import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { Dimensions } from "../../../constants/Constants";
import { useNavigation } from "../../../store/GlobalStore/GlobalHooks";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";
import { UserNav } from "../../layout-components/UserNav";
import { PageCentralize } from "../../PageCentralize";
import { Logo } from "./Logo";
import { MapNav } from "./MapNav";
import { SiteNav } from "./SiteNav";

type Props = {};

export const Header: FC<Props> = ({}) => {
  const { colors } = useTheme();
  const { isNavOpen, toggleNav } = useNavigation();

  return (
    <>
      <header>
        <PageCentralize>
          <div className="header-wrap">
            <div className="hamburger" onClick={toggleNav}>
              {isNavOpen && <Icon name="cancel" size="large" />}
              {!isNavOpen && <Icon name="bars" size="large" />}
            </div>
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

        .hamburger {
          margin-right: 18px;
          cursor: pointer;
          display: none;
          color: ${colors.TEXT};
        }

        .header-wrap {
          display: flex;
          align-items: center;
        }

        .spacer {
          flex: 1;
        }

        @media only screen and (max-width: ${Dimensions.MOBILE_THRESHHOLD}) {
          .hamburger {
            display: block;
          }
        }
      `}</style>
    </>
  );
};
