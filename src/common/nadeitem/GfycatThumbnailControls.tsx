import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";

type Props = {};

export const GfycatThumbnailControls: FC<Props> = ({}) => {
  const { colors } = useTheme();

  return null;

  return (
    <>
      <div className="controls-wrapper">
        <button
          className="fav-btn"
          onClick={e => {
            e.preventDefault();
            console.log("Click");
          }}
        >
          <FaStar />
        </button>
        <div className="fav-tooltip">
          <span>Favorite</span>
        </div>
      </div>

      <style jsx>{`
        .controls-wrapper {
          position: absolute;
          top: 0;
          right: 0;
        }

        .fav-tooltip {
          z-index: 800;
          position: absolute;
          top: 5px;
          right: 30px;
          height: 30px;
          border-radius: 4px;
          background: rgba(0, 0, 0, 1);
          color: white;
          transition: width 0.2s;
          overflow: hidden;
          width: 0px;
          display: flex;
          align-items: center;
          justify-content: space-around;
        }

        .fav-btn {
          position: relative;
          z-index: 900;
          border: none;
          background: rgba(0, 0, 0, 1);
          color: ${colors.filterFavColor};
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          border-radius: 4px;
          margin: 5px;
          cursor: pointer;
        }

        .controls-wrapper:hover .fav-tooltip {
          width: 65px;
        }
      `}</style>
    </>
  );
};
