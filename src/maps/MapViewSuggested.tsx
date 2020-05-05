import { FC } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { CSGNModal } from "../common/CSGNModal";
import { NadeItem } from "../common/nadeitem/NadeItem";
import { Dimensions } from "../constants/Constants";
import { useTheme } from "../store/SettingsStore/SettingsHooks";

type Props = {
  nades: NadeLight[] | null;
  onDismiss: () => void;
};

export const MapViewSuggested: FC<Props> = ({ nades, onDismiss }) => {
  const { colors } = useTheme();

  if (!nades) {
    return null;
  }

  return (
    <>
      <CSGNModal
        title="Found some nade options"
        onDismiss={onDismiss}
        visible={true}
      >
        <div id="suggested-nades">
          <div className="nade-list-wrap">
            {nades.map((n) => (
              <div key={n.id} className="item">
                <NadeItem nade={n} />
              </div>
            ))}
          </div>
        </div>
      </CSGNModal>
      <style jsx>{`
        #suggested-nades {
          border-radius: 5px;
          background: ${colors.DP01};
          border-radius: 10px;
          max-width: 1000px;
          max-height: calc(
            100vh - ${Dimensions.HEADER_HEIGHT}px - ${Dimensions.NAV_HEIGHT}px
          );
        }

        .nade-list-wrap {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          padding-top: ${Dimensions.GUTTER_SIZE / 2}px;
          padding-bottom: ${Dimensions.GUTTER_SIZE / 2}px;
        }

        .item {
          width: 300px;
          margin: ${Dimensions.GUTTER_SIZE / 2}px;
        }
      `}</style>
    </>
  );
};
