import { FC, memo } from "react";
import { isMobile } from "react-device-detect";
import { Dimensions } from "../constants/Constants";
import { NadeLight } from "../models/Nade/Nade";
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
        <div className="nadelist">
          {nades.map(nade => (
            <div className="nadelist-item" key={nade.id}>
              {!isMobile && <NadeItem nade={nade} onItemClick={onItemClick} />}
              {isMobile && (
                <NadeItemMobile nade={nade} onItemClick={onItemClick} />
              )}
            </div>
          ))}
        </div>
        <style jsx>{`
          .nadelist {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(30vmin, 1fr));
            grid-column-gap: calc(${Dimensions.GUTTER_SIZE} * 1.5);
            grid-row-gap: calc(${Dimensions.GUTTER_SIZE} * 1.5);
            width: 100%;
          }
        `}</style>
      </>
    );
  }
);
