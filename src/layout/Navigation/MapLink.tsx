import { FC } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { capitalize } from "../../utils/Common";
import { PageLink } from "../../common/PageLink";
import { useRouter } from "next/router";

type Props = {
  map: CsgoMap;
};

export const MapLink: FC<Props> = ({ map }) => {
  const { query } = useRouter();
  const selected = query.map ? query.map.includes(map) : false;

  return (
    <>
      <li className={selected ? "nav-selected" : ""}>
        <PageLink href={`/maps/[map]`} as={`/maps/${map}`}>
          <span>{capitalize(map)}</span>
        </PageLink>
      </li>
      <style jsx>{`
        li span {
          display: block;
          color: white;
          margin-left: -15px;
          margin-right: 30px;
          min-width: 75px;
          font-size: 16px;
          padding-top: 5px;
          padding-bottom: 5px;
          padding-right: 15px;
          padding-left: 15px;
        }

        li span {
          color: white;
        }

        .nav-selected {
          font-weight: 500;
        }
      `}</style>
    </>
  );
};
