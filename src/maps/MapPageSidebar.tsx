import { FC, useMemo } from "react";
import { useFilteredNades } from "../store/MapStore/hooks/useFilteredNades";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";

type Props = {
  numSsr: number;
};

export const MapPageSideBar: FC<Props> = ({ numSsr }) => {
  const nades = useFilteredNades();
  const numNades = nades.length ? nades.length : numSsr;

  const [firstSideBarAd, secondSideBarAd, thirdSideBarAd] = useMemo(() => {
    const sideBarAds = [true, false, false];
    if (numNades > 24) {
      sideBarAds[1] = true;
    }
    if (numNades > 48) {
      sideBarAds[2] = true;
    }
    return sideBarAds;
  }, [numNades]);

  return (
    <>
      <div className="sjakt">
        <div className={firstSideBarAd ? "ez-160 sticky" : "ez-160 hidden"}>
          <EzoicPlaceHolder
            key="Sidebar Top 160x600"
            width={160}
            height={600}
            id={140}
          />
        </div>
        <div className={firstSideBarAd ? "ez-300 sticky" : "ez-300 hidden"}>
          <EzoicPlaceHolder
            key="Sidebar Top 300x1050"
            width={300}
            height={1050}
            id={144}
          />
        </div>
      </div>
      <div className="sjakt">
        <div className={secondSideBarAd ? "ez-160 sticky" : "ez-160 hidden"}>
          <EzoicPlaceHolder
            key={"Sidebar Mid 160x600"}
            width={160}
            height={600}
            id={141}
          />
        </div>

        <div className={secondSideBarAd ? "ez-300 sticky" : "ez-300 hidden"}>
          <EzoicPlaceHolder
            key={"Sidebar Mid 300x1050"}
            width={300}
            height={1050}
            id={145}
          />
        </div>
      </div>

      <div className={thirdSideBarAd ? "sjakt" : "hidden"}>
        <div className={thirdSideBarAd ? "ez-160 sticky" : "ez-160 hidden"}>
          <EzoicPlaceHolder
            key="Sidebar Bottom 160x600"
            width={160}
            height={600}
            id={143}
          />
        </div>

        <div className={thirdSideBarAd ? "ez-300 sticky" : "ez-300 hidden"}>
          <EzoicPlaceHolder
            key="Sidebar Bottom 300x1050"
            width={300}
            height={1050}
            id={147}
          />
        </div>
      </div>

      <style jsx>{`
        .sjakt {
          flex: 1;
          padding-bottom: 50px;
        }

        .sjakt:last-child {
          padding-bottom: 0;
        }

        .sticky {
          position: sticky;
          top: 50px;
        }

        .ez-160 {
          display: none;
        }

        @media only screen and (max-width: 1700px) {
          .ez-300 {
            display: none;
          }

          .ez-160 {
            display: block;
          }
        }

        .hidden {
          display: none;
        }
      `}</style>
    </>
  );
};
