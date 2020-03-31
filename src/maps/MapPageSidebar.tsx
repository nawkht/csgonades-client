import { FC, memo, useMemo } from "react";
import { EzoicPlaceHolder } from "../common/ezoicLoader/EzoicPlaceHolder";
import { CsgoMap } from "../models/Nade/CsGoMap";

type Props = {
  map: CsgoMap;
};

export const MapPageSideBar: FC<Props> = memo(({ map }) => {
  const placeHolderId = useMemo(() => {
    switch (map) {
      case "dust2":
        return 166;
      case "mirage":
        return 167;
      default:
        return 140;
    }
  }, [map]);

  return (
    <>
      <div className="sjakt">
        <div className="sticky">
          <EzoicPlaceHolder id={placeHolderId} />
        </div>
      </div>

      <style jsx>{`
        .sjakt {
          flex: 1;
        }

        .sticky {
          position: sticky;
          top: 50px;
        }
      `}</style>
    </>
  );
});
