import { FC } from "react";
import { NadeLight } from "../../models/Nade/Nade";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  nade: NadeLight;
};

export const GfycatIframe: FC<Props> = ({ nade }) => {
  const { colors } = useTheme();

  return (
    <>
      <div className="gfycat-super-wrap">
        <div className="gfycat-wrap">
          <iframe
            className="gfycat-iframe"
            src={`https://gfycat.com/ifr/${nade.gfycat.gfyId}?hd=1`}
            frameBorder="0"
            scrolling="no"
            width="100%"
            height="100%"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      <style jsx>{`
        .gfycat-super-wrap {
          background: ${colors.DP01};
          overflow: hidden;
        }

        .gfycat-wrap {
          position: relative;
          padding-bottom: calc(56.25% + 44px);
          background: ${colors.DP01};
          overflow: hidden;
          transform: scale(1.002);
        }

        .gfycat-iframe {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
      `}</style>
    </>
  );
};
