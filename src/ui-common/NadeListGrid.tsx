import { FC } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { NadeItem } from "./NadeItem";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import { Message } from "semantic-ui-react";
import { NadeItemMobile } from "./NadeItemMobile";
import { isMobile } from "react-device-detect";

type Props = {
  nades: NadeLight[];
  loading?: boolean;
  emptyMessage?: string;
};

export const NadeListGrid: FC<Props> = ({
  nades,
  emptyMessage = "No nades found"
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
              {!isMobile && <NadeItem nade={nade} />}
              {isMobile && <NadeItemMobile nade={nade} />}
            </div>
          ))}
      </div>
      <style jsx>{`
        .nadelist {
          min-height: 100px;
          display: grid;
          grid-template-columns: repeat(6, minmax(250px, 1fr));
          margin-left: -${uiDimensions.INNER_GUTTER_SIZE / 2}px;
          margin-right: -${uiDimensions.INNER_GUTTER_SIZE / 2}px;
        }

        .nadelist-item {
          padding: ${uiDimensions.INNER_GUTTER_SIZE / 2}px;
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
