import { FC, memo, useMemo } from "react";
import { isMobile } from "react-device-detect";
import { Loader, Message } from "semantic-ui-react";
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
  ({ nades, emptyMessage = "No nades found", onItemClick, loading }) => {
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

      if (!isMobile) {
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

    if (loading) {
      return (
        <div>
          <Loader active={loading} inline="centered" size="small" />
        </div>
      );
    }

    if (!hasNades) {
      return (
        <>
          <div className="nadelist-nonades">
            <Message warning>
              <p>{emptyMessage}</p>
            </Message>
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
          .placeholder-in-content-ad {
            border: 1px solid red;
            min-height: 50px;
            background: orange;
          }

          .nadelist {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
            grid-column-gap: ${Dimensions.GUTTER_SIZE};
            grid-row-gap: ${Dimensions.GUTTER_SIZE};
            width: 100%;
          }

          .nadelist-loading {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            padding: 0;
          }
        `}</style>
      </>
    );
  }
);
