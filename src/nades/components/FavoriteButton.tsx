import { FC } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
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
      unFavorite(favorite.id);
    } else {
      addFavorite(nade.id);
    }
  }

  const icon = isFavorited ? <FaTimes /> : <FaStar />;
  const color = isFavorited ? "#3b3305" : "#d4a900";

  return (
    <>
      <div className="favorite-wrapper">
        <ButtonWithIcon
          icon={icon}
          backgroundColor={color}
          value={"FAVORITE"}
          onClick={onFavoriteClick}
          loading={isFavoriteInProgress}
        />
      </div>
      <style jsx>{`
        .favorite-wrapper {
        }
      `}</style>
    </>
  );
};
