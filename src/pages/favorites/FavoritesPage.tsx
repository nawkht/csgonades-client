import { FC, useEffect } from "react";
import { useFetchFavoritedNades } from "../../store/FavoriteStore/FavoriteHooks";
import { useSelector } from "react-redux";
import {
  isLoadingFavoritedNadesSelector,
  favoritedNades
} from "../../store/FavoriteStore/FavoriteSelectors";
import { NadeList } from "../../ui-common/NadeList";

export const FavoritesPage: FC = () => {
  const isLoading = useSelector(isLoadingFavoritedNadesSelector);
  const nades = useSelector(favoritedNades);
  const fetchFavoritedNades = useFetchFavoritedNades();
  useEffect(() => {
    fetchFavoritedNades();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="favorites-container">
        <h2>Your favorites</h2>
        <NadeList padding={0} nades={nades} />
      </div>
      <style jsx>{`
        .favorites-container {
          padding: 18px;
        }
      `}</style>
    </>
  );
};
