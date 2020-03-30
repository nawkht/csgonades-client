import { FC, memo } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { CsgnList } from "../common/list/CsgnList";
import { NadeItem } from "../common/nadeitem/NadeItem";
import { isMobileOnly } from "react-device-detect";
import { NadeItemMobile } from "../common/nadeitem/NadeItemMobile";
import { useFilterServerSideNades } from "../store/MapStore/hooks/useFilteredNades";

type Props = {
  allNades: NadeLight[];
};

export const MapPageNades: FC<Props> = memo(({ allNades }) => {
  const nades = useFilterServerSideNades(allNades);

  function renderItem(item: NadeLight) {
    if (isMobileOnly) {
      return <NadeItemMobile nade={item} />;
    } else {
      return <NadeItem nade={item} />;
    }
  }

  function keyExtractor(item: NadeLight) {
    return item.id;
  }

  return (
    <CsgnList<NadeLight>
      data={nades}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
});
