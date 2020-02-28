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

const TestAd: FC<Props> = ({ grid }) => {
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
    amzn_assoc_tracking_id = "csgonadesweb-20";
    amzn_assoc_ad_mode = "manual";
    amzn_assoc_ad_type = "smart";
    amzn_assoc_marketplace = "amazon";
    amzn_assoc_region = "US";
    amzn_assoc_linkid = "2517e9ee6a1a6efe45b6b198805da5ae";
    amzn_assoc_design = "in_content";
    amzn_assoc_asins = "${prods}";
    amzn_assoc_title = "";
    </script>
    <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>`;
  }, [grid]);

  useEffect(() => {
    if (divRef.current) {
      const div = document.createElement("div");
      div.id = "ad-container";
      div.style.padding = "12px";
      divRef.current.append(div);
      postscribe("#ad-container", adScript);
    }

    if (document !== null) {
      const adInBody = document.querySelector('[id^="amzn_assoc_ad"]');
      if (adInBody) {
        adInBody.remove();
      }
    }
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

export default TestAd;

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
