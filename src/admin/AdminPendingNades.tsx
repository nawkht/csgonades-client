import { FC } from "react";
import { useAdminPendingNades } from "../store2/AdminStore/hooks";
import { NadeLight } from "../models/Nade/Nade";
import { isMobileOnly } from "react-device-detect";
import { NadeItemMobile } from "../common/nadeitem/NadeItemMobile";
import { NadeItem } from "../common/nadeitem/NadeItem";
import { CsgnList } from "../common/list/CsgnList";

export const AdminPendingNades: FC = () => {
  const { pendingNades } = useAdminPendingNades();

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
      data={pendingNades}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
    />
  );
};
