import { FC, memo, useMemo } from "react";
import { isMobile } from "react-device-detect";
import { Dimensions } from "../constants/Constants";
import { NadeLight } from "../models/Nade/Nade";
import { NadeItem } from "./nadeitem/NadeItem";
import { NadeItemMobile } from "./nadeitem/NadeItemMobile";
import { EzoicPlaceHolder } from "./ezoicLoader/EzoicPlaceHolder";

type Props = {
  nades: NadeLight[];
  loading?: boolean;
  emptyMessage?: string;
  onItemClick?: () => void;
  adsSecondColumn?: boolean;
};

export const NadeListGrid: FC<Props> = memo(
  ({
    nades,
    emptyMessage = "No nades found",
    onItemClick,
    adsSecondColumn,
  }) => {
    const { firstRowNades, restNades } = useMemo(() => {
      const firstRowNades = nades.slice(0, 6);
      const restNades = nades.slice(6, nades.length);

      return {
        firstRowNades,
        restNades,
      };
    }, [nades]);

    const numNames = nades.length;
    const hasNades = numNames > 0;

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
        <div className="nadelist-first-row">
          {firstRowNades.map(nade => (
            <div className="nadelist-item" key={nade.id}>
              {!isMobile && <NadeItem nade={nade} onItemClick={onItemClick} />}
              {isMobile && (
                <NadeItemMobile nade={nade} onItemClick={onItemClick} />
              )}
            </div>
          ))}
        </div>
        <div className="nadelist-ez-row">
          {adsSecondColumn && (
            <EzoicPlaceHolder key={"Nade List | 3rd row"} id={128} />
          )}
        </div>
        <div className="nadelist">
          {restNades.map(nade => (
            <div className="nadelist-item" key={nade.id}>
              {!isMobile && <NadeItem nade={nade} onItemClick={onItemClick} />}
              {isMobile && (
                <NadeItemMobile nade={nade} onItemClick={onItemClick} />
              )}
            </div>
          ))}
        </div>
        <style jsx>{`
          .nadelist,
          .nadelist-first-row {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(30vmin, 1fr));
            grid-column-gap: calc(${Dimensions.GUTTER_SIZE} * 1.5);
            grid-row-gap: calc(${Dimensions.GUTTER_SIZE} * 1.5);
            width: 100%;
          }

          .nadelist-ez-row {
            padding-top: calc((${Dimensions.GUTTER_SIZE} * 1.5) / 2);
            padding-bottom: calc((${Dimensions.GUTTER_SIZE} * 1.5) / 2);
            display: flex;
            justify-content: space-around;
          }
        `}</style>
      </>
    );
  }
);
