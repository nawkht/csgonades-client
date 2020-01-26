import { FC } from "react";
import { Icon, Popup } from "semantic-ui-react";
import { CsgoMap } from "../../../models/Nade/CsGoMap";
import { useNadeFilter } from "../../../store/NadeStore/NadeHooks";
import { useTheme } from "../../../store/SettingsStore/SettingsHooks";

type Props = {
  map: CsgoMap;
};

export const FavFilter: FC<Props> = ({ map }) => {
  const { colors } = useTheme();
  const { toggleFilterByFavorites, isShowingFavorites } = useNadeFilter(map);

  const active = isShowingFavorites ? "active" : "";

  return (
    <>
      <Popup
        content="Your favorites"
        hoverable
        position="bottom center"
        inverted
        size="tiny"
        mouseEnterDelay={500}
        openOnTriggerClick={false}
        trigger={
          <div
            className={`fav-filter ${active}`}
            onClick={toggleFilterByFavorites}
          >
            <Icon name="star" color="yellow" />
          </div>
        }
      />
      <style jsx>{`
        .fav-filter {
          display: flex;
          align-items: center;
          justify-content: space-around;
          background: ${colors.filterBg};
          border-bottom-left-radius: 3px;
          border-bottom-right-radius: 3px;
          margin-right: 12px;
          transition: background 0.2s;
          height: 100%;
          cursor: pointer;
          font-weight: 400;
          font-size: 1.4em;
          padding-left: 10px;
          padding-right: 6px;
        }

        .fav-filter:hover {
          background: ${colors.filterBgHover};
        }

        .active {
          background: ${colors.filterBgHover};
        }
      `}</style>
    </>
  );
};
