import { FC, memo } from "react";
import { NadeListGrid } from "../common/NadeListGrid";
import { useFilteredNades } from "../store2/FilterStore/hooks/useFilteredNades";

export const MapPageNades: FC = memo(({}) => {
  const filteredNades = useFilteredNades();

  return (
    <>
      <NadeListGrid nades={filteredNades} emptyMessage={`No nades found.`} />
      <style jsx>{``}</style>
    </>
  );
});
