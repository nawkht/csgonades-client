import { FC, memo, useEffect } from "react";
import { IS_PROD } from "../../constants/Constants";

type AdType =
  | "300x250"
  | "300x600"
  | "728x90"
  | "160x600"
  | "300x250-incontent";

type Props = {
  tagType: AdType;
  center?: boolean;
  modalTop?: boolean;
};

type AdData = {
  id: string;
  size: string;
};

const ADS_ENABLED = true;

export const AdUnit: FC<Props> = memo(({ tagType, modalTop }) => {
  const className = modalTop ? "ph top" : "ph";

  const adData: AdData = getAdData(tagType);
  useEffect(() => {
    if (!ADS_ENABLED || !IS_PROD) {
      return;
    }

    loadAdByType(adData);
  }, [adData]);

  const height = adData.size.split("x")[1];

  return (
    <>
      <div className={className}>
        <CleanAdTag id={adData.id} />
      </div>
      <style jsx>{`
        .ph {
          display: flex;
          justify-content: space-around;
          height: ${height}px;
        }

        .top {
          grid-area: ph;
          background: rgba(255, 255, 255, 0.8);
        }
      `}</style>
    </>
  );
});

export const CleanAdTag: FC<{ id: string }> = memo(({ id }) => {
  return (
    <>
      <div id={id}></div>
    </>
  );
});

function getAdData(tagType: AdType) {
  switch (tagType) {
    case "300x250":
      return {
        id: "438793428",
        size: "300x250",
      };
    case "300x600":
      return {
        id: "722839325",
        size: "300x600",
      };
    case "728x90":
      return {
        id: "744224612",
        size: "728x90",
      };
    case "160x600":
      return {
        id: "133557531",
        size: "160x600",
      };
    case "300x250-incontent":
      return {
        id: "135313393",
        size: "300x250",
      };
    default:
      return {
        id: "",
        size: "",
      };
  }
}

function loadAdByType(adData: AdData) {
  try {
    // @ts-ignore
    window._mNHandle.queue.push(function () {
      // @ts-ignore
      window._mNDetails.loadTag(adData.id, adData.size, adData.id);
    });
  } catch (error) {}
}
