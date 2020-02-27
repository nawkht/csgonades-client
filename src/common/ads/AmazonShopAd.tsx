import { FC, useEffect, useState } from "react";

type Props = {};

export const AmazonShopAd: FC<Props> = ({}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <div className="amazon-shop">
        <div id="amzn-assoc-ad-2efdafa8-6a9e-43d3-857b-c601be6e3bd0"></div>
        <script src="//z-na.amazon-adsystem.com/widgets/onejs?MarketPlace=US&adInstanceId=2efdafa8-6a9e-43d3-857b-c601be6e3bd0"></script>
      </div>

      <style jsx>{`
        .amazon-shop {
          max-height: 100px;
          max-width: 1000px;
          margin: 0 auto;
          padding: 16px;
        }
      `}</style>
    </>
  );
};
