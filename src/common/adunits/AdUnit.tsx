import { FC, memo, useEffect } from "react";
import { IS_PROD } from "../../constants/Constants";

type AdType = "300x250" | "300x600" | "728x90";

type Props = {
  tagType: AdType;
  center?: boolean;
};

type AdData = {
  id: string;
  size: string;
};

const ADS_ENABLED = true;

export const AdUnit: FC<Props> = memo(({ tagType }) => {
  const adData = getAdData(tagType);
  useEffect(() => {
    if (!ADS_ENABLED || !IS_PROD) {
      return;
    }

    loadAdByType(adData);
  }, [adData]);

  const [height] = adData.size.split("x");

  return (
    <>
      <div className="ph">
        <div className="ph-unit" id={adData.id}></div>
      </div>
      <style jsx>{`
        .ph {
          display: flex;
          justify-content: space-around;
        }

        .ph-unit {
          height: ${height}px;
        }
      `}</style>
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
        id: "416812087",
        size: "728x90",
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
  } catch (error) {
    console.warn("AdErr", error);
  }
}
