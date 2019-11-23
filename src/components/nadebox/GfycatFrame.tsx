import { FC } from "react";

interface Props {
  id: string;
}

const GfycatFrame: FC<Props> = ({ id }) => {
  const url = `https://gfycat.com/ifr/${id}?controls=0`;
  return (
    <div style={{ position: "relative", paddingBottom: "calc(70.80% + 44px)" }}>
      <iframe
        src={url}
        frameBorder={0}
        allowFullScreen
        scrolling="no"
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
};

export { GfycatFrame };
