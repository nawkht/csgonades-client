import { FC } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { NadeItem } from "./NadeItem";
import { useTheme } from "../store/LayoutStore/LayoutHooks";
import { Loader, Message } from "semantic-ui-react";

type Props = {
  nades: NadeLight[];
  loading?: boolean;
  emptyMessage?: string;
};

export const NadeListGrid: FC<Props> = ({
  nades,
  loading,
  emptyMessage = "No nades found"
}) => {
  const { uiDimensions } = useTheme();

  const hasNades = nades.length > 0;
  const isLoading = loading || false;

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
        {isLoading && (
          <div style={{ marginTop: "30vh", width: "100%" }}>
            <Loader active inline="centered" />
          </div>
        )}
        {!isLoading &&
          nades.map(nade => (
            <div className="nadelist-item" key={nade.id}>
              <NadeItem nade={nade} />
            </div>
          ))}
      </div>
      <style jsx>{`
        .nadelist {
          min-height: 100px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          margin-left: -${uiDimensions.INNER_GUTTER_SIZE / 2}px;
          margin-right: -${uiDimensions.INNER_GUTTER_SIZE / 2}px;
        }

        .nadelist-item {
          padding: ${uiDimensions.INNER_GUTTER_SIZE / 2}px;
        }
      `}</style>
    </>
  );
};
