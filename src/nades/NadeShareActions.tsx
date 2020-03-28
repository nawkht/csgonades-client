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
        <span>Share on:</span>
        <div onClick={() => onSosialShare("Reddit")}>
          <RedditShareButton url={shareUrl} title={title}>
            <RedditIcon size={30} round />
          </RedditShareButton>
        </div>
        <div onClick={() => onSosialShare("Facebook")}>
          <FacebookShareButton url={shareUrl} quote={title}>
            <FacebookIcon size={30} round />
          </FacebookShareButton>
        </div>
        <div onClick={() => onSosialShare("Twitter")}>
          <TwitterShareButton url={shareUrl} title={title}>
            <TwitterIcon size={30} round />
          </TwitterShareButton>
        </div>
        <div onClick={() => onSosialShare("VK")}>
          <VKShareButton url={shareUrl} title={title} image={image}>
            <VKIcon size={30} round />
          </VKShareButton>
        </div>
      </div>
      <style jsx>{`
        .share-buttons {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          margin-bottom: 10px;
        }

        .share-buttons div {
          margin-left: 10px;
          position: relative;
          top: 3px;
        }
      `}</style>
    </>
  );
};
