import { NextPage } from "next";
import { PageCentralize } from "../common/PageCentralize";
import { PropellerAd } from "../frontpage/PropellerAd";

const AdTesting: NextPage = () => {
  return (
    <>
      <PageCentralize>
        <div className="ads">
          <h1>Adtesting</h1>
          <PropellerAd />
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
