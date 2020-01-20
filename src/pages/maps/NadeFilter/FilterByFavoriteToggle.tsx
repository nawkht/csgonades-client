import { FC } from "react";
import { Icon } from "semantic-ui-react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";

type Props = {
  map: CsgoMap;
};

export const FilterByFavoriteToggle: FC<Props> = ({ map }) => {
  const { toggleFilterByFavorites, isShowingFavorites } = useNadeFilter(map);

  const active = isShowingFavorites ? "active" : "";

  return (
    <>
      <div className={`fav-filter ${active}`} onClick={toggleFilterByFavorites}>
        Favorites <Icon name="star" color="yellow" />
      </div>
      <style jsx>{`
        .fav-filter {
          background: #e0e1e2;
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          margin-right: 6px;
          transition: background 0.2s;
          height: 100%;
          padding: 12px;
          cursor: pointer;
          font-weight: 400;
        }

        .fav-filter:hover {
          background: #c0c1c2;
        }

        .active {
          background: #c0c1c2;
        }
      `}</style>
    </>
  );
};
