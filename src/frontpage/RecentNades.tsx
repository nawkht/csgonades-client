import { FC, useEffect, useState } from "react";
import { NadeApi } from "../api/NadeApi";
import { NadeLight } from "../models/Nade/Nade";
import { useTheme } from "../store/SettingsStore/SettingsHooks";
import { CsgnList } from "../common/list/CsgnList";
import { NadeItemMobile } from "../common/nadeitem/NadeItemMobile";
import { NadeItem } from "../common/nadeitem/NadeItem";
import { isMobileOnly } from "react-device-detect";

type Props = {
  recentNades: NadeLight[];
};

export const RecentNades: FC<Props> = ({ recentNades }) => {
  const [nades, setNades] = useState(recentNades);
  const { colors } = useTheme();

  useEffect(() => {
    NadeApi.getAll().then(res => {
      if (res.isOk()) {
        const fetchedNades = res.value.slice(0, 6);
        setNades(fetchedNades);
      }
    });
  }, []);

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
    <>
      <div className="recent-nades">
        <h3>Recent nades</h3>

        <CsgnList<NadeLight>
          data={nades}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </div>
      <style jsx>{`
        h3 {
          text-align: center;
          font-weight: 300;
          font-size: 24px;
          color: ${colors.TEXT};
          padding-bottom: 40px;
        }

        .recent-nades {
          flex: 1;
        }
      `}</style>
    </>
  );
};
