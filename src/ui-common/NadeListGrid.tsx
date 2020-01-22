import { FC } from "react";
import { isMobile } from "react-device-detect";
import { Message } from "semantic-ui-react";
import { NadeLight } from "../models/Nade/Nade";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import { NadeItem } from "./NadeItem";
import { NadeItemMobile } from "./NadeItemMobile";

type Props = {
  nades: NadeLight[];
  loading?: boolean;
  emptyMessage?: string;
  onItemClick?: () => void;
};

export const NadeListGrid: FC<Props> = ({
  nades,
  emptyMessage = "No nades found",
  onItemClick
}) => {
  const { uiDimensions } = useTheme();

  const hasNades = nades.length > 0;

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
          grid-template-columns: repeat(6, minmax(250px, 1fr));
          grid-column-gap: ${uiDimensions.INNER_GUTTER_SIZE}px;
          grid-row-gap: ${uiDimensions.INNER_GUTTER_SIZE}px;
          width: 100%;
        }

        .nadelist-loading {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          padding: 0;
        }

        @media only screen and (max-width: 1800px) {
          .nadelist {
            grid-template-columns: repeat(5, minmax(250px, 1fr));
          }
        }

        @media only screen and (max-width: 1460px) {
          .nadelist {
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          }
        }
      `}</style>
    </>
  );
};
