import { FC } from "react";
import {
  RedditShareButton,
  RedditIcon,
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  VKShareButton,
  VKIcon,
} from "react-share";
import { useAnalytics } from "../utils/Analytics";

type Props = {
  visisble: boolean;
  url: string;
  title: string;
  image?: string;
};

export const NadeShareActions: FC<Props> = ({
  visisble,
  url,
  title,
  image,
}) => {
  const { event } = useAnalytics();
  const shareUrl = `https://www.csgonades.com${url}`;

  function onSosialShare(socialNetwork: string) {
    event({
      category: "SocialShare",
      action: socialNetwork,
      label: url,
    });
  }

  if (!visisble) {
    return null;
  }

  return (
    <>
      <div className="share-buttons">
        <div onClick={() => onSosialShare("Reddit")}>
          <RedditShareButton url={shareUrl} title={title}>
            <RedditIcon size={40} />
          </RedditShareButton>
        </div>
        <div onClick={() => onSosialShare("Facebook")}>
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={40} />
          </FacebookShareButton>
        </div>
        <div onClick={() => onSosialShare("Twitter")}>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={40} />
          </TwitterShareButton>
        </div>
        <div onClick={() => onSosialShare("VK")}>
          <VKShareButton url={shareUrl} title={title} image={image}>
            <VKIcon size={40} />
          </VKShareButton>
        </div>
      </div>
      <style jsx>{`
        .share-buttons {
          display: flex;
          border-radius: 5px;
          overflow: hidden;
          width: calc(40px * 4);
        }

        .share-buttons div {
          margin-bottom: -5px;
        }
      `}</style>
    </>
  );
};
