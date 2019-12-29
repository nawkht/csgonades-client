import { FC, useEffect } from "react";
import { useFetchFavoritedNades } from "../../store/FavoriteStore/FavoriteHooks";
import { useSelector } from "react-redux";
import {
  isLoadingFavoritedNadesSelector,
  favoritedNades
} from "../../store/FavoriteStore/FavoriteSelectors";
import { NadeList } from "../../ui-common/NadeList";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";

export const FavoritesPage: FC = () => {
  const theme = useTheme();
  const isLoading = useSelector(isLoadingFavoritedNadesSelector);
  const nades = useSelector(favoritedNades);
  const fetchFavoritedNades = useFetchFavoritedNades();
  useEffect(() => {
    fetchFavoritedNades();
  }, []);

  return (
    <>
      <div className="favorites-container">
        {isLoading && <>Loading...</>}
        {!isLoading && (
          <>
            <h2>Your favorites</h2>
            <NadeList nades={nades} />
          </>
        )}
      </div>
      <style jsx>{`
        .favorites-container {
          padding: ${theme.uiDimensions.OUTER_GUTTER_SIZE}px;
        }
      `}</style>
    </>
  );
};
