import { FC } from "react";
import { CsgoMap } from "../../models/Nade/CsGoMap";
import Link from "next/link";

type Props = {
  map: CsgoMap;
};

export const MapPageLink: FC<Props> = ({ map, children }) => {
  return (
    <>
      <Link href="/maps/[map]" as={`/maps/${map}`}>
        <a>{children}</a>
      </Link>
      <style jsx>{``}</style>
    </>
  );
};
