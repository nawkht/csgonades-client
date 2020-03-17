import { FC } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { capitalize } from "../../utils/Common";
import { PageLink } from "../../common/PageLink";

type Props = {
  map: CsgoMap;
  currentPath?: string | string[];
};

export const MapLink: FC<Props> = ({ map, currentPath }) => {
  const selected = currentPath ? currentPath.includes(map) : false;

  return (
    <>
      <li className={selected ? "nav-selected" : ""}>
        <PageLink href={`/maps/[map]`} as={`/maps/${map}`}>
          <span>{capitalize(map)}</span>
        </PageLink>
      </li>
      <style jsx>{`
        li {
          padding: 15px;
          padding-left: 0;
          padding-right: 30px;
          color: white;
        }

        li span {
          color: white;
        }
      `}</style>
    </>
  );
};
