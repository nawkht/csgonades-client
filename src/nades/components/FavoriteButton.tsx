import { FC } from "react";
import { FaStar } from "react-icons/fa";
import { ButtonWithIcon } from "../../common/ButtonWithIcon";
import { Nade } from "../../models/Nade/Nade";
import { useIsSignedIn } from "../../store/AuthStore/AuthHooks";
import { useAddFavorite } from "../../store/FavoriteStore/hooks/useAddFavorite";
import { useIsFavorited } from "../../store/FavoriteStore/hooks/useIsFavorited";
import { useIsFavoriteInProgress } from "../../store/FavoriteStore/hooks/useIsFavoriteInProgress";
import { useUnfavorite } from "../../store/FavoriteStore/hooks/useUnFavorite";

type Props = {
  nade: Nade;
  showSignInWarning: () => void;
};

export const FavoriteButton: FC<Props> = ({ nade, showSignInWarning }) => {
  const isFavoriteInProgress = useIsFavoriteInProgress();
  const isSignedIn = useIsSignedIn();
  const favorite = useIsFavorited(nade.id);
  const addFavorite = useAddFavorite();
  const unFavorite = useUnfavorite();
  const isFavorited = favorite;

  function onFavoriteClick() {
    if (!isSignedIn) {
      showSignInWarning();
      return;
    }

    if (isFavoriteInProgress) {
      return;
    }
    if (favorite) {
      unFavorite(favorite.id, nade);
    } else {
      addFavorite(nade);
    }
  }

  const favoriteText = isFavorited ? "Unfavorite" : "Favorite";

  return (
    <>
      <div className="favorite-wrapper">
        <ButtonWithIcon
          icon={<FaStar />}
          backgroundColor="#d4a900"
          value={favoriteText}
          onClick={onFavoriteClick}
          loading={isFavoriteInProgress}
        />
      </div>
      <style jsx>{`
        .favorite-wrapper {
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};
