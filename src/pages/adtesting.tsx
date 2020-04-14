import { NextPage } from "next";
import { AdUnit } from "../common/adunits/AdUnit";
import { PageCentralize } from "../common/PageCentralize";

const AdTesting: NextPage = () => {
  return (
    <>
      <PageCentralize>
        <div className="ads">
          <h1>Adtesting</h1>
          <div className="ad-units">
            <div className="skyskraper">
              Skyskraper
              <AdUnit tagType="skyscraper" />
            </div>
            <div className="med-rec">
              Med rectangle
              <AdUnit tagType="top-medium-rectangle" />
            </div>
          </div>
        </div>
      </PageCentralize>
      <style jsx>{`
        .ad-units {
          display: flex;
          justify-content: space-around;
        }
        h1 {
          text-align: center;
        }

        .skyskraper {
          background: pink;
          width: 120px;
          height: 650px;
        }

        .med-rec {
          background: pink;
          width: 300px;
          height: 300px;
        }
      `}</style>
    </>
  );
};

export default AdTesting;
