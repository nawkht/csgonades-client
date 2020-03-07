import { FC, useMemo } from "react";
import { NadeType } from "../../models/Nade/NadeType";
import { useNadeFilter } from "../../store/NadeFilterStore/NadeFilterHooks";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { iconFromType } from "../../utils/Common";

type Props = {
  type: NadeType;
};

export const NadeTypeButton: FC<Props> = ({ type }) => {
  const { colors } = useTheme();
  const { filterByType, byType } = useNadeFilter();
  const iconUrl = iconFromType(type);

  function onClick() {
    filterByType(type);
  }

  const classNameBuilder = useMemo(() => {
    const base = ["nade-type-btn", "icon"];

    if (byType === type) {
      base.push("active");
    }
    return base.join(" ");
  }, [byType, type]);

  return (
    <>
      <button className={classNameBuilder} onClick={onClick}>
        <div className="type-icon"></div>
      </button>
      <style jsx>{`
        .nade-type-btn {
          cursor: pointer;
          border: none;
          background: transparent;
          outline: none;
          border-bottom: 1px solid ${colors.filterBorder};
          width: 45px;
          height: 45px;
        }

        .nade-type-btn:last-child {
          border-bottom: none;
        }

        .type-icon {
          width: 100%;
          height: 100%;
          background: url(${iconUrl});
          background-size: 26px;
          background-repeat: no-repeat;
          background-position: 45% 50%;
        }

        .active {
          background: #f8ffed;
        }
      `}</style>
    </>
  );
};
