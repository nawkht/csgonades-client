import { FC } from "react";
import {
  RedditShareButton,
  FacebookShareButton,
  TwitterShareButton,
  VKShareButton,
} from "react-share";
import { useAnalytics } from "../utils/Analytics";
import { FaVk, FaTwitter, FaRedditAlien, FaFacebookF } from "react-icons/fa";

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
        <div className="share-wrap" onClick={() => onSosialShare("Reddit")}>
          <RedditShareButton url={shareUrl} title={title}>
            <div className="share-icon">
              <FaRedditAlien />
            </div>
          </RedditShareButton>
        </div>
        <div className="share-wrap" onClick={() => onSosialShare("Facebook")}>
          <FacebookShareButton url={shareUrl} quote={title}>
            <div className="share-icon">
              <FaFacebookF />
            </div>
          </FacebookShareButton>
        </div>
        <div className="share-wrap" onClick={() => onSosialShare("Twitter")}>
          <TwitterShareButton url={shareUrl} title={title}>
            <div className="share-icon">
              <FaTwitter />
            </div>
          </TwitterShareButton>
        </div>
        <div className="share-wrap" onClick={() => onSosialShare("VK")}>
          <VKShareButton url={shareUrl} title={title} image={image}>
            <div className="share-icon vk">
              <FaVk />
            </div>
          </VKShareButton>
        </div>
      </div>
      <style jsx>{`
        .share-buttons {
          display: flex;
        }

        .share-buttons div {
        }

        .share-icon {
          width: 40px;
          height: 40px;
          font-size: 20px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #fff;
          background: #454545;
          transition: background 0.2s;
        }

        .share-wrap:first-child .share-icon {
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
        }

        .share-wrap:last-child .share-icon {
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
        }

        .share-icon:hover {
          background: #111;
        }
      `}</style>
    </>
  );
};
