import { FC, memo, useMemo } from "react";
import { isMobile, isMobileOnly } from "react-device-detect";
import { Dimensions } from "../constants/Constants";
import { NadeLight } from "../models/Nade/Nade";
import { EzoicPlaceHolder } from "./ezoicLoader/EzoicPlaceHolder";
import { NadeItem } from "./nadeitem/NadeItem";
import { NadeItemMobile } from "./nadeitem/NadeItemMobile";

type Props = {
  nades: NadeLight[];
  loading?: boolean;
  emptyMessage?: string;
  onItemClick?: () => void;
};

export const NadeListGrid: FC<Props> = memo(
  ({ nades, emptyMessage = "No nades found", onItemClick }) => {
    const numNames = nades.length;
    const hasNades = numNames > 0;

    const nadesForList: JSX.Element[] = useMemo(() => {
      const nadesWithAds = nades.map(nade => {
        return (
          <div className="nadelist-item" key={nade.id}>
            {!isMobile && <NadeItem nade={nade} onItemClick={onItemClick} />}
            {isMobile && (
              <NadeItemMobile nade={nade} onItemClick={onItemClick} />
            )}
          </div>
        );
      });

      if (!isMobileOnly) {
        return nadesWithAds;
      }

      const inContentIds = [114, 115, 116, 117, 118];

      let pos = 6;
      const adInterval = 15;
      while (pos < nadesWithAds.length) {
        if (!inContentIds.length) {
          break;
        }

        const nextId = inContentIds.pop();
        nadesWithAds.splice(
          pos,
          0,
          <div key={`ez-${nextId}`}>
            <div className="placeholder-in-content-ad">
              <EzoicPlaceHolder id={nextId} />
            </div>
            <style jsx>{`
              .placeholder-in-content-ad {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              }
            `}</style>
          </div>
        );
        pos += adInterval;
      }

      return nadesWithAds;
    }, [nades, onItemClick]);

    if (!hasNades) {
      return (
        <>
          <div className="nadelist-nonades">
            <p>{emptyMessage}</p>
          </div>
          <style jsx>{`
            .nadelist-nonades {
            }
          `}</style>
        </>
      );
    }

    return (
      <>
        <div className="nadelist">{nadesForList}</div>
        <style jsx>{`
          .nadelist {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            grid-column-gap: ${Dimensions.GUTTER_SIZE};
            grid-row-gap: ${Dimensions.GUTTER_SIZE};
            width: 100%;
          }
        `}</style>
      </>
    );
  }
);
