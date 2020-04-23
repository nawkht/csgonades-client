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
        <div onClick={() => onSosialShare("Reddit")}>
          <RedditShareButton url={shareUrl} title={title}>
            <div className="share-icon">
              <FaRedditAlien />
            </div>
          </RedditShareButton>
        </div>
        <div onClick={() => onSosialShare("Facebook")}>
          <FacebookShareButton url={shareUrl} quote={title}>
            <div className="share-icon">
              <FaFacebookF />
            </div>
          </FacebookShareButton>
        </div>
        <div onClick={() => onSosialShare("Twitter")}>
          <TwitterShareButton url={shareUrl} title={title}>
            <div className="share-icon">
              <FaTwitter />
            </div>
          </TwitterShareButton>
        </div>
        <div onClick={() => onSosialShare("VK")}>
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
          justify-content: space-between;
        }

        .share-buttons div {
          margin-bottom: -5px;
        }

        .share-icon {
          width: 40px;
          height: 40px;
          font-size: 25px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          color: #fff;
          background: #454545;
          border-radius: 5px;
          transition: background 0.2s;
        }

        .share-icon:hover {
          background: #111;
        }
      `}</style>
    </>
  );
};
