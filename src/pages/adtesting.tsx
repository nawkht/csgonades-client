import { NextPage } from "next";
import { AdUnit } from "../common/adunits/AdUnit";

const AdTesting: NextPage = () => {
  return (
    <>
      <div className="ads">
        <h1>Adtesting</h1>
        <AdUnit type="skyscraper" />
        <AdUnit type="top-medium-rectangle" />
      </div>
      <style jsx>{`
        h1 {
          text-align: center;
        }
      `}</style>
    </>
  );
};

export default AdTesting;
