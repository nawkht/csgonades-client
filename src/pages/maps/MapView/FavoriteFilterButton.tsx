import { FC } from "react";
import { TiStarFullOutline } from "react-icons/ti";
import { Popup } from "semantic-ui-react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";

type Props = {
  map: CsgoMap;
};

export const FavoriteFilterButton: FC<Props> = ({ map }) => {
  const { toggleFilterByFavorites, isShowingFavorites } = useNadeFilter(map);

  const active = isShowingFavorites ? "active" : "";

  return (
    <>
      <Popup
        content="Your favorites"
        hoverable
        position="right center"
        inverted
        size="tiny"
        mouseEnterDelay={500}
        openOnTriggerClick={false}
        trigger={
          <div
            className={`fav-filter ${active}`}
            onClick={toggleFilterByFavorites}
          >
            <TiStarFullOutline />
          </div>
        }
      />
      <style jsx>{`
        .fav-filter {
          display: flex;
          align-items: center;
          justify-content: space-around;
          height: 45px;
          height: 45px;
          background: #292929;
          color: #ebda49;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          transition: background 0.2s;
          cursor: pointer;
          font-weight: 400;
          font-size: 1.7em;
          margin-top: 12px;
          padding-right: 2px;
        }

        .fav-filter:hover {
          background: #151515;
        }

        .active {
          background: #151515;
        }
      `}</style>
    </>
  );
};
