import { FC, useMemo } from "react";
import { NadeType } from "../../models/Nade/NadeType";
import { useTheme } from "../../store/SettingsStore/SettingsHooks";
import { iconFromType } from "../../utils/Common";

type Props = {
  type: NadeType;
  currentType: NadeType;
  mobile?: boolean;
  onFilterByType: (type: NadeType) => void;
};

export const NadeTypeButton: FC<Props> = ({
  type,
  currentType,
  mobile,
  onFilterByType,
}) => {
  const { colors } = useTheme();
  const iconUrl = iconFromType(type);

  const classNameBuilder = useMemo(() => {
    const base = ["nade-type-btn", "icon"];

    if (currentType === type) {
      base.push("active");
    }
    return base.join(" ");
  }, [currentType, type]);

  function onClick() {
    onFilterByType(type);
  }

  return (
    <>
      {mobile && (
        <button className={classNameBuilder} onClick={onClick}>
          <div className="type-icon"></div>
        </button>
      )}
      {!mobile && (
        <button className={classNameBuilder} onClick={onClick}>
          <div className="type-icon"></div>
        </button>
      )}

      <style jsx>{`
        .nade-type-btn {
          cursor: pointer;
          border: none;
          background: transparent;
          outline: none;
          border-bottom: ${mobile
            ? `none`
            : `1px solid ${colors.filterBorder}`};
          width: ${mobile ? "60px" : "45px"};
          height: ${mobile ? "60px" : "45px"};
        }

        .nade-type-btn:last-child {
          border-bottom: none;
        }

        .type-icon {
          width: 100%;
          height: 100%;
          background: url(${iconUrl});
          background-size: ${mobile ? "35px" : "26px"};
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
