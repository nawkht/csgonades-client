// @ts-ignore
import * as postscribe from "postscribe";
import React, { FC, useEffect, useMemo, useRef } from "react";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {
  grid?: boolean;
};

const products = [
  "B07R4Q8FQY",
  "B078LJ6RPK",
  "B01LVTI3TO",
  "B082G5SPR5",
  "B07GCKQD77",
  "B077ZGRY9V",
  "B07YPC3BQC",
  "B07RHBLV7F",
  "B074G96MPM",
  "B0772BK7BV",
  "B07XQZNM5S", // New Apple iPad (10.2-Inch, Wi-Fi, 128GB)
  "B07W73NGMW", // Tile Pro (2020)
  "B07KXPXN5T", // Dyson Pure Hot + Cool Air Purifier
  "B07T81554H", // Sony WF-1000XM3
  "B07D1J5QC7", // Philips Hue
  "B07MW1G2DJ", // Mophie PowerStation
  "B07FZ8S74R", // Echo Dot (3rd Gen)
  "B07VQV7173", // Xbox One X
  "B075S53HD9", // Philips (HF3650/60)
  "B07WK5XT8T", // Bowers & Wilkins PX7
  "B07S1PCSV5", // SanDisk 500GB
  "B079YBKT3H", // SteelSeries Arctis Pro
  "B07XPWD4WW", // mophie 3 in 1 Wireless Charge Pad
  "B07KQCH5DT", // ZenPod
  "B07ZTQ8J8C", // Peak Design Everyday Backpack
  "B07G9Y3ZMC", // Echo Studio
  "B01FXC7JWQ", // Furbo Dog Camera
  "B07XR5TRSZ", // Apple Watch Series 5
  "B075FZGM7N", // Satechi Aluminum Multi-Port Adapter
  "B07S395RWD", // Logitech MX Master 3
  "B07VCQRY4W", // Roborock S6
  "B07NY9ZWXQ", // Logitech G915
  "B07YMGQYP6", // Google Pixelbook Go
  "B07NNR1JH5", // Soundcore Wakey
  "B07NFPGNWD", // Ultimate Ears
  "B07GXBYYWN", // Insta360 ONE X
  "B07Q9MJKBV", // Bose Noise Cancelling
  "B07PC7JKSB", // Bose Frames
];

const adSearchTerms = [
  "gaming glasses",
  "gaming headset",
  "gaming mouse",
  "gaming pc",
  "gaming accessories",
  "steelseries",
  "razer",
  "hyperx",
  "gtracing",
  "gfuel",
  "bose",
  "senheiser",
  "sony headphones",
  "asus rog monitor",
  "razer laptop",
  "headphone stand",
  "nintendo switch",
  "oculus quest",
  "mouse bungee",
  "gaming desk",
  "webcam",
  "mirrorless",
  "mechanical keyboard",
];

const AmazonAffiliateAdd: FC<Props> = ({ grid }) => {
  const { colors } = useTheme();
  const divRef = useRef<HTMLDivElement>(null);

  const adScript = useMemo(() => {
    const prods = getRandom(products, 4).join(",");
    const searchTerm = getRandom(adSearchTerms, 1)[0];
    return grid
      ? `<script type="text/javascript">
    amzn_assoc_placement = "adunit0";
    amzn_assoc_tracking_id = "csgonadesweb-20";
    amzn_assoc_ad_mode = "search";
    amzn_assoc_ad_type = "smart";
    amzn_assoc_marketplace = "amazon";
    amzn_assoc_region = "US";
    amzn_assoc_default_search_phrase = "${searchTerm}";
    amzn_assoc_default_category = "All";
    amzn_assoc_linkid = "c0647e55be7c25cf659400748bb8322b";
    amzn_assoc_title = "";
    amzn_assoc_search_bar = "false";
    amzn_assoc_search_bar_position = "top";
    </script>
    <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>`
      : `<script type="text/javascript">
      amzn_assoc_placement = "adunit0";
      amzn_assoc_search_bar = "false";
      amzn_assoc_tracking_id = "csgonadesweb-20";
      amzn_assoc_ad_mode = "manual";
      amzn_assoc_ad_type = "smart";
      amzn_assoc_marketplace = "amazon";
      amzn_assoc_region = "US";
      amzn_assoc_title = "";
      amzn_assoc_linkid = "97380945e3d9736412d91069840090c5";
      amzn_assoc_asins = "${prods}";
      </script>
      <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>
    <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>`;
  }, [grid]);

  useEffect(() => {
    const delayedAdd = setTimeout(() => {
      if (divRef.current) {
        const div = document.createElement("div");
        div.id = "af-container";
        div.style.padding = "12px";
        divRef.current.append(div);
        postscribe("#af-container", adScript);
      }
    }, 500);

    if (document !== null) {
      const adInBody = document.querySelector('[id^="amzn_assoc_ad"]');

      if (adInBody) {
        const parent = adInBody.parentNode;
        if (parent && parent.nodeName === "BODY") {
          adInBody.remove();
        }
      }
    }

    return () => clearTimeout(delayedAdd);
  }, [adScript]);

  return (
    <>
      <div id="container" ref={divRef}></div>

      <style jsx>{`
        #container {
          border: 1px solid ${colors.BORDER};
          background: ${colors.DP01};
          border-radius: 3px;
        }
      `}</style>
    </>
  );
};

export default AmazonAffiliateAdd;

function getRandom(arr: string[], n: number): string[] {
  const result = new Array(n);
  let len = arr.length;
  const taken = new Array(len);

  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    const x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}
