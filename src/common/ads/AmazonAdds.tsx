import { FC } from "react";

type Props = {};

export const AmazonAdd: FC<Props> = ({}) => {
  const addSrc = randomAdd();

  return (
    <>
      <iframe
        className="amazon-ad"
        src={addSrc}
        width="300"
        height="250"
        scrolling="no"
        marginWidth={0}
        frameBorder={0}
      ></iframe>
      <style jsx>{`
        .amazon-ad {
          margin-top: 16px;
        }
      `}</style>
    </>
  );
};

function randomAdd() {
  const links = [
    "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=amzn_smp_tk_ftu_20&banner=09P2W608RGENCW4QJN02&f=ifr&lc=pf4&linkID=45a5536688a9f3605d849989047b0f81&t=csgonadesweb-20&tracking_id=csgonadesweb-20",
    "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=gift_certificates&banner=127JF9E4530CSFRCY4R2&f=ifr&lc=pf4&linkID=b59379b4d9860aac1fc67dedc74a1745&t=csgonadesweb-20&tracking_id=csgonadesweb-20",
    "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=hotnewreleases&banner=00GP90RCZFRVTGTTPT02&f=ifr&lc=pf4&linkID=fabc1bb249f39de1f47fe8bc8e12e229&t=csgonadesweb-20&tracking_id=csgonadesweb-20",
    "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=amazonhomepage&f=ifr&linkID=6efde67f9a4539b4dff198c26620a8d6&t=csgonadesweb-20&tracking_id=csgonadesweb-20",
  ];
  const item = links[Math.floor(Math.random() * links.length)];
  return item;
}
