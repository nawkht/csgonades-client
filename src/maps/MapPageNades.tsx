import { FC, memo } from "react";
import { NadeLight } from "../models/Nade/Nade";
import { useFilteredNades } from "../store/MapStore/hooks/useFilteredNades";
import { CsgnList } from "../common/list/CsgnList";
import { NadeItem } from "../common/nadeitem/NadeItem";
import { isMobileOnly } from "react-device-detect";
import { NadeItemMobile } from "../common/nadeitem/NadeItemMobile";

type Props = {
  ssrNades: NadeLight[];
};

export const MapPageNades: FC<Props> = memo(({ ssrNades }) => {
  const nades = useFilteredNades();

  const renderNades = nades.length ? nades : ssrNades;

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
      data={renderNades}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
});
