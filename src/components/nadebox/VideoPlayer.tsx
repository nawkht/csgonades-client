import * as React from "react";
import { Reveal, Image } from "semantic-ui-react";

interface Props {
  id: string;
  poster: string;
}

export class VideoPlayer extends React.PureComponent<Props> {
  videoRef: React.RefObject<HTMLVideoElement>;

  constructor(props: Props) {
    super(props);
    this.videoRef = React.createRef();
  }

  onMouseEnter = () => {
    if (this.videoRef.current) {
      this.videoRef.current.play();
    }
  };

  onMouseLeave = () => {
    if (this.videoRef.current) {
      this.videoRef.current.pause();
    }
  };

  render() {
    const { poster, id } = this.props;
    return (
      <div
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        style={{
          paddingRight: 3,
          paddingLeft: 3
        }}
      >
        <Reveal animated="fade">
          <Reveal.Content visible>
            <Image src={poster} />
          </Reveal.Content>
          <Reveal.Content hidden>
            <video
              ref={this.videoRef}
              loop
              playsInline
              preload="auto"
              style={{ width: "100%" }}
            >
              <source
                src={`https://thumbs.gfycat.com/${id}-mobile.mp4`}
                type="video/mp4"
              />
            </video>
          </Reveal.Content>
        </Reveal>
      </div>
    );
  }
}
