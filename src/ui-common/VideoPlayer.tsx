import * as React from "react";
import { Reveal, Image } from "semantic-ui-react";
import { GfycatVideoPlayer } from "./GfycatVideoPlayer";

interface Props {
  id: string;
  poster: string;
  gfyVideoUrl: string;
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
    const { poster } = this.props;
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
            <GfycatVideoPlayer
              editable={false}
              gfyData={{ gfyId: "", smallVideoUrl: this.props.gfyVideoUrl }}
            />
          </Reveal.Content>
        </Reveal>
      </div>
    );
  }
}
