import { FC } from "react";

type Props = {};

export const AmazonAdd: FC<Props> = ({}) => {
  const adds = randomAdd();

  return (
    <>
      <div className="ads">
        <iframe
          style={{ width: 120, height: 300 }}
          marginWidth={0}
          marginHeight={0}
          scrolling="no"
          frameBorder={0}
          src={adds[0]}
        ></iframe>
        <iframe
          style={{ width: 120, height: 300 }}
          marginWidth={0}
          marginHeight={0}
          scrolling="no"
          frameBorder={0}
          src={adds[1]}
        ></iframe>
      </div>

      <style jsx>{`
        .ads {
          margin-top: 8px;
          display: flex;
          justify-content: space-around;
        }
      `}</style>
    </>
  );
};

function randomAdd() {
  const links = [
    "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=csgonadesweb-20&language=en_US&marketplace=amazon&region=US&placement=B01G3WBIJ0&asins=B01G3WBIJ0&linkId=38efcac1509c87f14feb7eacf52501fb&show_border=true&link_opens_in_new_window=true",
    "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=csgonadesweb-20&language=en_US&marketplace=amazon&region=US&placement=B07Y693ND1&asins=B07Y693ND1&linkId=b96ca08a1921ad04a93505b31c792a39&show_border=true&link_opens_in_new_window=true",
    "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=csgonadesweb-20&language=en_US&marketplace=amazon&region=US&placement=B077ZGRY9V&asins=B077ZGRY9V&linkId=32c682d67f819fb21a755c1a6abffc2a&show_border=true&link_opens_in_new_window=true",
    "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=csgonadesweb-20&language=en_US&marketplace=amazon&region=US&placement=B01F8WUBGM&asins=B01F8WUBGM&linkId=2daa2eb8e8fa8b969ecdcd4b4cf92ba1&show_border=true&link_opens_in_new_window=true",
    "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=csgonadesweb-20&language=en_US&marketplace=amazon&region=US&placement=B07B44DTJY&asins=B07B44DTJY&linkId=b3b3365bb1c9e78fbd6962c057aa4410&show_border=true&link_opens_in_new_window=true",
    "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=csgonadesweb-20&language=en_US&marketplace=amazon&region=US&placement=B07FZ8S74R&asins=B07FZ8S74R&linkId=c4ea9fded64f4f257bd3cdbb65fe7247&show_border=true&link_opens_in_new_window=true",
    "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=csgonadesweb-20&language=en_US&marketplace=amazon&region=US&placement=B017EVR2VM&asins=B017EVR2VM&linkId=c5ee7605ca9779ccf13619e95b3e1c26&show_border=true&link_opens_in_new_window=true",
    "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=csgonadesweb-20&language=en_US&marketplace=amazon&region=US&placement=B078HWN5CX&asins=B078HWN5CX&linkId=9baf34d12d36f5e85c16fa34d5aed40d&show_border=true&link_opens_in_new_window=true",
    "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=csgonadesweb-20&language=en_US&marketplace=amazon&region=US&placement=B078LJ6RPK&asins=B078LJ6RPK&linkId=08e5a0fa89f085e97b15f6913fe172fd&show_border=true&link_opens_in_new_window=true",
    "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=csgonadesweb-20&language=en_US&marketplace=amazon&region=US&placement=B01M26YUKO&asins=B01M26YUKO&linkId=a9c6cd1cdc011dd5926388d0415479df&show_border=true&link_opens_in_new_window=true",
    "//ws-na.amazon-adsystem.com/widgets/q?ServiceVersion=20070822&OneJS=1&Operation=GetAdHtml&MarketPlace=US&source=ss&ref=as_ss_li_til&ad_type=product_link&tracking_id=csgonadesweb-20&language=en_US&marketplace=amazon&region=US&placement=B073WGB8G6&asins=B073WGB8G6&linkId=52223533246cd703783698c79005a4ac&show_border=true&link_opens_in_new_window=true",
  ];

  const ads = getRandom(links, 2);

  return ads;
}

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
