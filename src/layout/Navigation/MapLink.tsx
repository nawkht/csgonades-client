import Link from "next/link";
import { FC } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { useIsAdmin } from "../../store/AuthStore/AuthHooks";
import { capitalize } from "../../utils/Common";

type Props = {
  map: CsgoMap;
  currentPath?: string | string[];
};

export const MapLink: FC<Props> = ({ map, currentPath }) => {
  const isAdmin = useIsAdmin();
  const selected = currentPath ? currentPath.includes(map) : false;

  return (
    <>
      <li className={selected ? "nav-selected" : ""}>
        {isAdmin && (
          <Link href={`/maps/[map]`} as={`/maps/${map}`}>
            <a>{capitalize(map)}</a>
          </Link>
        )}
        {!isAdmin && <a href={`/maps/${map}`}>{capitalize(map)}</a>}
      </li>
      <style jsx>{`
        li {
          padding: 15px;
          padding-left: 0;
          padding-right: 30px;
          color: white;
        }

        li a {
          color: white;
        }
      `}</style>
    </>
  );
};
