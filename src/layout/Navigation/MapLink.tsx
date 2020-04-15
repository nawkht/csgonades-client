import { FC } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import { capitalize } from "../../utils/Common";
import { PageLink } from "../../common/PageLink";
import { useRouter } from "next/router";

type Props = {
  map: CsgoMap;
  isNew?: boolean;
};

export const MapLink: FC<Props> = ({ map, isNew }) => {
  const { query } = useRouter();
  const selected = query.map ? query.map.includes(map) : false;

  return (
    <>
      <li className={selected ? "nav-selected" : ""}>
        {isNew && <span className="new-map">New</span>}
        <PageLink href={`/maps/[map]`} as={`/maps/${map}`}>
          <span className="map-name">{capitalize(map)}</span>
        </PageLink>
      </li>
      <style jsx>{`
        li {
          position: relative;
        }

        li .map-name {
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

        li .map-name {
          color: white;
        }

        .nav-selected {
          font-weight: 500;
        }

        .new-map {
          position: absolute;
          left: 0;
          bottom: 0;
          font-size: 10px;
          background: rgba(127, 176, 2, 0.9);
          color: white;
          border-radius: 3px;
          padding: 0px 2px;
          display: block;
          margin-left: 55px;
          margin-bottom: 5px;
          pointer-events: none;
          font-weight: 400;
        }
      `}</style>
    </>
  );
};
