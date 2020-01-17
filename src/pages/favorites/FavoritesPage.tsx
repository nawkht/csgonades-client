import { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { useFetchFavoritedNades } from "../../store/FavoriteStore/FavoriteHooks";
import {
  favoritedNades,
  isLoadingFavoritedNadesSelector
} from "../../store/FavoriteStore/FavoriteSelectors";
import { useTheme } from "../../store/LayoutStore/LayoutHooks";
import { Layout } from "../../ui-common/layout/layout";
import { NadeListGrid } from "../../ui-common/NadeListGrid";

export const FavoritesPage: FC = () => {
  const theme = useTheme();
  const isLoading = useSelector(isLoadingFavoritedNadesSelector);
  const nades = useSelector(favoritedNades);
  const fetchFavoritedNades = useFetchFavoritedNades();
  useEffect(() => {
    fetchFavoritedNades();
  }, []);

  return (
    <Layout title="Favorites" canonical="/favorites">
      <div className="favorites-container">
        {isLoading && <>Loading...</>}
        {!isLoading && (
          <>
            <h2>Your favorites</h2>
            <NadeListGrid
              nades={nades}
              emptyMessage="You don't have any favorites yet!"
            />
          </>
        )}
      </div>
      <style jsx>{`
        .favorites-container {
          padding: ${theme.uiDimensions.OUTER_GUTTER_SIZE}px;
        }
      `}</style>
    </Layout>
  );
};
