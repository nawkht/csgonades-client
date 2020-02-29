import { FC, useMemo } from "react";

type Props = {};

const bountyUrls = [
  "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=twitchprime&banner=025E4WXKK5G4EXYGDD02&f=ifr&lc=pf4&linkID=e169a348432371fb6a5391744007a623&t=csgonadesweb-20&tracking_id=csgonadesweb-20",
  "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=primemain&banner=028WNSXDMC6H5YDNCB82&f=ifr&lc=pf4&linkID=4a4b1c4558d6444f667543c0af258f6f&t=csgonadesweb-20&tracking_id=csgonadesweb-20",
  "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=hotnewreleases&banner=00GP90RCZFRVTGTTPT02&f=ifr&lc=pf4&linkID=d9a6042c2a6ada1fd9ab3a04832e818e&t=csgonadesweb-20&tracking_id=csgonadesweb-20",
  "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=amazonhomepage&f=ifr&lc=pf4&linkID=241e225fd6b465dc0e5d0dd583c407ca&t=csgonadesweb-20&tracking_id=csgonadesweb-20",
  "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=amazonhomepage&f=ifr&linkID=3edb01e836bdf5613700611d9bbf6fa0&t=csgonadesweb-20&tracking_id=csgonadesweb-20",
  "//rcm-na.amazon-adsystem.com/e/cm?o=1&p=12&l=ur1&category=computers_accesories&banner=0PW7SWY2D14FT57ZW182&f=ifr&linkID={{link_id}}&t=csgonadesweb-20&tracking_id=csgonadesweb-20",
];

export const AmazonBounty: FC<Props> = ({}) => {
  const bountyAd = useMemo(() => {
    return getRandom(bountyUrls, 1)[0];
  }, []);

  return (
    <>
      <div>
        <iframe
          src={bountyAd}
          width="300"
          height="250"
          scrolling="no"
          marginWidth={0}
          style={{ border: 0 }}
          frameBorder="0"
        ></iframe>
      </div>
      <style jsx>{``}</style>
    </>
  );
};

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
