import { FC, memo } from "react";
import { PageCentralize } from "../common/PageCentralize";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { capitalize } from "../utils/Common";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {
  map: string;
};

export const MapPageJumbo: FC<Props> = memo(({ map }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="map-welcome">
        <PageCentralize>
          <div className="map-welcome-wrap">
            <div className="welcome-msg">
              <h1>
                Find the best smokes, flashbangs, molotovs and grenades for{" "}
                {capitalize(map)}.
              </h1>
              <h2>
                Something missing?
                <br /> Sign in, and add a nade to help everyone out.
              </h2>
            </div>
            <div className="top-placement">
              <EzoicPlaceHolder id={130} width={730} />
            </div>
          </div>
        </PageCentralize>
      </div>
      <style jsx>{`
        .map-welcome {
          background: linear-gradient(
            236.51deg,
            ${colors.jumboGradientStart} 33.44%,
            ${colors.jumboGradientEnd} 66.89%
          );
          margin-bottom: 40px;
          min-height: 230px;
          display: flex;
          align-items: center;
        }

        .map-welcome-wrap {
          display: flex;
          align-items: center;
        }

        .welcome-msg {
          align-self: center;
          margin-right: 40px;
          padding-bottom: 40px;
          padding-top: 40px;
          flex: 1;
        }

        .top-placement {
          width: 730px;
        }

        .map-welcome h1,
        .map-welcome h2 {
          font-size: 24px;
          color: ${colors.TEXT};
          font-weight: 300;
          flex: 1;
          margin: 0;
          padding: 0;
        }

        .map-welcome h2 {
          font-size: 20px;
          margin: 0;
          margin-top: 20px;
        }

        @media only screen and (max-width: 1200px) {
          .top-placement {
            display: none;
          }
        }
      `}</style>
    </>
  );
});
