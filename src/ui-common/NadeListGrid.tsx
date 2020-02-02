import { FC } from "react";
import { isMobile } from "react-device-detect";
import { Loader, Message } from "semantic-ui-react";
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

export const NadeListGrid: FC<Props> = ({
  nades,
  emptyMessage = "No nades found",
  onItemClick,
  loading
}) => {
  const hasNades = nades.length > 0;

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
      <div className="nadelist">
        {nades.length > 0 &&
          nades.map(nade => (
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
};
