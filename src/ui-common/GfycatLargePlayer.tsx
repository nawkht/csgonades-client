import { FC, useRef, useMemo } from "react";
import useComponentSize from "@rehooks/component-size";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
type Props = {
  gfyUrl: string;
  poster?: string;
};

export const GfycatLargePlayer: FC<Props> = ({ gfyUrl, poster }) => {
  const { isMobile } = useTheme();
  const ref = useRef(null);
  const { width } = useComponentSize(ref);
  const height = useMemo(() => width / (16 / 9), [width]);

  return (
    <>
      <div className="player" ref={ref}>
        <video
          key={gfyUrl}
          className="video-player"
          poster={poster}
          autoPlay={!isMobile}
          controls
          muted
          loop
          width={width}
        >
          <source src={gfyUrl} type="video/mp4" />
        </video>
      </div>
      <style jsx>{`
        .player {
          position: relative;
          display: block;
          width: 100%;
          height: ${height - 5}px;
          overflow: hidden;
          background: #000;
        }

        video {
          display: block;
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          left: 0;
        }
      `}</style>
    </>
  );
};
