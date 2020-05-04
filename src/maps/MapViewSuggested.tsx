import { FC } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { CSGNModal } from "../common/CSGNModal";
import { NadeItem } from "../common/nadeitem/NadeItem";

type Props = {
  nades: NadeLight[] | null;
  onDismiss: () => void;
};

export const MapViewSuggested: FC<Props> = ({ nades, onDismiss }) => {
  if (!nades) {
    return null;
  }

  return (
    <>
      <CSGNModal title="FOUND NADES" onDismiss={onDismiss} visible={true}>
        <div id="suggested-nades">
          {nades.map((n) => (
            <div key={n.id} className="item">
              <NadeItem nade={n} />
            </div>
          ))}
        </div>
      </CSGNModal>
      <style jsx>{`
        #suggested-nades {
          max-width: 650px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }

        .item {
          width: 300px;
          margin: 10px;
          margin-top: 0px;
        }
      `}</style>
    </>
  );
};
