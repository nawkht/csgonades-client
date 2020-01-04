import { FC, useState } from "react";
import { Icon } from "semantic-ui-react";
import { NadeLight, Status } from "../models/Nade/Nade";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import { tickrateString } from "../models/Nade/NadeTickrate";
import Link from "next/link";
import { iconFromType } from "../utils/Common";
// @ts-ignore
import { useScrollPosition } from "@n8tb1t/use-scroll-position";

interface Props {
  nade: NadeLight;
  isPlaying: boolean;
}

export const NadeItemMobile: FC<Props> = ({ nade }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { colors, durations, uiDimensions } = useTheme();
  const elementRef = useRef(null);
  const windowHeight = window && window.innerHeight;

  // Element scroll position
  useScrollPosition(
    ({ currPos }) => {
      if (currPos.y > 0 && currPos.y < windowHeight / 5) {
        setIsPlaying(true);
      } else {
        setIsPlaying(false);
      }
    },
    [],
    elementRef
  );

  const title = nade.title || "No title...";

  const nadeBoxClassName = nadeStatusToClassName(nade.status);
  const iconUrl = iconFromType(nade.type);

  return (
    <>
      <Link href={`/nades?id=${nade.id}`} as={`/nades/${nade.id}`}>
        <a
          className={nadeBoxClassName}
          style={{ display: "inline-block" }}
          ref={elementRef}
        >
          <div className="title">
            <img
              className="nade-type-icon"
              src={iconUrl}
              alt={`nade icon ${nade.type}`}
            />{" "}
            <span className="title-text">{title}</span>
          </div>
          <div className="media-content">
            <div className="media-image">
              <img src={nade.images.thumbnailUrl} alt={`nade thumbnail`} />
            </div>
            {isPlaying && (
              <div className="media-video">
                <video autoPlay muted playsInline controls={false}>
                  <source src={nade.gfycat.smallVideoUrl} type="video/mp4" />
                </video>
              </div>
            )}
          </div>
          <div className="stats">
            <div className="stat">
              <Icon name="eye" size="small" />
              <span className="icon-text">{nade.viewCount}</span>
            </div>
            {nade.tickrate && nade.tickrate !== "any" && (
              <div className="stat tick">
                <Icon name="code" size="small" />
                <span className="icon-text">
                  {tickrateString(nade.tickrate)}
                </span>
              </div>
            )}
          </div>
        </a>
      </Link>
      <style jsx>{`
        .nadebox {
          background: #fff;
          width: 100%;
          overflow: hidden;
        }

        .nadebox:hover {
          box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.15);
        }

        .nadebox:hover .title {
          background: ${colors.PRIMARY};
        }

        .title {
          padding: 6px 12px;
          display: block;
          background: ${colors.PRIMARY_90_PERCENT};
          color: white;
          transition: background ${durations.transition}s;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .title-text {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .nade-type-icon {
          width: 15px;
          margin-right: ${uiDimensions.PADDING_SMALL}px;
        }

        .pending-nade .title {
          background: ${colors.WARNING_90};
        }

        .pending-nade:hover .title {
          background: ${colors.WARNING};
        }

        .declined-nade .title {
          background: ${colors.ERROR_90};
        }

        .declined-nade:hover .title {
          background: ${colors.ERROR};
        }

        .stats {
          display: flex;
          padding: 3px;
          justify-content: space-between;
          color: #444;
        }

        .stat {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-right: 6px;
        }

        .stat .icon-text {
          font-size: 0.75em;
        }

        .tick {
          color: ${colors.PRIMARY};
        }

        .media-content {
          overflow: hidden;
          position: relative;
        }

        .media-image img {
          width: 100%;
        }

        .media-video {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .media-video video {
          width: 100%;
        }
      `}</style>
    </>
  );
};

function nadeStatusToClassName(status: Status) {
  switch (status) {
    case "pending":
      return "nadebox pending-nade";
    case "declined":
      return "nadebox declined-nade";
    default:
      return "nadebox";
  }
}

import { useRef, useLayoutEffect } from "react";

const isBrowser = typeof window !== `undefined`;

function getScrollPosition({ element, useWindow }: any) {
  if (!isBrowser) return { x: 0, y: 0 };

  const target = element ? element.current : document.body;
  const position = target.getBoundingClientRect();

  return useWindow
    ? { x: window.scrollX, y: window.scrollY }
    : { x: position.left, y: position.top };
}
