import Link from "next/link";
import { FC } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useNavigationState } from "../../store/NavigationStore/NavigationThunks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { capitalize } from "../../utils/Common";

type Props = {
  map?: CsgoMap;
};

export const NadeBackButton: FC<Props> = ({ map }) => {
  const { colors } = useTheme();
  const { previousRoute } = useNavigationState();

  if (!map) {
    return null;
  }

  return (
    <>
      {previousRoute && (
        <button className="back" onClick={() => history.back()}>
          Back
        </button>
      )}
      {!previousRoute && (
        <Link href={`/maps?name=${map}`} as={`/maps/${map}`}>
          <a className="back">{capitalize(map)}</a>
        </Link>
      )}
      <style jsx>{`
        .back {
          color: ${colors.TEXT};
          outline: none;
          border: none;
          background: none;
          font-weight: 300;
          font-family: "Roboto";
          padding: 0;
          cursor: pointer;
        }

        .back:hover {
          text-decoration: underline;
        }
      `}</style>
    </>
  );
};
