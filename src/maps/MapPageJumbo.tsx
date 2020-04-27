import { FC, memo } from "react";
import { capitalize } from "../utils/Common";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { CsgoMap } from "../models/Nade/CsGoMap";
import { NadeLight } from "../models/Nade/Nade";

type Props = {
  map: CsgoMap;
  nades: NadeLight[];
};

export const MapPageJumbo: FC<Props> = memo(({ map }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="map-welcome">
        <h1>
          Find the best smokes, flashbangs, molotovs and grenades for{" "}
          {capitalize(map)}.
        </h1>
        <h2>With these nades you might have a chance against BOT Bob 🤖</h2>
        <p>
          Channel your inner Global Elite, sign in, then add your genius nades
          to the list 🏆
        </p>
      </div>
      <style jsx>{`
        .map-welcome {
          background: ${colors.DP01};
          padding: 40px 30px;
          margin-bottom: 30px;
          border-radius: 5px;
          color: ${colors.TEXT};
        }

        .map-welcome-wrap {
          display: flex;
          min-height: 100px;
        }

        .welcome-msg {
          align-self: center;
          margin-right: 30px;
          flex: 1;
        }

        .top-placement {
          width: 730px;
          display: flex;
          align-items: center;
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
          margin-bottom: 20px;
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
