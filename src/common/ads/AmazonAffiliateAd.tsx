// @ts-ignore
import React, { FC } from "react";

type Props = {
  height?: number;
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
  "B07ZTQ7VJ9", // Peak Design Everyday Backpack
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
  "B06XT1ZNQF", // SteelSeries QcK Prism
  "B000UVRU6G", // SteelSeries QcK
  "B082G5SPR5", // Razer DeathAdder v2
  "B01IOO4SGK", // Dell S2417DG
  "B06XDY3SJF", // LG 24MP59G-P
  "B079FV8S5M", // Acer Predator Gaming X34
  "B07R1P4DQG", // Razer Blade 15
  "B07PHNZBDV", // MSI GS65 Stealth
  "B07HNW68ZC", // Oculus Quest
  "B01LZN7MLE", // Redragon K552
  "B07B3XWDP9", // AKRacing Core
  "B01N2RJ0HI", // GTRACING Gaming Chair
  "B07FZVXS8H", // SteelSeries Arctis 7
  "B07FL2LSBH", // Razer Gaming Mouse Bungee v2
  "B074ZQJW9R", // CORSAIR ST100 RGB Premium Headset Stand
  "B07VGRJDFY", // Nintendo Switch
  "B07DHNX18W", // Razer Huntsman Elite
  "B07RQJHG8M", // DJI Mavic Mini
  "B07ZQRWTDB", // G Fuel Hype Sauce
  "B009KML5PS", // G Fuel Blue Ice Tub
  "B019AKA6YU", // Monster Energy Drink
  "B08225BSZ6", // MTN DEW AMP GAME FUEL ZERO
  "B07NZZZ746", // HyperX QuadCast
  "B00SAYCXWG", // HyperX Cloud II
];

function adCreator() {
  const prods = getRandom(products, 4).join(",");

  return `
  <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          * {
            margin: 0;
            padding: 0;
          }
        </style>
      </head>
      <body>
     
      <script type="text/javascript">
      amzn_assoc_placement = "adunit0";
      amzn_assoc_search_bar = "false";
      amzn_assoc_tracking_id = "csgonadesweb-20";
      amzn_assoc_ad_mode = "manual";
      amzn_assoc_ad_type = "smart";
      amzn_assoc_marketplace = "amazon";
      amzn_assoc_region = "US";
      amzn_assoc_title = "";
      amzn_assoc_linkid = "e5c917d93c3274713703f809eedbb8e5";
      amzn_assoc_asins = "${prods}";
      </script>
      <script src="https://z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US"></script>
      </body>
    </html>
  `;
}

const AmazonAffiliateAdd: FC<Props> = ({ height }) => {
  return (
    <>
      <iframe frameBorder={0} scrolling="no" srcDoc={adCreator()}></iframe>

      <style jsx>{`
        iframe {
          width: 100%;
          height: ${height ? height : 500}px;
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
