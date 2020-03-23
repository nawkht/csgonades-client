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
import { Nade } from "../models/Nade/Nade";
import { nadeTitleBuilder } from "./components/NadeTitle";
import { useAnalytics } from "../utils/Analytics";

type Props = {
  nade: Nade;
};

export const NadeShareActions: FC<Props> = ({ nade }) => {
  const { event } = useAnalytics();
  const shareUrl = `https://www.csgonades.com/nades/${nade.slug || nade.id}`;
  const title = nadeTitleBuilder(nade);

  if (nade.status !== "accepted") {
    return null;
  }

  function onSosialShare(socialNetwork: string) {
    event({
      category: "SocialShare",
      action: socialNetwork,
      label: nade.slug || nade.id,
    });
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
          <VKShareButton
            url={shareUrl}
            title={nadeTitleBuilder(nade)}
            image={nade?.images.thumbnailUrl}
          >
            <VKIcon size={30} round />
          </VKShareButton>
        </div>
      </div>
      <style jsx>{`
        .share-buttons {
          display: flex;
          max-width: 1000px;
          margin: 0 auto;
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
