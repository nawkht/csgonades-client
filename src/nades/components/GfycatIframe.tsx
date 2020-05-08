import { FC, useState } from "react";

type Props = {
  gfyId: string;
};

export const GfycatIframe: FC<Props> = ({ gfyId }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="gfycat-super-wrap">
        <div className="gfycat-wrap">
          <iframe
            onLoad={() => setLoaded(true)}
            className="gfycat-iframe"
            src={`https://gfycat.com/ifr/${gfyId}?hd=1`}
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
          background: #111;
          overflow: hidden;
        }

        .gfycat-wrap {
          position: relative;
          padding-bottom: calc(56.25% + 44px);
          background: #000;
          overflow: hidden;
          transform: scale(1.002);
          opacity: ${loaded ? 1 : 0};
          transition: opacity 0.2s;
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
