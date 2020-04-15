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
          grid-area: ${map};
        }

        li .map-name {
          display: block;
          color: white;
          min-width: 90px;
          font-size: 16px;
          padding: 15px 20px;
          background: rgba(0, 0, 0, 0.05);
          border: 1px solid rgba(0, 0, 0, 0.15);
          border-top: none;
          border-left: none;
          text-align: center;
        }

        .nav-selected {
          font-weight: 500;
        }

        .new-map {
          position: absolute;
          top: 0;
          right: 0;
          font-size: 9px;
          background: rgba(127, 176, 2, 0.7);
          color: white;
          border-radius: 2px;
          padding: 0px 2px;
          display: block;
          margin-top: 2px;
          margin-right: 2px;
          pointer-events: none;
          font-weight: 400;
        }

        li:hover .map-name {
          background: rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </>
  );
};
