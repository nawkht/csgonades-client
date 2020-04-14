import { FC, memo } from "react";
import { CsgoMap } from "../models/Nade/CsGoMap";

type Props = {
  map: CsgoMap;
};

export const MapPageSideBar: FC<Props> = memo(() => {
  return (
    <>
      <div className="sjakt">
        <div className="sticky">
          <div id="60796-4">
            <script src="//ads.themoneytizer.com/s/gen.js?type=4"></script>
            <script src="//ads.themoneytizer.com/s/requestform.js?siteId=60796&formatId=4"></script>
          </div>
        </div>
      </div>

      <style jsx>{`
        .sjakt {
          height: 100%;
        }

        .sticky {
          position: sticky;
          top: 50px;
          display: flex;
          justify-content: space-around;
        }
      `}</style>
    </>
  );
});
